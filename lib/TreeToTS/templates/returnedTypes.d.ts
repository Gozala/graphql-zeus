import { ParserField } from "../../Models";
export declare const TYPES = "GraphQLTypes";
export declare const resolveUnions: (rootNodes: ParserField[]) => string;
export declare const resolveInterfaces: (rootNodes: ParserField[]) => string;
export declare const resolveTypeFromRoot: (i: ParserField, rootNodes: ParserField[]) => string;
export declare const resolveTypes: (rootNodes: ParserField[]) => string;
