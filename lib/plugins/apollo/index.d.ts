import { ParserTree } from 'graphql-js-tree';
export declare const pluginApollo: (tree: ParserTree) => {
    ts: string;
    js: {
        code: string;
        definitions: string;
    };
};
