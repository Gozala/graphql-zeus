"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeSystemDefinitionDisplayMap = exports.TypeDefinitionDisplayMap = exports.TypeSystemDefinitionDisplayStrings = exports.TypeDefinitionDisplayStrings = void 0;
const Spec_1 = require("./Spec");
var TypeDefinitionDisplayStrings;
(function (TypeDefinitionDisplayStrings) {
    TypeDefinitionDisplayStrings["type"] = "type";
    TypeDefinitionDisplayStrings["enum"] = "enum";
    TypeDefinitionDisplayStrings["interface"] = "interface";
    TypeDefinitionDisplayStrings["input"] = "input";
    TypeDefinitionDisplayStrings["scalar"] = "scalar";
    TypeDefinitionDisplayStrings["union"] = "union";
    TypeDefinitionDisplayStrings["directive"] = "directive";
})(TypeDefinitionDisplayStrings = exports.TypeDefinitionDisplayStrings || (exports.TypeDefinitionDisplayStrings = {}));
var TypeSystemDefinitionDisplayStrings;
(function (TypeSystemDefinitionDisplayStrings) {
    TypeSystemDefinitionDisplayStrings["directive"] = "directive";
    TypeSystemDefinitionDisplayStrings["schema"] = "schema";
    TypeSystemDefinitionDisplayStrings["definition"] = "definition";
    TypeSystemDefinitionDisplayStrings["field"] = "field";
    TypeSystemDefinitionDisplayStrings["member"] = "member";
})(TypeSystemDefinitionDisplayStrings = exports.TypeSystemDefinitionDisplayStrings || (exports.TypeSystemDefinitionDisplayStrings = {}));
exports.TypeDefinitionDisplayMap = {
    [Spec_1.TypeDefinition.ObjectTypeDefinition]: TypeDefinitionDisplayStrings.type,
    [Spec_1.TypeDefinition.EnumTypeDefinition]: TypeDefinitionDisplayStrings.enum,
    [Spec_1.TypeDefinition.InterfaceTypeDefinition]: TypeDefinitionDisplayStrings.interface,
    [Spec_1.TypeDefinition.InputObjectTypeDefinition]: TypeDefinitionDisplayStrings.input,
    [Spec_1.TypeDefinition.ScalarTypeDefinition]: TypeDefinitionDisplayStrings.scalar,
    [Spec_1.TypeDefinition.UnionTypeDefinition]: TypeDefinitionDisplayStrings.union,
    [Spec_1.TypeExtension.ObjectTypeExtension]: TypeDefinitionDisplayStrings.type,
    [Spec_1.TypeExtension.EnumTypeExtension]: TypeDefinitionDisplayStrings.enum,
    [Spec_1.TypeExtension.InterfaceTypeExtension]: TypeDefinitionDisplayStrings.interface,
    [Spec_1.TypeExtension.InputObjectTypeExtension]: TypeDefinitionDisplayStrings.input,
    [Spec_1.TypeExtension.ScalarTypeExtension]: TypeDefinitionDisplayStrings.scalar,
    [Spec_1.TypeExtension.UnionTypeExtension]: TypeDefinitionDisplayStrings.union,
    [Spec_1.TypeSystemDefinition.DirectiveDefinition]: TypeDefinitionDisplayStrings.directive,
};
exports.TypeSystemDefinitionDisplayMap = {
    [Spec_1.TypeSystemDefinition.DirectiveDefinition]: TypeSystemDefinitionDisplayStrings.directive,
    [Spec_1.TypeSystemDefinition.FieldDefinition]: TypeSystemDefinitionDisplayStrings.field,
    [Spec_1.TypeSystemDefinition.SchemaDefinition]: TypeSystemDefinitionDisplayStrings.schema,
    [Spec_1.TypeSystemDefinition.TypeDefinition]: TypeSystemDefinitionDisplayStrings.definition,
    [Spec_1.TypeSystemDefinition.UnionMemberDefinition]: TypeSystemDefinitionDisplayStrings.member,
};