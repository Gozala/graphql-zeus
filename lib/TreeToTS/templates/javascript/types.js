"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOperationsJavascript = void 0;
const Models_1 = require("../../../Models");
const resolveValueTypes_1 = require("../resolveValueTypes");
const returnedTypes_1 = require("../returnedTypes");
const returnedModelTypes_1 = require("../returnedModelTypes");
const generateOperationsJavascriptDefinitionsChaining = ({ query, mutation, subscription, }) => {
    var _a, _b, _c;
    const allOps = [];
    if (query.operations.length) {
        const queryOperationName = ((_a = query.operationName) === null || _a === void 0 ? void 0 : _a.name) || 'Query';
        allOps.push(`${Models_1.OperationType.query}: OperationToGraphQL<${resolveValueTypes_1.VALUETYPES}["${queryOperationName}"],${returnedTypes_1.TYPES}["${queryOperationName}"]>`);
    }
    if (mutation.operations.length) {
        const mutationOperationName = ((_b = mutation.operationName) === null || _b === void 0 ? void 0 : _b.name) || 'Mutation';
        allOps.push(`${Models_1.OperationType.mutation}: OperationToGraphQL<${resolveValueTypes_1.VALUETYPES}["${mutationOperationName}"],${returnedTypes_1.TYPES}["${mutationOperationName}"]>`);
    }
    if (subscription.operations.length) {
        const subscriptionOperationName = ((_c = subscription.operationName) === null || _c === void 0 ? void 0 : _c.name) || 'Subscription';
        allOps.push(`${Models_1.OperationType.subscription}: OperationToGraphQL<${resolveValueTypes_1.VALUETYPES}["${subscriptionOperationName}"],${returnedTypes_1.TYPES}["${subscriptionOperationName}"]>`);
    }
    return allOps;
};
const ZeusOperations = (t, ot) => `${ot}: (o: ${resolveValueTypes_1.VALUETYPES}["${t.name}"]) => string`;
const generateOperationsJavascriptDefinitionsZeus = ({ query, mutation, subscription, }) => {
    var _a, _b, _c;
    const allOps = [];
    if (((_a = query === null || query === void 0 ? void 0 : query.operationName) === null || _a === void 0 ? void 0 : _a.name) && query.operations.length) {
        allOps.push(ZeusOperations(query.operationName, Models_1.OperationType.query));
    }
    if (((_b = mutation === null || mutation === void 0 ? void 0 : mutation.operationName) === null || _b === void 0 ? void 0 : _b.name) && mutation.operations.length) {
        allOps.push(ZeusOperations(mutation.operationName, Models_1.OperationType.mutation));
    }
    if (((_c = subscription === null || subscription === void 0 ? void 0 : subscription.operationName) === null || _c === void 0 ? void 0 : _c.name) && subscription.operations.length) {
        allOps.push(ZeusOperations(subscription.operationName, Models_1.OperationType.subscription));
    }
    return allOps;
};
const ZeusSelector = (t, ot) => `${ot}: SelectionFunction<${resolveValueTypes_1.VALUETYPES}["${t.name}"]>`;
const generateOperationsJavascriptDefinitionsSelector = ({ query, mutation, subscription, }) => {
    var _a, _b, _c;
    const allOps = [];
    if (((_a = query === null || query === void 0 ? void 0 : query.operationName) === null || _a === void 0 ? void 0 : _a.name) && query.operations.length) {
        allOps.push(ZeusSelector(query.operationName, Models_1.OperationType.query));
    }
    if (((_b = mutation === null || mutation === void 0 ? void 0 : mutation.operationName) === null || _b === void 0 ? void 0 : _b.name) && mutation.operations.length) {
        allOps.push(ZeusSelector(mutation.operationName, Models_1.OperationType.mutation));
    }
    if (((_c = subscription === null || subscription === void 0 ? void 0 : subscription.operationName) === null || _c === void 0 ? void 0 : _c.name) && subscription.operations.length) {
        allOps.push(ZeusSelector(subscription.operationName, Models_1.OperationType.subscription));
    }
    return allOps;
};
const generateOperationsJavascript = (operationsBody) => `
export declare function Thunder(
  fn: FetchFunction,
  subscriptionFn: SubscriptionFunction
):{
  ${generateOperationsJavascriptDefinitionsChaining(operationsBody)}
}

export declare function Chain(
  ...options: chainOptions
):{
  ${generateOperationsJavascriptDefinitionsChaining(operationsBody)}
}

export declare const Zeus: {
  ${generateOperationsJavascriptDefinitionsZeus(operationsBody)}
}

export declare const Selectors: {
  ${generateOperationsJavascriptDefinitionsSelector(operationsBody)}
}

export declare const resolverFor : <
  T extends keyof ValueTypes,
  Z extends keyof ValueTypes[T],
  Y extends (
    args: Required<ValueTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ${returnedModelTypes_1.MODEL_TYPES}[T] ? ${returnedModelTypes_1.MODEL_TYPES}[T][Z] | Promise<${returnedModelTypes_1.MODEL_TYPES}[T][Z]> : any
>(
  type: T,
  field: Z,
  fn: Y,
) => (args?:any, source?:any) => void;

export declare const Gql: ReturnType<typeof Chain>
`;
exports.generateOperationsJavascript = generateOperationsJavascript;
