import { ApolloClient } from "apollo-client";
// cache
import { InMemoryCache } from "apollo-cache-inmemory";
// links
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import LSProvider from "./session/localStorageProvider";
import { ApolloLink, Observable } from "apollo-link";
import Api from "../api/Api";
export const createCache = () => {
  const cache = new InMemoryCache();
  if (process.env.NODE_ENV === "development") {
    window.secretVariableToStoreCache = cache;
  }
  return cache;
};
// getToken from meta tags
const setTokenForOperation = async operation =>
  operation.setContext({
    headers: {
      Authorization: "Bearer " + LSProvider.getToken(),
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
// link with token
const createLinkWithToken = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(setTokenForOperation)
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer)
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );
// log erors
const logError = error => console.error(error);
// create error link
const createErrorLink = () =>
  onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      logError("GraphQL - Error", {
        errors: graphQLErrors,
        operationName: operation.operationName,
        variables: operation.variables
      });
    }
    if (networkError) {
      logError("GraphQL - NetworkError", networkError);
    }
  });
// http link
const createHttpLink = () =>
  new HttpLink({
    uri: Api.graphqlPath
  });
//...
export const createClient = (cache, requestLink) => {
  return new ApolloClient({
    link: ApolloLink.from([
      createErrorLink(),
      createLinkWithToken(),
      createHttpLink()
    ]),
    cache
  });
};
