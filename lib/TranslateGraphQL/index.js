"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateGraphQL = void 0;
const graphql_js_tree_1 = require("graphql-js-tree");
const TreeToTS_1 = require("../TreeToTS");
class TranslateGraphQL {
}
exports.TranslateGraphQL = TranslateGraphQL;
TranslateGraphQL.typescript = (schema, env = 'browser', host) => {
    const tree = graphql_js_tree_1.Parser.parseAddExtensions(schema);
    const ts = TreeToTS_1.TreeToTS.resolveTree(tree, env, host);
    return ts;
};
TranslateGraphQL.typescriptSplit = (schema, env = 'browser', host) => {
    const tree = graphql_js_tree_1.Parser.parseAddExtensions(schema);
    const ts = TreeToTS_1.TreeToTS.resolveTreeSplit(tree, env, host);
    return {
        const: TreeToTS_1.TreeToTS.resolveBasisHeader().concat(ts.const),
        index: TreeToTS_1.TreeToTS.resolveBasisHeader().concat(ts.indexImports).concat('\n').concat(ts.index),
    };
};
TranslateGraphQL.javascriptSplit = (schema, env = 'browser', host) => {
    const tree = graphql_js_tree_1.Parser.parseAddExtensions(schema);
    const js = TreeToTS_1.TreeToTS.javascriptSplit(tree, env, host);
    return {
        index: TreeToTS_1.TreeToTS.resolveBasisHeader().concat(js.indexImports).concat(js.index),
        const: TreeToTS_1.TreeToTS.resolveBasisHeader().concat(js.const),
        ['index.d']: js.definitions,
    };
};
