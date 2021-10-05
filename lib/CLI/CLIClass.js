"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
const fs = require("fs");
const path = require("path");
const TranslateGraphQL_1 = require("../TranslateGraphQL");
const Utils_1 = require("../Utils");
const TreeToJSONSchema_1 = require("../TreeToJSONSchema");
const graphql_js_tree_1 = require("graphql-js-tree");
const apollo_1 = require("../plugins/apollo");
class CLI {
}
exports.CLI = CLI;
_a = CLI;
CLI.execute = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const env = args.node ? 'node' : 'browser';
    let schemaFileContents = '';
    const allArgs = args._;
    const schemaFile = allArgs[0];
    let host;
    if (schemaFile.startsWith('http://') || schemaFile.startsWith('https://')) {
        const { header } = args;
        host = schemaFile;
        schemaFileContents = yield Utils_1.Utils.getFromUrl(schemaFile, header);
    }
    schemaFileContents = schemaFileContents || fs.readFileSync(schemaFile).toString();
    const pathToFile = allArgs[1] || '';
    const tree = graphql_js_tree_1.Parser.parse(schemaFileContents);
    if (args.graphql) {
        const schemaPath = args.graphql.endsWith('.graphql') || args.graphql.endsWith('.gql')
            ? args.graphql
            : path.join(args.graphql, 'schema.graphql');
        const pathToSchema = path.dirname(schemaPath);
        const schemaFile = path.basename(schemaPath);
        writeFileRecursive(pathToSchema, schemaFile, schemaFileContents);
    }
    if (args.jsonSchema) {
        const schemaPath = args.jsonSchema.endsWith('.json')
            ? args.jsonSchema
            : path.join(args.jsonSchema, 'schema.json');
        const pathToSchema = path.dirname(schemaPath);
        const schemaFile = path.basename(schemaPath);
        const content = TreeToJSONSchema_1.TreeToJSONSchema.parse(tree);
        writeFileRecursive(pathToSchema, schemaFile, JSON.stringify(content, null, 4));
    }
    if (args.typescript) {
        const typeScriptDefinition = TranslateGraphQL_1.TranslateGraphQL.typescriptSplit(schemaFileContents, env, host);
        Object.keys(typeScriptDefinition).forEach((k) => writeFileRecursive(path.join(pathToFile, 'zeus'), `${k}.ts`, typeScriptDefinition[k]));
        if (args.apollo) {
            writeFileRecursive(path.join(pathToFile, 'zeus'), `apollo.ts`, (0, apollo_1.pluginApollo)(tree).ts);
        }
    }
    else {
        const jsDefinition = TranslateGraphQL_1.TranslateGraphQL.javascriptSplit(schemaFileContents, env, host);
        writeFileRecursive(path.join(pathToFile, 'zeus'), `const.js`, jsDefinition.const);
        writeFileRecursive(path.join(pathToFile, 'zeus'), `index.js`, jsDefinition.index);
        writeFileRecursive(path.join(pathToFile, 'zeus'), `index.d.ts`, jsDefinition['index.d']);
        if (args.apollo) {
            const apolloResult = (0, apollo_1.pluginApollo)(tree);
            writeFileRecursive(path.join(pathToFile, 'zeus'), `apollo.js`, apolloResult.js.code);
            writeFileRecursive(path.join(pathToFile, 'zeus'), `apollo.d.ts`, apolloResult.js.definitions);
        }
    }
});
function writeFileRecursive(pathToFile, filename, data) {
    fs.mkdirSync(pathToFile, { recursive: true });
    fs.writeFileSync(path.join(pathToFile, filename), data);
}
