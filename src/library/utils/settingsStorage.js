import AsyncStorage from '@react-native-community/async-storage';

// setting names
const STORY_SHAPE = 'STORY_SHAPE'; // circle, rect

// setting values
let storyShape;

export const getSetting = async (settingName) => {
  if (settingName === 'STORY_SHAPE') {
    if (storyShape) {
      return Promise.resolve(storyShape);
    }

    return AsyncStorage.getItem(STORY_SHAPE);
  }
};

export const changeSetting = async (settingName, newValue) => {
  if (settingName === 'STORY_SHAPE') {
    storyShape = newValue;

    // add new setting to async storage
    await AsyncStorage.setItem(STORY_SHAPE, storyShape);
  }
};

// I THINK I NEED TO ADD BETTER ERROR HANDLING TO LOGIN / LOGOUT
