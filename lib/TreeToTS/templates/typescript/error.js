"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlErrorTypeScript = void 0;
exports.graphqlErrorTypeScript = `
export class GraphQLError extends Error {
    constructor(public response: GraphQLResponse) {
      super("");
      console.error(response);
    }
    toString() {
      return "GraphQL Response Error";
    }
  }
`;
