/* eslint-disable */

import React, { useState, createContext } from 'react'
import { Query } from 'react-apollo'

import { getToken, signIn, signOut } from 'library/utils/authUtil'
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY'

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
    } catch (e) {
      // AsyncStorage errors would lead us here
      console.log('ERROR LOGGING OUT:', e.message);
      Alert.alert('Logout failed');
    }
  }

  return (
    <Query query={CURRENT_USER_QUERY}>
      {(loading, error, data, refetch) => {
        if (!loading && !error && data) {
          setCurrentUser(data.userLoggedIn)
        }

        return (
          <UserContext.Provider
            value={{ loadingUser: loading, errorUser: error, refetchUser: refetch, currentUser, loginCTX, logoutCTX }}
          >
            {props.children}
          </UserContext.Provider>
        )
      }}
    </Query>

  )
}

const UserContextConsumer = UserContext.Consumer;

export { UserContextProvider };
export { UserContextConsumer };

