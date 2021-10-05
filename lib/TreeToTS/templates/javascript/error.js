"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlErrorJavascript = void 0;
exports.graphqlErrorJavascript = `
export class GraphQLError extends Error {
    constructor(response) {
      super("");
      this.response = response;
      console.error(response);
    }
    toString() {
      return "GraphQL Response Error";
    }
  }
`;
