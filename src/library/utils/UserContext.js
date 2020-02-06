/* eslint-disable */

import React, { useState, createContext } from 'react'
import { Alert } from 'react-native';
import { useApolloClient } from '@apollo/react-hooks';

import { getToken, signIn, signOut } from 'library/utils/authUtil'
// import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [currentUserId, setCurrentUserId] = useState(null)
  const client = useApolloClient();
  // const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

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

  return (
    <UserContext.Provider
      value={{ currentUserId, setCurrentUserId, loginCTX, logoutCTX }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

const UserContextConsumer = UserContext.Consumer;

export { UserContext };
export { UserContextProvider };
export { UserContextConsumer };

