/* eslint-disable */

import React, { useState, createContext } from 'react'

import { getToken, signIn, signOut } from 'library/utils/authUtil'

const UserContext = createContext();

const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null)

  const loginCTX = async (loginData) => {
    try {
      // 1. attempt to sign in (add JWT token to storage)
      await signIn(loginData.token);
      console.log('Saved login token in Storage', loginData.token);
      // 2. store the user in context
      setCurrentUser(loginData.user)
      console.log('Updated Context with new user', loginData.user.email);
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
      // 2. clear user in context
      setCurrentUser(null)
      console.log('Cleared user from context')
    } catch (e) {
      // AsyncStorage errors would lead us here
      console.log('ERROR LOGGING OUT:', e.message);
      Alert.alert('Logout failed');
    }
  }

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, loginCTX, logoutCTX }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

const UserContextConsumer = UserContext.Consumer;

export { UserContext };
export { UserContextProvider };
export { UserContextConsumer };

