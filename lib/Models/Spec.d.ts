export declare enum ScalarTypes {
    Boolean = "Boolean",
    Float = "Float",
    ID = "ID",
    Int = "Int",
    String = "String"
}
export declare enum Directive {
    SCHEMA = "SCHEMA",
    SCALAR = "SCALAR",
    OBJECT = "OBJECT",
    FIELD_DEFINITION = "FIELD_DEFINITION",
    ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION",
    INTERFACE = "INTERFACE",
    UNION = "UNION",
    ENUM = "ENUM",
    ENUM_VALUE = "ENUM_VALUE",
    INPUT_OBJECT = "INPUT_OBJECT",
    INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION"
}
export declare enum Value {
    Variable = "Variable",
    IntValue = "IntValue",
    FloatValue = "FloatValue",
    StringValue = "StringValue",
    BooleanValue = "BooleanValue",
    NullValue = "NullValue",
    EnumValue = "EnumValue",
    ListValue = "ListValue",
    ObjectValue = "ObjectValue"
}
export declare enum Type {
    NamedType = "NamedType",
    ListType = "ListType",
    NonNullType = "NonNullType"
}
export declare enum TypeSystemDefinition {
    SchemaDefinition = "SchemaDefinition",
    TypeDefinition = "TypeDefinition",
    DirectiveDefinition = "DirectiveDefinition",
    FieldDefinition = "FieldDefinition",
    UnionMemberDefinition = "UnionMemberDefinition"
}
export declare enum TypeSystemExtension {
    SchemaExtension = "SchemaExtension",
    TypeExtension = "TypeExtension"
}
export declare enum TypeDefinition {
    ScalarTypeDefinition = "ScalarTypeDefinition",
    ObjectTypeDefinition = "ObjectTypeDefinition",
    InterfaceTypeDefinition = "InterfaceTypeDefinition",
    UnionTypeDefinition = "UnionTypeDefinition",
    EnumTypeDefinition = "EnumTypeDefinition",
    InputObjectTypeDefinition = "InputObjectTypeDefinition"
}
export declare enum ValueDefinition {
    EnumValueDefinition = "EnumValueDefinition",
    InputValueDefinition = "InputValueDefinition"
}
export declare enum TypeExtension {
    ScalarTypeExtension = "ScalarTypeExtension",
    ObjectTypeExtension = "ObjectTypeExtension",
    InterfaceTypeExtension = "InterfaceTypeExtension",
    UnionTypeExtension = "UnionTypeExtension",
    EnumTypeExtension = "EnumTypeExtension",
    InputObjectTypeExtension = "InputObjectTypeExtension"
}
export declare enum OperationType {
    query = "query",
    mutation = "mutation",
    subscription = "subscription"
}
export declare enum Instances {
    Argument = "Argument",
    Directive = "Directive",
    Implement = "Implement"
}
export declare enum Helpers {
    Directives = "Directives",
    Implements = "Implements",
    Extend = "Extend",
    Comment = "Comment"
}
