import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

import { UserContextProvider } from 'library/utils/UserContext';
import { getToken } from 'library/utils/authUtil';
import AppContainer from './App';
import { name as appName } from './app.json';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const authLink = setContext(async (req, { headers }) => {
  // grab token from AsyncStorage
  const token = await getToken();

  // put token in authorization header
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({
  uri: Platform.select({
    ios: 'http://localhost:4000/',
    android: 'http://127.0.0.1:4000/',
  }),
});

// combine backend URL with headers
// const link = authLink.concat(httpLink);
const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <AppContainer />
      </UserContextProvider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);
