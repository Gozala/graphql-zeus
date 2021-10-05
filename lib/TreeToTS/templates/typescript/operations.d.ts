import { ResolvedOperations } from "../..";
import { Environment } from "../../../Models";
export declare const generateOperationsThunder: ({ query, mutation, subscription }: Partial<ResolvedOperations>) => string[];
export declare const generateOperationsChaining: ({ query, mutation, subscription, }: Partial<ResolvedOperations>) => string[];
export declare const bodyTypeScript: (env: Environment, resolvedOperations: ResolvedOperations) => string;
