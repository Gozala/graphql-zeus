"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQueryFunction = void 0;
exports.buildQueryFunction = {
    ts: `
const buildQuery = (type: string, a?: Record<any, any>) => 
  traverseToSeekArrays([type], a);
`,
    js: `
const buildQuery = (type, a) =>
  traverseToSeekArrays([type], a)  
`,
};
