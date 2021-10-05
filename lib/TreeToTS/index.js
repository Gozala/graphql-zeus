"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeToTS = void 0;
const Models_1 = require("../Models");
const javascript_1 = require("./templates/javascript");
const resolveValueTypes_1 = require("./templates/resolveValueTypes");
const returnedModelTypes_1 = require("./templates/returnedModelTypes");
const returnedPropTypes_1 = require("./templates/returnedPropTypes");
const returnedReturns_1 = require("./templates/returnedReturns");
const returnedTypes_1 = require("./templates/returnedTypes");
const typescript_1 = require("./templates/typescript");
const disableLintersComments = ['eslint-disable'];
class TreeToTS {
    static findOperations(nodes, ot) {
        const node = nodes.filter((n) => n.type.operations && n.type.operations.find((o) => o === ot))[0];
        if (node === undefined) {
            return { operationName: undefined, operations: [] };
        }
        const args = node.args ? node.args : [];
        const operations = args.map((f) => f.name);
        return { operationName: { name: node.name, type: 'operation' }, operations };
    }
    static resolveOperations(tree) {
        const nodes = tree.nodes;
        return {
            query: TreeToTS.findOperations(nodes, Models_1.OperationType.query),
            mutation: TreeToTS.findOperations(nodes, Models_1.OperationType.mutation),
            subscription: TreeToTS.findOperations(nodes, Models_1.OperationType.subscription),
        };
    }
    static resolveBasisHeader() {
        return `${disableLintersComments.map((rule) => `/* ${rule} */\n`).join('')}\n`;
    }
    static resolveBasisCodeJavascript(tree) {
        const propTypes = `export const AllTypesProps = {\n${tree.nodes
            .map(returnedPropTypes_1.resolvePropTypeFromRoot)
            .filter((pt) => pt)
            .join(',\n')}\n}`;
        const returnTypes = `export const ReturnTypes = {\n${tree.nodes
            .map((f) => (0, returnedReturns_1.resolveReturnFromRoot)(f, f.data.type === Models_1.TypeDefinition.InterfaceTypeDefinition
            ? tree.nodes.filter((n) => { var _a; return (_a = n.interfaces) === null || _a === void 0 ? void 0 : _a.includes(f.name); }).map((n) => n.name)
            : undefined))
            .filter((pt) => pt)
            .join(',\n')}\n}`;
        return propTypes.concat('\n\n').concat(returnTypes);
    }
    static resolveBasisCode(tree) {
        const propTypes = `export const AllTypesProps: Record<string,any> = {\n${tree.nodes
            .map(returnedPropTypes_1.resolvePropTypeFromRoot)
            .filter((pt) => pt)
            .join(',\n')}\n}`;
        const returnTypes = `export const ReturnTypes: Record<string,any> = {\n${tree.nodes
            .map((f) => (0, returnedReturns_1.resolveReturnFromRoot)(f, f.data.type === Models_1.TypeDefinition.InterfaceTypeDefinition
            ? tree.nodes.filter((n) => { var _a; return (_a = n.interfaces) === null || _a === void 0 ? void 0 : _a.includes(f.name); }).map((n) => n.name)
            : undefined))
            .filter((pt) => pt)
            .join(',\n')}\n}`;
        return propTypes.concat('\n\n').concat(returnTypes);
    }
    static resolveBasisTypes(tree) {
        const rootTypes = (0, returnedTypes_1.resolveTypes)(tree.nodes);
        const valueTypes = (0, resolveValueTypes_1.resolveValueTypes)(tree.nodes);
        const modelTypes = (0, returnedModelTypes_1.resolveModelTypes)(tree.nodes);
        const unionTypes = (0, returnedTypes_1.resolveUnions)(tree.nodes);
        const interfaceTypes = (0, returnedTypes_1.resolveInterfaces)(tree.nodes);
        return interfaceTypes
            .concat('\n')
            .concat(unionTypes)
            .concat('\n\n')
            .concat(valueTypes)
            .concat('\n\n')
            .concat(modelTypes)
            .concat('\n\n')
            .concat(rootTypes);
    }
    static javascriptSplit(tree, env = 'browser', host) {
        const operationsBody = TreeToTS.resolveOperations(tree);
        const operations = (0, javascript_1.bodyJavascript)(env, operationsBody);
        return {
            index: operations.concat(host ? '\n\n' : '').concat(host ? `export const Gql = Chain('${host}')` : ''),
            indexImports: `import { AllTypesProps, ReturnTypes } from './const.js';`,
            const: TreeToTS.resolveBasisCodeJavascript(tree),
            definitions: TreeToTS.resolveBasisTypes(tree)
                .concat('\n\n')
                .concat(typescript_1.constantTypesTypescript)
                .concat((0, javascript_1.generateOperationsJavascript)(operationsBody)),
        };
    }
    static resolveTreeSplit(tree, env = 'browser', host) {
        const operations = (0, typescript_1.bodyTypeScript)(env, TreeToTS.resolveOperations(tree));
        return {
            indexImports: `import { AllTypesProps, ReturnTypes } from './const.js';`,
            const: TreeToTS.resolveBasisCode(tree),
            index: TreeToTS.resolveBasisTypes(tree)
                .concat(typescript_1.graphqlErrorTypeScript.concat('\n').concat(typescript_1.constantTypesTypescript).concat('\n\n'))
                .concat((0, typescript_1.typescriptFunctions)(env))
                .concat(operations)
                .concat(host ? '\n\n' : '')
                .concat(host ? `export const Gql = Chain('${host}')` : ''),
        };
    }
    static resolveTree(tree, env = 'browser', host) {
        const t = TreeToTS.resolveTreeSplit(tree, env, host);
        return TreeToTS.resolveBasisHeader().concat(t.const).concat('\n').concat(t.index);
    }
}
exports.TreeToTS = TreeToTS;
