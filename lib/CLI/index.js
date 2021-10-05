#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const CLIClass_1 = require("./CLIClass");
const args = yargs
    .usage(`
Zeus⚡⚡⚡
GraphQL Autocomplete Client Library generator

Load from file or url (url must start with http:// or https:// ):
zeus [path] [output_path] [options]
`)
    .option('node', {
    alias: 'n',
    describe: 'Generate client for NodeJS( default is for browser and react-native )',
    boolean: true,
})
    .option('typescript', {
    alias: 'ts',
    describe: 'Output TypeScript only',
    boolean: true,
})
    .option('header', {
    alias: 'h',
    describe: 'Additional header flag. You can also pass multiple headers like this -h myheader:123123 -h myheader2:321321',
    string: true,
})
    .option('graphql', {
    alias: 'g',
    describe: 'Download and save schema also. Path where .graphql schema file should be put. ',
    string: true,
})
    .option('jsonSchema', {
    alias: 'j',
    describe: 'Generate JSON Schema to create forms from inputs and type fields with args. Path where .json schema file should be put. ',
    string: true,
})
    .demandCommand(1).argv;
CLIClass_1.CLI.execute(args);
