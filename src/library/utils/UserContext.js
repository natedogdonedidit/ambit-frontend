/* eslint-disable */

import React, { useState, useEffect, createContext } from 'react'
import { Alert } from 'react-native';
import { useApolloClient, useMutation } from '@apollo/client';

import { signIn, signOut, getTokenAndUser } from 'library/utils/authUtil'
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import CLEAR_NOTIFICATIONS_MUTATION from 'library/mutations/CLEAR_NOTIFICATIONS_MUTATION';
// import CLEAR_UNREAD_MESSAGES_MUTATION from 'library/mutations/CLEAR_UNREAD_MESSAGES_MUTATION';

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [loadingToken, setLoadingToken] = useState(true);
  const [creatingStory, setCreatingStory] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [unReadNotifications, setUnReadNotifications] = useState(0);
  const [unReadMessages, setUnReadMessages] = useState(0);
  const [homePosition, setHomePosition] = useState(0);

  const client = useApolloClient();

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

  // INITIAL RENDER -> get user token out of Async Storage
  useEffect(() => {
    const fetchTokenAndUser = async () => {
      setLoadingToken(true);
      const { token, userID } = await getTokenAndUser();
      setLoadingToken(false);

      if (token && userID) {
        // if we got a userID -> save to context (this indicates someone is logged in)
        setCurrentUserId(userID);
      } else {
        signOut();
        setCurrentUserId(null);
      }
    };
    fetchTokenAndUser();
  }, []);


  // LOGIN FUNCTION -> passed to context
  const loginCTX = async (loginData) => {
    try {
      // 1. attempt to sign in (add JWT token & userID to storage)
      await signIn(loginData);
      console.log('Saved login token in Storage', loginData.token);
      // 2. store the user in context
      setCurrentUserId(loginData.user.id)
      console.log('Saved userID to Storage & updated Context with userID', loginData.user.id);
    } catch (e) {
      // AsyncStorage errors would lead us here
      console.log('ERROR LOGGING IN:', e.message);
      Alert.alert('Login failed');
    }
  }

  // LOGOUT FUNCTION
  const logoutCTX = async () => {
    try {
      // 1. attempt to sign out (remove JWT token & userID from storage)
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
      value={{ loadingToken, currentUserId, loginCTX, logoutCTX, homePosition, setHomePosition,  unReadNotifications, setUnReadNotifications, clearNotifications, unReadMessages, setUnReadMessages, creatingStory, setCreatingStory }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

const UserContextConsumer = UserContext.Consumer;

export { UserContext };
export { UserContextProvider };
export { UserContextConsumer };

