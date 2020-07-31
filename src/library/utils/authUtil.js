import AsyncStorage from '@react-native-community/async-storage';

const AUTH_TOKEN = 'AUTH_TOKEN';
const USER_ID = 'USER_ID';

let token;
let userID;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  return AsyncStorage.getItem(AUTH_TOKEN);
};

export const getTokenAndUser = async () => {
  if (token && userID) {
    return Promise.resolve({ token, userID });
  }

  userID = await AsyncStorage.getItem(USER_ID);
  token = await AsyncStorage.getItem(AUTH_TOKEN);
  return { token, userID };
};

export const signIn = async (loginData) => {
  token = loginData.token;
  userID = loginData.user.id;

  // add userID to async storage
  await AsyncStorage.setItem(USER_ID, userID);

  // add token to async storage
  await AsyncStorage.setItem(AUTH_TOKEN, token);
};

export const signOut = async () => {
  token = undefined;
  userID = undefined;

  // remove user_ID from async storage
  await AsyncStorage.removeItem(USER_ID);

  // remove token from async storage
  await AsyncStorage.removeItem(AUTH_TOKEN);
};

// I THINK I NEED TO ADD BETTER ERROR HANDLING TO LOGIN / LOGOUT
