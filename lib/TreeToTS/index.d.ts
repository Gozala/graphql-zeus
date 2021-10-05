import { Environment, OperationType, ParserField, ParserTree } from "../Models";
export interface OperationName {
    name: string;
    type: 'operation';
}
export interface ResolvedOperations {
    query: OperationDetails;
    mutation: OperationDetails;
    subscription: OperationDetails;
}
export interface OperationDetails {
    operationName?: OperationName;
    operations: string[];
}
export declare class TreeToTS {
    static findOperations(nodes: ParserField[], ot: OperationType): OperationDetails;
    static resolveOperations(tree: ParserTree): ResolvedOperations;
    static resolveBasisHeader(): string;
    static resolveBasisCodeJavascript(tree: ParserTree): string;
    static resolveBasisCode(tree: ParserTree): string;
    static resolveBasisTypes(tree: ParserTree): string;
    static javascriptSplit(tree: ParserTree, env?: Environment, host?: string): {
        index: string;
        indexImports: string;
        const: string;
        definitions: string;
    };
    static resolveTreeSplit(tree: ParserTree, env?: Environment, host?: string): {
        indexImports: string;
        const: string;
        index: string;
    };
    static resolveTree(tree: ParserTree, env?: Environment, host?: string): string;
}
