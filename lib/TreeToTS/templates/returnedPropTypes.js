"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvePropTypeFromRoot = void 0;
const Models_1 = require("../../Models");
const Spec_1 = require("../../Models/Spec");
const resolveArg = (f, tabs = '\t\t\t') => {
    const { type: { options }, } = f;
    const isArray = !!(options && options.find((o) => o === Models_1.Options.array));
    const isArrayRequired = !!(options && options.find((o) => o === Models_1.Options.arrayRequired));
    const isRequired = !!(options && options.find((o) => o === Models_1.Options.required));
    const aTabs = `\n${tabs}\t`;
    return `${tabs}${f.name}:{${aTabs}type:"${f.type.name}",${aTabs}array:${!!isArray},${aTabs}arrayRequired:${!!isArrayRequired},${aTabs}required:${!!isRequired}\n${tabs}}`;
};
const resolveField = (f, resolveArgs = true) => {
    const { args, name } = f;
    return `\t\t${name}:{\n${args.map((a) => resolveArg(a)).join(',\n')}\n\t\t}`;
};
const resolvePropTypeFromRoot = (i) => {
    if (i.data.type === Spec_1.TypeSystemDefinition.DirectiveDefinition) {
        return '';
    }
    if (i.data.type === Spec_1.TypeDefinition.EnumTypeDefinition) {
        return `\t${i.name}: "enum"`;
    }
    if (i.data.type === Spec_1.TypeDefinition.ScalarTypeDefinition) {
        return `\t${i.name}: "String"`;
    }
    if (i.data.type === Spec_1.TypeDefinition.InputObjectTypeDefinition) {
        return `\t${i.name}:{\n${i.args.map((f) => resolveArg(f, '\t\t')).join(',\n')}\n\t}`;
    }
    if (!i.args) {
        return '';
    }
    if (i.args.filter((f) => f.args && f.args.length > 0).length === 0) {
        return '';
    }
    return `\t${i.name}:{\n${i.args
        .filter((f) => f.args && f.args.length)
        .map((f) => resolveField(f))
        .join(',\n')}\n\t}`;
};
exports.resolvePropTypeFromRoot = resolvePropTypeFromRoot;
