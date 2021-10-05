import { GraphQLSchema } from 'graphql';
export declare class Utils {
    static getFromUrl: (url: string, header?: string | string[] | undefined) => Promise<string>;
    static printFullSchema: (schema: GraphQLSchema) => string;
}
