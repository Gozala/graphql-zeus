import { TypeDefinition, TypeExtension, TypeSystemDefinition } from "./Spec";
export declare enum TypeDefinitionDisplayStrings {
    type = "type",
    enum = "enum",
    interface = "interface",
    input = "input",
    scalar = "scalar",
    union = "union",
    directive = "directive"
}
export declare enum TypeSystemDefinitionDisplayStrings {
    directive = "directive",
    schema = "schema",
    definition = "definition",
    field = "field",
    member = "member"
}
export declare const TypeDefinitionDisplayMap: Record<TypeDefinition | TypeExtension | TypeSystemDefinition.DirectiveDefinition, TypeDefinitionDisplayStrings>;
export declare const TypeSystemDefinitionDisplayMap: Record<TypeSystemDefinition, TypeSystemDefinitionDisplayStrings>;