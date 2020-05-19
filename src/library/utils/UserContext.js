/* eslint-disable */

import React, { useState, useEffect, createContext } from 'react'
import { Alert } from 'react-native';
import { useApolloClient, useMutation, useLazyQuery } from '@apollo/react-hooks';

import { signIn, signOut, getToken } from 'library/utils/authUtil'
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import CLEAR_NOTIFICATIONS_MUTATION from 'library/mutations/CLEAR_NOTIFICATIONS_MUTATION';
import CLEAR_UNREAD_MESSAGES_MUTATION from 'library/mutations/CLEAR_UNREAD_MESSAGES_MUTATION';

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [loadingToken, setLoadingToken] = useState(true);
  const [loadingApp, setLoadingApp] = useState(true);
  const [creatingStory, setCreatingStory] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null)
  const [unReadNotifications, setUnReadNotifications] = useState(0)
  const [unReadMessages, setUnReadMessages] = useState(0)
  const [homePosition, setHomePosition] = useState(0);

  const client = useApolloClient();

  // USER QUERY
  const [getCurrentUser, { loading: loadingUser, error, data: dataUser }] = useLazyQuery(CURRENT_USER_QUERY, {
    fetchPolicy: 'cache-and-network',
    // fetchPolicy: 'network-only',
  });

  // FOR CLEARING NOTIFICATIONS
  const [clearMyNotifications] = useMutation(CLEAR_NOTIFICATIONS_MUTATION, {
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: NOTIFICATIONS_QUERY,
        data: {
          myNotifications: dataReturned.clearMyNotifications,
        },
      });
    },
    onError: e => {
      console.log(e);
    },
  });

  // FOR CLEARING MESSAGES FOR ONE GROUP
  // const [clearUnReadMessages] = useMutation(CLEAR_UNREAD_MESSAGES_MUTATION, {
  //   onError: e => {
  //     console.log(e);
  //   },
  // });

  // get user token out of Async Storage
  useEffect(() => {
    const fetchToken = async () => {
      setLoadingToken(true);
      const token = await getToken();
      setLoadingToken(false);

      if (token) {
        getCurrentUser();
      } else {
        signOut();
        setCurrentUserId(null);
      }
    };
    fetchToken();
  }, []);

  // fetch userId and save to context (this indicates someone is logged in)
  useEffect(() => {
    if (!loadingUser && dataUser) {
      if (dataUser.userLoggedIn) {
        setCurrentUserId(dataUser.userLoggedIn.id);
      }
    }
  }, [loadingUser]);

  // determine if the app is loading
  useEffect(() => {
    if (loadingUser || loadingToken) {
      setLoadingApp(true);
    } else {
      setLoadingApp(false);
    }
  }, [loadingUser, loadingToken]);

  // LOGIN FUNCTION
  const loginCTX = async (loginData) => {
    try {
      // 1. attempt to sign in (add JWT token to storage)
      await signIn(loginData.token);
      console.log('Saved login token in Storage', loginData.token);
      // 2. store the user in context
      setCurrentUserId(loginData.user.id)
      console.log('Updated Context with new user', loginData.user.id);
    } catch (e) {
      // AsyncStorage errors would lead us here
      console.log('ERROR LOGGING IN:', e.message);
      Alert.alert('Login failed');
    }
  }

  // LOGOUT FUNCTION
  const logoutCTX = async () => {
    try {
      // 1. attempt to sign out (remove JWT token from storage)
      await signOut();
      console.log('Cleared login token from storage, user logged out!');

      // 2. clear apollo store
      await client.clearStore();
      console.log('Cleared apollo store')

      // 3. clear user in context
      setCurrentUserId(null)
      console.log('Cleared user from context')
    } catch (e) {
      // AsyncStorage errors would lead us here
      console.log('ERROR LOGGING OUT:', e.message);
      Alert.alert('Logout failed');
    }
  }

  const clearNotifications = () => {
    if (unReadNotifications) {
      setUnReadNotifications(0);
      clearMyNotifications()
    }
  }

  return (
    <UserContext.Provider
      value={{ loadingApp, currentUserId, setCurrentUserId, homePosition, setHomePosition, loginCTX, logoutCTX, unReadNotifications, setUnReadNotifications, clearNotifications, unReadMessages, setUnReadMessages, creatingStory, setCreatingStory }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

const UserContextConsumer = UserContext.Consumer;

export { UserContext };
export { UserContextProvider };
export { UserContextConsumer };

