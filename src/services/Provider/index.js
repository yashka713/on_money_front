import React from "react";
import { ApolloProvider } from "react-apollo/index";
import { createCache, createClient } from "../apollo";

export default ({ children }) => (
  <ApolloProvider client={createClient(createCache())}>
    {children}
  </ApolloProvider>
);
