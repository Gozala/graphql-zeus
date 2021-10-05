"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.javascriptFunctions = void 0;
const functions_1 = require("../../functions");
const javascriptFunctions = (env) => `
${functions_1.ScalarResolverFunction.js}
${functions_1.TypePropsResolverFunction.js}
${functions_1.isArrayFunctionFunction.js}
${functions_1.resolveKVFunction.js}
${functions_1.objectToTreeFunction.js}
${functions_1.traverseToSeekArraysFunction.js}
${functions_1.buildQueryFunction.js}
${functions_1.inspectVariablesFunction.js}
${functions_1.queryConstructFunction.js}
${functions_1.fullChainConstructFunction.js}
${functions_1.fullSubscriptionConstruct.js}
${functions_1.seekForAliasesFunction.js}
${functions_1.VariableFunction.js}
${functions_1.ZeusSelectFunction.js}
${functions_1.resolverForFunction.js}
${require(`./${env}/fetchFunction`).default}
${require(`./${env}/apiSubscription`).default}
  `;
exports.javascriptFunctions = javascriptFunctions;
