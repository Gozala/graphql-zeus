interface Yargs {
    [x: string]: unknown;
    _: (string | number)[];
    $0: string;
}
interface CliArgs extends Yargs {
    header?: string;
    typescript?: boolean;
    node?: boolean;
    graphql?: string;
    jsonSchema?: string;
    apollo?: boolean;
}
export declare class CLI {
    static execute: <T extends CliArgs>(args: T) => Promise<void>;
}
export {};
