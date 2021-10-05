import { Environment } from "../Models";
export declare class TranslateGraphQL {
    static typescript: (schema: string, env?: Environment, host?: string | undefined) => string;
    static typescriptSplit: (schema: string, env?: Environment, host?: string | undefined) => {
        const: string;
        index: string;
    };
    static javascriptSplit: (schema: string, env?: Environment, host?: string | undefined) => {
        index: string;
        const: string;
        "index.d": string;
    };
}
