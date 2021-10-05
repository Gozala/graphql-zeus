"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeToJSONSchema = void 0;
const Models_1 = require("../Models");
const getDataType = ({ f, tree, override }) => {
    var _a, _b, _c;
    if (f.data.type === Models_1.ValueDefinition.InputValueDefinition) {
        if (f.type.name === Models_1.ScalarTypes.Boolean) {
            return { type: 'boolean' };
        }
        if (f.type.name === Models_1.ScalarTypes.Float) {
            return { type: 'number' };
        }
        if (f.type.name === Models_1.ScalarTypes.Int) {
            return { type: 'integer' };
        }
        if (f.type.name === Models_1.ScalarTypes.ID) {
            return { type: 'string' };
        }
        if (f.type.name === Models_1.ScalarTypes.String) {
            return { type: 'string' };
        }
        const lookForField = tree.nodes.find((r) => r.name === f.type.name);
        if ((lookForField === null || lookForField === void 0 ? void 0 : lookForField.data.type) === Models_1.TypeDefinition.ScalarTypeDefinition) {
            return {
                type: 'string',
            };
        }
        if ((lookForField === null || lookForField === void 0 ? void 0 : lookForField.data.type) === Models_1.TypeDefinition.EnumTypeDefinition) {
            return {
                type: 'string',
                enum: (_a = lookForField.args) === null || _a === void 0 ? void 0 : _a.map((a) => a.name),
            };
        }
        return {
            $ref: `#/inputs/${lookForField === null || lookForField === void 0 ? void 0 : lookForField.name}`,
        };
    }
    return {
        type: 'object',
        required: (_b = f === null || f === void 0 ? void 0 : f.args) === null || _b === void 0 ? void 0 : _b.filter((a) => { var _a; return (_a = a.type.options) === null || _a === void 0 ? void 0 : _a.includes(Models_1.Options.required); }).map((n) => n.name),
        properties: (_c = f.args) === null || _c === void 0 ? void 0 : _c.reduce((a, b) => {
            a[b.name] = convertField({ f: b, tree, override });
            return a;
        }, {}),
    };
};
const convertType = (props) => {
    var _a;
    const { override, parent, f } = props;
    const type = getDataType(props);
    if (override && parent) {
        console.log(parent.name, f.name);
        const fieldOverride = (_a = override[parent.name]) === null || _a === void 0 ? void 0 : _a[f.name];
        if (fieldOverride) {
            return fieldOverride(type) || {};
        }
    }
    return type;
};
const convertField = (props) => {
    var _a;
    if ((_a = props.f.type.options) === null || _a === void 0 ? void 0 : _a.includes(Models_1.Options.array)) {
        return {
            type: 'array',
            items: convertType(props),
        };
    }
    return convertType(props);
};
class TreeToJSONSchema {
    static parse(parserTree) {
        const inputs = parserTree.nodes
            .filter((n) => n.data.type === Models_1.TypeDefinition.InputObjectTypeDefinition)
            .reduce((a, b) => {
            a[b.name] = convertField({ f: b, tree: parserTree });
            return a;
        }, {});
        const types = parserTree.nodes
            .filter((n) => { var _a; return n.data.type === Models_1.TypeDefinition.ObjectTypeDefinition && ((_a = n.args) === null || _a === void 0 ? void 0 : _a.some((a) => a.args && a.args.length > 0)); })
            .reduce((a, b) => {
            var _a;
            if (b.args && b.args.length) {
                a[b.name] = (_a = b.args) === null || _a === void 0 ? void 0 : _a.reduce((c, d) => {
                    c[d.name] = convertField({ f: d, tree: parserTree });
                    return c;
                }, {});
            }
            return a;
        }, {});
        return {
            inputs,
            types,
        };
    }
}
exports.TreeToJSONSchema = TreeToJSONSchema;