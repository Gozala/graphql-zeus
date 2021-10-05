"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolverForFunction = void 0;
const returnedModelTypes_1 = require("../templates/returnedModelTypes");
exports.resolverForFunction = {
    ts: `
export const resolverFor = <
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
) => fn as (args?: any,source?: any) => any;
`,
    js: `
export const resolverFor = (
  type,
  field,
  fn
) => fn;
`,
};
