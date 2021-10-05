"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeusSelectFunction = void 0;
exports.ZeusSelectFunction = {
    ts: `export const ZeusSelect = <T>() => ((t: any) => t) as SelectionFunction<T>;`,
    js: `export const ZeusSelect = () => (t) => t`,
};
