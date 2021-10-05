"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyTypeScript = exports.generateOperationsChaining = exports.generateOperationsThunder = void 0;
const Models_1 = require("../../../Models");
const resolveValueTypes_1 = require("../resolveValueTypes");
const generateOperationThunder = (t, ot) => `${ot}: fullChainConstructor(fn,'${ot}', '${t.name}')`;
const generateOperationThunderSubscription = (t, ot) => `${ot}: fullSubscriptionConstructor(subscriptionFn,'${ot}', '${t.name}')`;
const generateOperationChaining = (t, ot) => `${ot}: fullChainConstructor(apiFetch(options),'${ot}', '${t.name}')`;
const generateOperationChainingSubscription = (t, ot) => `${ot}: fullSubscriptionConstructor(apiSubscription(options),'${ot}', '${t.name}')`;
const generateOperationsThunder = ({ query, mutation, subscription }) => {
    var _a, _b, _c;
    const allOps = [];
    if (((_a = query === null || query === void 0 ? void 0 : query.operationName) === null || _a === void 0 ? void 0 : _a.name) && query.operations.length) {
        allOps.push(generateOperationThunder(query.operationName, Models_1.OperationType.query));
    }
    if (((_b = mutation === null || mutation === void 0 ? void 0 : mutation.operationName) === null || _b === void 0 ? void 0 : _b.name) && mutation.operations.length) {
        allOps.push(generateOperationThunder(mutation.operationName, Models_1.OperationType.mutation));
    }
    if (((_c = subscription === null || subscription === void 0 ? void 0 : subscription.operationName) === null || _c === void 0 ? void 0 : _c.name) && subscription.operations.length) {
        allOps.push(generateOperationThunderSubscription(subscription.operationName, Models_1.OperationType.subscription));
    }
    return allOps;
};
exports.generateOperationsThunder = generateOperationsThunder;
const generateOperationsChaining = ({ query, mutation, subscription, }) => {
    var _a, _b, _c;
    const allOps = [];
    if (((_a = query === null || query === void 0 ? void 0 : query.operationName) === null || _a === void 0 ? void 0 : _a.name) && query.operations.length) {
        allOps.push(generateOperationChaining(query.operationName, Models_1.OperationType.query));
    }
    if (((_b = mutation === null || mutation === void 0 ? void 0 : mutation.operationName) === null || _b === void 0 ? void 0 : _b.name) && mutation.operations.length) {
        allOps.push(generateOperationChaining(mutation.operationName, Models_1.OperationType.mutation));
    }
    if (((_c = subscription === null || subscription === void 0 ? void 0 : subscription.operationName) === null || _c === void 0 ? void 0 : _c.name) && subscription.operations.length) {
        allOps.push(generateOperationChainingSubscription(subscription.operationName, Models_1.OperationType.subscription));
    }
    return allOps;
};
exports.generateOperationsChaining = generateOperationsChaining;
const generateOperationZeus = (t, ot) => `${ot}: (o:${resolveValueTypes_1.VALUETYPES}["${t.name}"], operationName?: string) => queryConstruct('${ot}', '${t.name}', operationName)(o)`;
const generateOperationsZeusTypeScript = ({ query, mutation, subscription }) => {
    var _a, _b, _c;
    const allOps = [];
    if (((_a = query === null || query === void 0 ? void 0 : query.operationName) === null || _a === void 0 ? void 0 : _a.name) && query.operations.length) {
        allOps.push(generateOperationZeus(query.operationName, Models_1.OperationType.query));
    }
    if (((_b = mutation === null || mutation === void 0 ? void 0 : mutation.operationName) === null || _b === void 0 ? void 0 : _b.name) && mutation.operations.length) {
        allOps.push(generateOperationZeus(mutation.operationName, Models_1.OperationType.mutation));
    }
    if (((_c = subscription === null || subscription === void 0 ? void 0 : subscription.operationName) === null || _c === void 0 ? void 0 : _c.name) && subscription.operations.length) {
        allOps.push(generateOperationZeus(subscription.operationName, Models_1.OperationType.subscription));
    }
    return allOps;
};
const generateSelectorZeus = (t, ot) => `${ot}: ZeusSelect<${resolveValueTypes_1.VALUETYPES}["${t.name}"]>()`;
const generateSelectorsZeusTypeScript = ({ query, mutation, subscription }) => {
    var _a, _b, _c;
    const allOps = [];
    if (((_a = query === null || query === void 0 ? void 0 : query.operationName) === null || _a === void 0 ? void 0 : _a.name) && query.operations.length) {
        allOps.push(generateSelectorZeus(query.operationName, Models_1.OperationType.query));
    }
    if (((_b = mutation === null || mutation === void 0 ? void 0 : mutation.operationName) === null || _b === void 0 ? void 0 : _b.name) && mutation.operations.length) {
        allOps.push(generateSelectorZeus(mutation.operationName, Models_1.OperationType.mutation));
    }
    if (((_c = subscription === null || subscription === void 0 ? void 0 : subscription.operationName) === null || _c === void 0 ? void 0 : _c.name) && subscription.operations.length) {
        allOps.push(generateSelectorZeus(subscription.operationName, Models_1.OperationType.subscription));
    }
    return allOps;
};
const bodyTypeScript = (env, resolvedOperations) => `
export const Thunder = (fn: FetchFunction, subscriptionFn: SubscriptionFunction) => ({
  ${(0, exports.generateOperationsThunder)(resolvedOperations).join(',\n')}
});

export const Chain = (...options: chainOptions) => ({
  ${(0, exports.generateOperationsChaining)(resolvedOperations).join(',\n')}
});
export const Zeus = {
  ${generateOperationsZeusTypeScript(resolvedOperations).join(',\n')}
};
export const Selectors = {
  ${generateSelectorsZeusTypeScript(resolvedOperations).join(',\n')}
};
  `;
exports.bodyTypeScript = bodyTypeScript;
