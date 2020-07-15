/* eslint-disable no-underscore-dangle */
import 'react-native-gesture-handler'; // required by React Navigation docs
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { ApolloProvider } from 'react-apollo';

// APOLLO SETUP AFTER SUBSCRIPTIONS
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
// for analytics
import analytics from '@segment/analytics-react-native';
import mixpanel from '@segment/analytics-react-native-mixpanel';

import { SafeAreaProvider, initialWindowSafeAreaInsets } from 'react-native-safe-area-context';
import { UserContextProvider } from 'library/utils/UserContext';
import { getToken } from 'library/utils/authUtil';
import AppNavigator from './App';
import { name as appName } from './app.json';

// setup analytics
const setupAnalytics = async () => {
  await analytics
    .setup('zHxaKjU0CbDCYBLTEU1OsjIvU79jCbfc', {
      using: [mixpanel],
      // recordScreenViews: false,
      trackAppLifecycleEvents: true,
      trackAttributionData: true,
    })
    .then(() => console.log('Analytics is ready'))
    .catch((err) => console.error('Something went wrong', err));
};
setupAnalytics();

// eslint-disable-next-line no-undef
GLOBAL.Blob = null; // required so Network Inspect works on RNdebugger

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const authLink = setContext(async (req, { headers }) => {
  // grab token from AsyncStorage
  const token = await getToken();

  // console.log(req);

  // put token in authorization header
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

// Create an http link:
const httpLink = new HttpLink({
  uri: Platform.select({
    // ios: 'http://localhost:4000/', // simulator
    // ios: 'http://192.168.123.61:4000', // work
    // ios: 'http://192.168.1.214:4000', // home
    // ios: 'http://192.168.1.147:4000', // condo
    // ios: 'http://192.168.1.25:4000', // Pats
    // ios: 'http://172.16.227.28:4000', // starbucks
    // ios: 'http://192.168.0.16:4000', // Moms
    ios: 'https://ambit-yoga-prod.herokuapp.com/',
  }),
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: Platform.select({
    // ios: 'ws://localhost:4000/', // simulator
    // ios: 'ws://192.168.123.61:4000', // work
    // ios: 'ws://192.168.1.214:4000', // home
    // ios: 'ws://192.168.1.147:4000', // condo
    // ios: 'ws://192.168.1.25:4000', // Pats
    // ios: 'ws://172.16.227.28:4000', // starbucks
    // ios: 'ws://192.168.0.16:4000', // Moms
    ios: 'ws://ambit-yoga-prod.herokuapp.com/',
  }),
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink
);

// create apollo client
const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([errorLink, authLink, link]),
  cache: new InMemoryCache({
    // dataIdFromObject: o => o.id,
    dataIdFromObject: (object) => {
      switch (object.__typename) {
        case 'MessageConnection':
          // console.log('in dataIdFromObject', object);
          if (object.id) {
            return `MessageConnection:${object.id}`;
          }
          return `MessageConnection:${object.edges[0].node.to.id}`;
        // case 'Topic':
        //   console.log('in dataIdFromObject', object);
        //   if (object.topicID) {
        //     return `Topic:${object.topicID}`;
        //   }
        //   return defaultDataIdFromObject(object);

        default:
          return defaultDataIdFromObject(object);
      }
    },
    cacheRedirects: {
      Query: {
        user: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'User', id: args.id }),
        singlePost: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Post', id: args.id }),
        group: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Group', id: args.id }),
        // messages: (_, args, { getCacheKey }) => `GroupC:${args.groupID}`,
        messages: (_, args, { getCacheKey }) => {
          // console.log('in cacheredirect', args.groupID);
          return getCacheKey({ __typename: 'MessageConnection', id: `${args.groupID}` });
        },
      },
    },
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
        <UserContextProvider>
          <AppNavigator />
        </UserContextProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);
