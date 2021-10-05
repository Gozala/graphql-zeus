import { ParserTree } from "../Models";
import { JSONSchema7 } from 'json-schema';
export declare type JSONSchemaOverrideProperties<T> = Omit<JSONSchema7, 'properties'> & {
    properties: T extends {
        [P in keyof T]: T[P];
    } ? {
        [P in keyof T]: JSONSchema7;
    } : never;
};
declare type ExtractPayLoad<T> = T extends [infer PayLoad, any] ? PayLoad : T;
export declare type OverrideFormSchema<Y = any> = {
    [P in keyof Y]?: {
        [R in keyof Y[P]]?: (generated: JSONSchemaOverrideProperties<ExtractPayLoad<Y[P][R]>>) => JSONSchemaOverrideProperties<Partial<ExtractPayLoad<Y[P][R]>>> | undefined;
    };
};
export declare class TreeToJSONSchema {
    static parse(parserTree: ParserTree): {
        inputs: Record<string, JSONSchema7>;
        types: Record<string, Record<string, JSONSchema7>>;
    };
}
export {};