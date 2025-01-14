import { OperationName, ResolvedOperations } from 'TreeToTS';
import { OperationType, Environment } from '@/Models';
import { VALUETYPES } from '../resolveValueTypes';

const generateOperationThunder = (t: OperationName, ot: OperationType): string =>
  `${ot}: fullChainConstructor(fn,'${ot}', '${t.name}')`;
const generateOperationThunderSubscription = (t: OperationName, ot: OperationType): string =>
  `${ot}: fullSubscriptionConstructor(subscriptionFn,'${ot}', '${t.name}')`;

const generateOperationChaining = (t: OperationName, ot: OperationType): string =>
  `${ot}: fullChainConstructor(apiFetch(options),'${ot}', '${t.name}')`;

const generateOperationChainingSubscription = (t: OperationName, ot: OperationType): string =>
  `${ot}: fullSubscriptionConstructor(apiSubscription(options),'${ot}', '${t.name}')`;

export const generateOperationsThunder = ({ query, mutation, subscription }: Partial<ResolvedOperations>): string[] => {
  const allOps: string[] = [];
  if (query?.operationName?.name && query.operations.length) {
    allOps.push(generateOperationThunder(query.operationName, OperationType.query));
  }
  if (mutation?.operationName?.name && mutation.operations.length) {
    allOps.push(generateOperationThunder(mutation.operationName, OperationType.mutation));
  }
  if (subscription?.operationName?.name && subscription.operations.length) {
    allOps.push(generateOperationThunderSubscription(subscription.operationName, OperationType.subscription));
  }
  return allOps;
};

export const generateOperationsChaining = ({
  query,
  mutation,
  subscription,
}: Partial<ResolvedOperations>): string[] => {
  const allOps: string[] = [];
  if (query?.operationName?.name && query.operations.length) {
    allOps.push(generateOperationChaining(query.operationName, OperationType.query));
  }
  if (mutation?.operationName?.name && mutation.operations.length) {
    allOps.push(generateOperationChaining(mutation.operationName, OperationType.mutation));
  }
  if (subscription?.operationName?.name && subscription.operations.length) {
    allOps.push(generateOperationChainingSubscription(subscription.operationName, OperationType.subscription));
  }
  return allOps;
};

const generateOperationZeus = (t: OperationName, ot: OperationType): string =>
  `${ot}: (o:${VALUETYPES}["${t.name}"], operationName?: string) => queryConstruct('${ot}', '${t.name}', operationName)(o)`;

const generateOperationsZeusTypeScript = ({ query, mutation, subscription }: Partial<ResolvedOperations>): string[] => {
  const allOps: string[] = [];
  if (query?.operationName?.name && query.operations.length) {
    allOps.push(generateOperationZeus(query.operationName, OperationType.query));
  }
  if (mutation?.operationName?.name && mutation.operations.length) {
    allOps.push(generateOperationZeus(mutation.operationName, OperationType.mutation));
  }
  if (subscription?.operationName?.name && subscription.operations.length) {
    allOps.push(generateOperationZeus(subscription.operationName, OperationType.subscription));
  }
  return allOps;
};

const generateSelectorZeus = (t: OperationName, ot: OperationType): string =>
  `${ot}: ZeusSelect<${VALUETYPES}["${t.name}"]>()`;

const generateSelectorsZeusTypeScript = ({ query, mutation, subscription }: Partial<ResolvedOperations>): string[] => {
  const allOps: string[] = [];
  if (query?.operationName?.name && query.operations.length) {
    allOps.push(generateSelectorZeus(query.operationName, OperationType.query));
  }
  if (mutation?.operationName?.name && mutation.operations.length) {
    allOps.push(generateSelectorZeus(mutation.operationName, OperationType.mutation));
  }
  if (subscription?.operationName?.name && subscription.operations.length) {
    allOps.push(generateSelectorZeus(subscription.operationName, OperationType.subscription));
  }
  return allOps;
};

export const bodyTypeScript = (env: Environment, resolvedOperations: ResolvedOperations): string => `
export const Thunder = (fn: FetchFunction, subscriptionFn: SubscriptionFunction) => ({
  ${generateOperationsThunder(resolvedOperations).join(',\n')}
});

export const Chain = (...options: chainOptions) => ({
  ${generateOperationsChaining(resolvedOperations).join(',\n')}
});
export const Zeus = {
  ${generateOperationsZeusTypeScript(resolvedOperations).join(',\n')}
};
export const Selectors = {
  ${generateSelectorsZeusTypeScript(resolvedOperations).join(',\n')}
};
  `;
