"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const cross_fetch_1 = require("cross-fetch");
const graphql_1 = require("graphql");
class Utils {
}
exports.Utils = Utils;
_a = Utils;
Utils.getFromUrl = (url, header) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (header) {
        const allHeaders = Array.isArray(header) ? header : [header];
        for (const h of allHeaders) {
            const [key, val] = h.split(':').map((k) => k.trim());
            if (!val) {
                throw new Error(`Incorrect Header ${key}`);
            }
            headers[key] = val;
        }
    }
    const response = yield (0, cross_fetch_1.default)(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: (0, graphql_1.getIntrospectionQuery)() }),
    });
    const { data, errors } = yield response.json();
    if (errors) {
        throw new Error(JSON.stringify(errors, null, 2));
    }
    const c = (0, graphql_1.buildClientSchema)(data);
    return Utils.printFullSchema(c);
});
Utils.printFullSchema = (schema) => {
    const queryType = schema.getQueryType();
    const mutationType = schema.getMutationType();
    const subscriptionType = schema.getSubscriptionType();
    let schemaClient = (0, graphql_1.printSchema)(schema);
    const schemaPrintedAtTheBeginning = (queryType && queryType.name !== 'Query') ||
        (mutationType && mutationType.name !== 'Mutation') ||
        (subscriptionType && subscriptionType.name !== 'Subscription');
    if (!schemaPrintedAtTheBeginning) {
        const addons = [];
        if (queryType) {
            addons.push(`query: ${queryType.name}`);
        }
        if (mutationType) {
            addons.push(`mutation: ${mutationType.name}`);
        }
        if (subscriptionType) {
            addons.push(`subscription: ${subscriptionType.name}`);
        }
        if (addons.length > 0) {
            schemaClient += `\nschema{\n\t${addons.join(',\n\t')}\n}`;
        }
    }
    return schemaClient;
};