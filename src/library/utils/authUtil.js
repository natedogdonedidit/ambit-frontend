import AsyncStorage from '@react-native-community/async-storage';

const AUTH_TOKEN = 'AUTH_TOKEN';

let token;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN);
  return token;
};

export const signIn = async newToken => {
  token = newToken;
  return AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const signOut = async () => {
  token = undefined;
  return AsyncStorage.removeItem(AUTH_TOKEN);
};

// I THINK I NEED TO ADD BETTER ERROR HANDLING TO LOGIN / LOGOUT
