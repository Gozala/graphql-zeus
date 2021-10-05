"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyJavascript = void 0;
const Models_1 = require("../../../Models");
const _1 = require(".");
const operations_1 = require("../typescript/operations");
const generateOperationZeusJavascript = (ot, on) => `${ot}: (o, operationName) => queryConstruct('${ot}', '${on.name}', operationName)(o)`;
const generateOperationsZeusJavascipt = ({ query, mutation, subscription }) => {
    var _a, _b, _c;
    const allOps = [];
    if (((_a = query === null || query === void 0 ? void 0 : query.operationName) === null || _a === void 0 ? void 0 : _a.name) && query.operations.length) {
        allOps.push(generateOperationZeusJavascript(Models_1.OperationType.query, query.operationName));
    }
    if (((_b = mutation === null || mutation === void 0 ? void 0 : mutation.operationName) === null || _b === void 0 ? void 0 : _b.name) && mutation.operations.length) {
        allOps.push(generateOperationZeusJavascript(Models_1.OperationType.mutation, mutation.operationName));
    }
    if (((_c = subscription === null || subscription === void 0 ? void 0 : subscription.operationName) === null || _c === void 0 ? void 0 : _c.name) && subscription.operations.length) {
        allOps.push(generateOperationZeusJavascript(Models_1.OperationType.subscription, subscription.operationName));
    }
    return allOps;
};
const generateSelectorZeus = (ot) => `${ot}: ZeusSelect()`;
const generateSelectorsZeusJavascript = ({ query, mutation, subscription }) => {
    var _a, _b, _c;
    const allOps = [];
    if (((_a = query === null || query === void 0 ? void 0 : query.operationName) === null || _a === void 0 ? void 0 : _a.name) && query.operations.length) {
        allOps.push(generateSelectorZeus(Models_1.OperationType.query));
    }
    if (((_b = mutation === null || mutation === void 0 ? void 0 : mutation.operationName) === null || _b === void 0 ? void 0 : _b.name) && mutation.operations.length) {
        allOps.push(generateSelectorZeus(Models_1.OperationType.mutation));
    }
    if (((_c = subscription === null || subscription === void 0 ? void 0 : subscription.operationName) === null || _c === void 0 ? void 0 : _c.name) && subscription.operations.length) {
        allOps.push(generateSelectorZeus(Models_1.OperationType.subscription));
    }
    return allOps;
};
const bodyJavascript = (env, resolvedOperations) => `
${_1.graphqlErrorJavascript}
${(0, _1.javascriptFunctions)(env)}
export const Thunder = (fn, subscriptionFn) => ({
  ${(0, operations_1.generateOperationsThunder)(resolvedOperations).join(',\n')}
});

export const Chain = (...options) => ({
  ${(0, operations_1.generateOperationsChaining)(resolvedOperations).join(',\n')}
});
export const Zeus = {
  ${generateOperationsZeusJavascipt(resolvedOperations).join(',\n')}
};
export const Selectors = {
  ${generateSelectorsZeusJavascript(resolvedOperations).join(',\n')}
};
    `;
exports.bodyJavascript = bodyJavascript;
