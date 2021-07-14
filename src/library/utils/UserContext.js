/* eslint-disable */

import React, { useState, useEffect, createContext } from 'react'
import { Alert } from 'react-native';
import { useApolloClient } from '@apollo/client';
import analytics from '@segment/analytics-react-native';
import { viewedStories, viewedStoryItems } from 'library/utils/cache';

import { signIn, signOut, getTokenAndUser } from 'library/utils/authUtil'

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [loadingApp, setLoadingApp] = useState(true);
  const [loadingToken, setLoadingToken] = useState(true);
  const [showNetworkActivity, setShowNetworkActivity] = useState(false);
  const [uploadingStory, setUploadingStory] = useState(false);
  const [uploadingPost, setUploadingPost] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');
  const [goToTopics, setGoToTopics] = useState(false);
  const [activeTab, setActiveTab] = useState('HomeStack');
  const [refreshHomeScreen, setRefreshHomeScreen] = useState(false);
  const [hasNewMatches, setHasNewMatches] = useState(false);

  const client = useApolloClient();

  // INITIAL RENDER -> get user token out of Async Storage
  useEffect(() => {
    const fetchTokenAndUser = async () => {
      setLoadingApp(true);
      setLoadingToken(true);
      const { token, userID, username } = await getTokenAndUser();

      if (token && userID && username) {
        // if we got a userID -> save to context (this indicates someone is logged in)
        await setCurrentUserId(userID);
        await setCurrentUsername(username);
      } else {
        signOut();
        await setCurrentUserId('');
        await setCurrentUsername('');
      }

      setLoadingApp(false);
      setLoadingToken(false);
    };
    fetchTokenAndUser();
  }, []);

  // LOGIN FUNCTION -> passed to context
  const loginCTX = async (loginData) => {
    setLoadingToken(true);
    try {
      // 1. attempt to sign in (add JWT token & userID to storage)
      await signIn(loginData);
      console.log('Saved login token in Storage', loginData.token);
      // 2. store the user in context
      setCurrentUserId(loginData.user.id)
      setCurrentUsername(loginData.user.username)
      setLoadingToken(false);
      // console.log(`sending identify for ${currentUserId}`);
      // analytics.identify(currentUserId);
      console.log('Saved userID/name to Storage & updated Context with userID/name', loginData.user.id, loginData.user.username);
    } catch (e) {
      // AsyncStorage errors would lead us here
      setLoadingToken(false);
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

      // 2. clear apollo store & reactive variables
      await client.clearStore();
      viewedStoryItems([]);
      viewedStories([]);
      console.log('Cleared apollo store')

      // 3. clear user in context
      setCurrentUserId('')
      setCurrentUsername('')
      console.log('Cleared user from context')
    } catch (e) {
      // AsyncStorage errors would lead us here
      console.log('ERROR LOGGING OUT:', e.message);
      Alert.alert('Logout failed');
    }
  }

  return (
    <UserContext.Provider
      value={{
        loadingApp,
        loadingToken,
        currentUserId,
        currentUsername,
        loginCTX,
        logoutCTX,
        showNetworkActivity,
        setShowNetworkActivity,
        uploadingStory,
        setUploadingStory,
        uploadingPost,
        setUploadingPost,
        goToTopics,
        setGoToTopics,
        activeTab,
        setActiveTab,
        refreshHomeScreen,
        setRefreshHomeScreen,
        hasNewMatches,
        setHasNewMatches
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

const UserContextConsumer = UserContext.Consumer;

export { UserContext };
export { UserContextProvider };
export { UserContextConsumer };

