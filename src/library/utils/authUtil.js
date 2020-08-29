import AsyncStorage from '@react-native-community/async-storage';

const AUTH_TOKEN = 'AUTH_TOKEN';
const USER_ID = 'USER_ID';
const USERNAME = 'USERNAME';

let token;
let userID;
let username;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  return AsyncStorage.getItem(AUTH_TOKEN);
};

export const getTokenAndUser = async () => {
  if (token && userID && username) {
    return Promise.resolve({ token, userID, username });
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN);
  userID = await AsyncStorage.getItem(USER_ID);
  username = await AsyncStorage.getItem(USERNAME);

  return { token, userID, username };
};

export const signIn = async (loginData) => {
  token = loginData.token;
  userID = loginData.user.id;
  username = loginData.user.username;

  // add token to async storage
  await AsyncStorage.setItem(AUTH_TOKEN, token);

  // add userID to async storage
  await AsyncStorage.setItem(USER_ID, userID);

  // add username to async storage
  await AsyncStorage.setItem(USERNAME, username);
};

export const signOut = async () => {
  token = undefined;
  userID = undefined;
  username = undefined;

  // remove token from async storage
  await AsyncStorage.removeItem(AUTH_TOKEN);

  // remove user_ID from async storage
  await AsyncStorage.removeItem(USER_ID);

  // remove user_ID from async storage
  await AsyncStorage.removeItem(USERNAME);
};

// I THINK I NEED TO ADD BETTER ERROR HANDLING TO LOGIN / LOGOUT
