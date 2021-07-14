/* eslint-disable no-underscore-dangle */
import 'react-native-gesture-handler'; // required by React Navigation docs
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';
import unfetch from 'unfetch';

// PUSH NOTIFICATIONS
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

// APOLLO SETUP AFTER SUBSCRIPTIONS
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  split,
  // defaultDataIdFromObject,
} from '@apollo/client';
// import { defaultDataIdFromObject } from '@apollo/client/cache';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { relayStylePagination, getMainDefinition } from '@apollo/client/utilities';

// for analytics
import analytics from '@segment/analytics-react-native';
import mixpanel from '@segment/analytics-react-native-mixpanel';

import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { UserContextProvider } from 'library/utils/UserContext';
import { getToken } from 'library/utils/authUtil';
import AppNavigator from './App';
import { name as appName } from './app.json';
import { saveApnToken, getApnToken } from 'library/utils/apnUtil';

// eslint-disable-next-line no-undef
// GLOBAL.Blob = null; // required so Network Inspect works on RNdebugger

/////////////////////////////////////////////////////////////////
// SETUP ANALYTICS
/////////////////////////////////////////////////////////////////

// const setupAnalytics = async () => {
//   await analytics
//     .setup('zHxaKjU0CbDCYBLTEU1OsjIvU79jCbfc', {
//       using: [mixpanel],
//       // recordScreenViews: false,
//       trackAppLifecycleEvents: true,
//       trackAttributionData: true,
//     })
//     .then(() => console.log('Analytics is ready'))
//     .catch((err) => console.error('Something went wrong', err));
// };
// setupAnalytics();

/////////////////////////////////////////////////////////////////
// SETUP PUSH NOTIFICATIONS
/////////////////////////////////////////////////////////////////

// Must be outside of any component LifeCycle (such as `componentDidMount`)
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function ({ os, token }) {
    console.log('TOKEN:', token);

    // save new APN token to Async Storage
    saveApnToken(token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

/////////////////////////////////////////////////////////////////
// CONNECT TO BACKEND USING APOLLO CLIENT
/////////////////////////////////////////////////////////////////

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => console.log(message));
  }
});

const authLink = setContext(async (req, { headers }) => {
  // grab auth token from AsyncStorage
  const token = await getToken();
  // console.log('token', token);

  // grab apn token from AsyncStorage
  const apnToken = await getApnToken();
  // console.log('apnToken', apnToken);

  // put token in authorization header
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
      apntoken: apnToken ? `${apnToken}` : null,
    },
  };
});

