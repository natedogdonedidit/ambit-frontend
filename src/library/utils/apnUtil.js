import AsyncStorage from '@react-native-community/async-storage';

const APN_TOKEN = 'APN_TOKEN';

let apnToken;

export const getApnToken = async () => {
  if (apnToken) {
    return Promise.resolve(apnToken);
  }

  return AsyncStorage.getItem(APN_TOKEN);
};

export const saveApnToken = async (newToken) => {
  apnToken = newToken;

  // add apnToken to async storage
  await AsyncStorage.setItem(APN_TOKEN, apnToken);
};

export const removeApnToken = async () => {
  apnToken = undefined;

  // remove apnToken from async storage
  await AsyncStorage.removeItem(APN_TOKEN);
};