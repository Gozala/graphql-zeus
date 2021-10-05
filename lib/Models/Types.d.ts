import { TypeDefinitionDisplayStrings, TypeSystemDefinitionDisplayStrings } from "./DisplayMap";
import { Helpers, Instances, ScalarTypes, Type, TypeDefinition, TypeExtension, TypeSystemDefinition, Value, ValueDefinition } from "./Spec";
export declare enum BuiltInDirectives {
    skip = "skip",
    include = "include",
    deprecated = "deprecated"
}
export declare type AllTypes = ScalarTypes | Value | ValueDefinition | TypeDefinition | TypeDefinitionDisplayStrings | TypeSystemDefinition | TypeSystemDefinitionDisplayStrings | TypeExtension | Instances | Helpers | Type;
export interface GraphQLNodeParams {
    type?: AllTypes;
    for?: AllTypes[];
}