// Create an http link:
const httpLink = new HttpLink({
  uri: Platform.select({
    // ios: 'http://localhost:4000/graphql', // simulator
    // ios: 'http://192.168.123.241:4000/graphql', // work
    // ios: 'http://192.168.1.214:4000/graphql', // home
    // ios: 'http://192.168.0.31:4000/graphql', // jmajor
    // ios: 'http://192.168.1.147:4000', // condo
    // ios: 'http://192.168.1.25:4000', // Pats
    // ios: 'http://172.16.227.28:4000', // starbucks
    // ios: 'http://192.168.0.16:4000', // Moms
    // ios: 'https://ambit-yoga-prod.herokuapp.com/',
    // ios: 'https://ambit-backend-nexus.herokuapp.com/graphql', // heroku prod - old DB
    ios: 'https://ambit-backend-nexus-v2.herokuapp.com/graphql', // heroku prod
  }),
  // fetch: unfetch, // required so Network Inspect works on RNdebugger
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: Platform.select({
    // ios: 'ws://localhost:4000/graphql', // simulator
    // ios: 'ws://192.168.123.241:4000/graphql', // work
    // ios: 'ws://192.168.1.214:4000/graphql', // home
    // ios: 'ws://192.168.0.31:4000/graphql', // jmajor
    // ios: 'ws://192.168.1.147:4000', // condo
    // ios: 'ws://192.168.1.25:4000', // Pats
    // ios: 'ws://172.16.227.28:4000', // starbucks
    // ios: 'ws://192.168.0.16:4000', // Moms
    // ios: 'ws://ambit-yoga-prod.herokuapp.com/',
    // ios: 'ws://ambit-backend-nexus.herokuapp.com/graphql', // heroku prod - old DB
    // ios: 'https://ambit-backend-nexus-v2.herokuapp.com/graphql', // heroku prod - why does this one say https?
    ios: 'ws://ambit-backend-nexus-v2.herokuapp.com/graphql', // heroku prod
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
    typePolicies: {
      Query: {
        fields: {
          user(existingData, { args, toReference }) {
            return existingData || toReference({ __typename: 'User', username: args.where.username });
          },
          post(existingData, { args, toReference, canRead }) {
            // const item = existingData || toReference({ __typename: 'Post', id: args.where.id });
            // return canRead(item) ? item : null;
            return existingData || toReference({ __typename: 'Post', id: args.where.id });
          },
          postsForYou: {
            keyArgs: ['feed'],
          },
          postsFollowing: {
            keyArgs: ['feed'],
          },
          postsMyGoals: {
            keyArgs: ['feed'],
          },
          postsWhere: {
            keyArgs: ['where'],
          },
          // group(existingData, { args, toReference }) {
          //   return existingData || toReference({ __typename: 'Group', id: args.id });
          // },
          // messages(existingData, { args, toReference }) {
          //   console.log('groupID', args.groupID);
          //   console.log('existing', existingData);
          //   console.log(toReference({ __typename: 'MessageConnection', id: `${args.groupID}` }));
          //   return existingData || toReference({ __typename: 'MessageConnection', id: `${args.groupID}` });
          // },
          singlePostMatches: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          messages: {
            merge(existing = [], incoming = [], options) {
              // console.log(options);

              // if it is a subscription - put message first
              if (!options.args.orderBy && !options.args.first && !options.args.after) {
                return [...incoming, ...existing];
              }

              // if it is a fetch more - put the messages last
              // return [...existing, ...incoming]; // if you do this, it duplicates the entire chat if you send a new message to a chat not in cache
              return [...incoming];
            },
          },
          // for follow button opt response
          iFollow: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          storiesForYou: {
            keyArgs: ['feed'],
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          storiesTopic: {
            keyArgs: ['topic'],
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          stories: {
            keyArgs: ['where'],
            merge(existing = [], incoming = [], options) {
              // if fetching more, add stories to end
              if (!!options.variables && !!options.variables.after) {
                return [...existing, ...incoming];
              }

              return [...incoming];
            },
          },
          // updateOneUser: {
          //   merge(existing = [], incoming = [], options) {
          //     return { ...existing, ...incoming };
          //   },
          // },
        },
      },
      User: {
        keyFields: ['username'],
        fields: {
          topicsFocus: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          topicsInterest: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          topicsFreelance: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          topicsInvest: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          topicsMentor: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          // added this kinda on a wimb...if have trouble with following/followers try uncomment
          followers: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          // added this kinda on a wimb...if have trouble with following/followers try uncomment
          following: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          blockedByMe: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
        },
      },
      Notification: {
        // this is to remove dangling refs error if something is deleted. returns 'null' if child ref is deleted from cache
        fields: {
          post(existing, { canRead, toReference }) {
            // If there is no existing thing, return null
            return canRead(existing) ? existing : null;
          },
          comment(existing, { canRead, toReference }) {
            // If there is no existing thing, return null
            return canRead(existing) ? existing : null;
          },
          update(existing, { canRead, toReference }) {
            // If there is no existing thing, return null
            return canRead(existing) ? existing : null;
          },
          from(existing, { canRead, toReference }) {
            // If there is no existing thing, return null
            return canRead(existing) ? existing : null;
          },
        },
      },
      PostConnection: {
        fields: {
          posts: {
            merge(existing = [], incoming = [], options) {
              // console.log('options', options);
              // console.log('existing', existing);
              // console.log('incoming', incoming);

              // if a cursor was provided - add incoming to the end
              if (options.variables && options.variables.cursor) {
                return [...existing, ...incoming];
              }

              return incoming;
            },
          },
        },
      },
      Post: {
        fields: {
          updates: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
          comments: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
        },
      },
      Update: {
        fields: {
          // comments: {
          //   merge(existing = [], incoming = [], options) {
          //     return [...incoming];
          //   },
          // },
        },
      },
      Story: {
        fields: {
          items: {
            merge(existing = [], incoming = [], options) {
              return [...incoming];
            },
          },
        },
      },
      Comment: {
        // this is to remove dangling refs error if something is deleted. returns 'null' if child ref is deleted from cache
        fields: {
          parentPost(existing, { canRead, toReference }) {
            // If there is no existing thing, return null
            return canRead(existing) ? existing : null;
          },
          parentUpdate(existing, { canRead, toReference }) {
            // If there is no existing thing, return null
            return canRead(existing) ? existing : null;
          },
          parentComment(existing, { canRead, toReference }) {
            // If there is no existing thing, return null
            return canRead(existing) ? existing : null;
          },
          // this caused a "cant spread non-iterable error"
          // comments: {
          //   merge(existing = [], incoming = [], options) {
          //     return [...incoming];
          //   },
          // },
        },
      },
    },
    // dataIdFromObject: o => o.id,
    // dataIdFromObject: (object) => {
    //   switch (object.__typename) {
    //     case 'MessageConnection':
    //       // console.log('in dataIdFromObject', object);
    //       if (object.id) {
    //         return `MessageConnection:${object.id}`;
    //       }
    //       return `MessageConnection:${object.edges[0].node.to.id}`;
    //     // case 'Topic':
    //     //   console.log('in dataIdFromObject', object);
    //     //   if (object.topicID) {
    //     //     return `Topic:${object.topicID}`;
    //     //   }
    //     //   return defaultDataIdFromObject(object);

    //     default:
    //       return defaultDataIdFromObject(object);
    //   }
    // },
    // cacheRedirects: {
    //   Query: {
    //     user: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'User', id: args.id }),
    //     singlePost: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Post', id: args.id }),
    //     group: (_, args, { getCacheKey }) => getCacheKey({ __typename: 'Group', id: args.id }),
    //     // messages: (_, args, { getCacheKey }) => `GroupC:${args.groupID}`,
    //     messages: (_, args, { getCacheKey }) => {
    //       // console.log('in cacheredirect', args.groupID);
    //       return getCacheKey({ __typename: 'MessageConnection', id: `${args.groupID}` });
    //     },
    //   },
    // },
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
});

enableScreens();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <UserContextProvider>
          <AppNavigator />
        </UserContextProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);
