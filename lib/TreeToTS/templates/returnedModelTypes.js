"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveModelTypes = exports.MODEL_TYPES = void 0;
const Models_1 = require("../../Models");
const Spec_1 = require("../../Models/Spec");
const returnedTypes_1 = require("./returnedTypes");
exports.MODEL_TYPES = 'ModelTypes';
const typeScriptMap = {
    Int: 'number',
    Float: 'number',
    Boolean: 'boolean',
    ID: 'string',
    String: 'string',
};
const toTypeScriptPrimitive = (a) => typeScriptMap[a] || `${exports.MODEL_TYPES}["${a}"]`;
const plusDescription = (description, prefix = '') => description ? `${prefix}/** ${description} */\n` : '';
const resolveField = (f) => {
    const { type: { options }, } = f;
    const isArray = !!(options && options.find((o) => o === Models_1.Options.array));
    const isArrayRequired = !!(options && options.find((o) => o === Models_1.Options.arrayRequired));
    const isRequired = !!(options && options.find((o) => o === Models_1.Options.required));
    const isRequiredName = (name) => {
        if (isArray) {
            if (isArrayRequired) {
                return name;
            }
            return `${name}?`;
        }
        if (isRequired) {
            return name;
        }
        return `${name}?`;
    };
    const concatArray = (name) => {
        if (isArray) {
            if (!isRequired) {
                return `(${name} | undefined)[]`;
            }
            return `${name}[]`;
        }
        return name;
    };
    const resolveArgsName = (name) => {
        return isRequiredName(name) + ':';
    };
    return `${plusDescription(f.description, '\t')}\t${resolveArgsName(f.name)}${concatArray(toTypeScriptPrimitive(f.type.name))}`;
};
const resolveTypeFromRoot = (i, rootNodes) => {
    if (i.data.type === Spec_1.TypeSystemDefinition.DirectiveDefinition) {
        return '';
    }
    if (i.data.type === Spec_1.TypeDefinition.ScalarTypeDefinition) {
        return `${plusDescription(i.description)}["${i.name}"]:any`;
    }
    if (!i.args || !i.args.length) {
        return ``;
    }
    if (i.data.type === Spec_1.TypeDefinition.InterfaceTypeDefinition) {
        const typesImplementing = rootNodes.filter((rn) => rn.interfaces && rn.interfaces.includes(i.name));
        return `${plusDescription(i.description)}["${i.name}"]: ${typesImplementing.length > 0 ? typesImplementing.map((ti) => `${exports.MODEL_TYPES}["${ti.name}"]`).join(' | ') : 'never'}`;
    }
    if (i.data.type === Spec_1.TypeDefinition.UnionTypeDefinition) {
        return `${plusDescription(i.description)}["${i.name}"]:${i.args
            .map((f) => `${exports.MODEL_TYPES}["${f.name}"]`)
            .join(' | ')}`;
    }
    if (i.data.type !== Spec_1.TypeDefinition.ObjectTypeDefinition) {
        return `${plusDescription(i.description)}["${i.name}"]: ${returnedTypes_1.TYPES}["${i.name}"]`;
    }
    return `${plusDescription(i.description)}["${i.name}"]: {\n\t${i.args.map((f) => resolveField(f)).join(',\n')}\n}`;
};
const resolveModelTypes = (rootNodes) => {
    return `export type ${exports.MODEL_TYPES} = {
    ${rootNodes
        .map((f) => resolveTypeFromRoot(f, rootNodes))
        .filter((v) => v)
        .join(';\n\t')}
    }`;
};
exports.resolveModelTypes = resolveModelTypes;
