import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { differenceInSeconds, differenceInDays, differenceInHours } from 'date-fns';
import { cloud_name } from 'library/config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../styles/colors';

export const monthToFloat = month => {
  if (month === 'Jan') return 0.01;
  if (month === 'Feb') return 0.02;
  if (month === 'Mar') return 0.03;
  if (month === 'Apr') return 0.04;
  if (month === 'May') return 0.05;
  if (month === 'Jun') return 0.06;
  if (month === 'Jul') return 0.07;
  if (month === 'Aug') return 0.08;
  if (month === 'Sep') return 0.09;
  if (month === 'Oct') return 0.1;
  if (month === 'Nov') return 0.11;
  if (month === 'Dec') return 0.12;
  return 0;
};

// order experiences
export const sortExperiences = (a, b) => {
  const yearAs = a.startDateYear;
  const monthAs = monthToFloat(a.startDateMonth);
  const yearAe = a.endDateYear;
  const monthAe = monthToFloat(a.endDateMonth);
  // if its your current role, sort by start date, else sort by end date
  const totalA = a.currentRole ? 5000 + yearAs + monthAs : yearAe + monthAe;

  const yearBs = b.startDateYear;
  const monthBs = monthToFloat(b.startDateMonth);
  const yearBe = b.endDateYear;
  const monthBe = monthToFloat(b.endDateMonth);
  // if its your current role, sort by start date, else sort by end date
  const totalB = b.currentRole ? 5000 + yearBs + monthBs : yearBe + monthBe;

  if (totalA > totalB) {
    return -1;
  }

  return 1;
};

export async function requestCameraRollPermission() {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
      title: 'Ambit Camera Roll Permission',
      message: 'Ambit needs access to your camera roll for your profile picture.',
      // buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera roll');
    } else {
      console.log('Camera roll permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export const imageUpload = async (user, media) => {
  // create tags
  const tags = `${user.id}`;
  // create context
  const context = `user=${user.id}`;
  // create file object
  const photo = {
    uri: media[0],
    type: 'image',
    name: `${user.id}-${media[0]}`,
  };
  // create body
  const uploadData = new FormData();
  uploadData.append('file', photo);
  uploadData.append('upload_preset', 'ambit-profilepic-preset');
  uploadData.append('tags', tags);
  uploadData.append('context', context);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });
    const resJson = await res.json();

    // return an array of URLs
    return [resJson.url];
  } catch (error) {
    console.log('an error occured trying to upload your photo');
    console.error(error);
    return error;
  }
};

export const timeDifference = (laterDate, earlierDate) => {
  let timeDiff = differenceInSeconds(laterDate, earlierDate);
  let period = 's';

  if (timeDiff >= 60) {
    timeDiff /= 60;
    period = 'm';
    if (timeDiff >= 60) {
      timeDiff /= 60;
      period = 'h';
      if (timeDiff >= 24) {
        timeDiff /= 24;
        period = 'd';
      }
    }
  }

  timeDiff = Math.round(timeDiff);

  return { timeDiff, period };
};

export const timeDifferenceGoal = (laterDate, earlierDate) => {
  const timeDiffDays = differenceInDays(laterDate, earlierDate);
  const timeDiffHours = differenceInHours(laterDate, earlierDate);

  const maxDays = 14;

  const timeRemainingDays = maxDays - timeDiffDays;
  const timeRemainingHours = maxDays * 24 - timeDiffHours;

  let timeRemaining = maxDays;
  let period = 'd';

  if (timeRemainingDays >= 1) {
    timeRemaining = timeRemainingDays;
    period = 'days';
  } else {
    timeRemaining = timeRemainingHours;
    period = 'hours';
  }

  // timeDiff = Math.round(timeDiff);

  return { timeRemaining, period };
};

export const pickFieldPrefix = (goal = '') => {
  switch (goal) {
    case '':
      return null;
    case 'Find investors':
      return 'Market';
    case 'Find freelancers':
      return 'Niche';
    case 'Find agencies':
      return 'Niche';
    case 'Find business partners':
      return 'Industry';
    case 'Find a mentor':
      return 'Industry';
    case 'Network':
      return 'Industry';
    case 'Get coffee':
      return 'Industry';
    case 'Get advice':
      return null;
    case 'Get feedback':
      return null;
    default:
      return null;
  }
};

export const pickFieldButtonText = (goal = '') => {
  switch (goal) {
    case '':
      return null;
    case 'Find investors':
      return 'Select a market';
    case 'Find freelancers':
      return 'Select a niche';
    case 'Find agencies':
      return 'Select a niche';
    case 'Find business partners':
      return 'Select an industry';
    case 'Find a mentor':
      return 'Select an industry';
    case 'Network':
      return 'Select an industry';
    case 'Get coffee':
      return 'Select an industry';
    case 'Get advice':
      return null;
    case 'Get feedback':
      return null;
    default:
      return null;
  }
};

export const getPrimaryColor = (goal = '') => {
  switch (goal) {
    case '':
      return colors.darkGray1;
    case 'Find investors':
      return colors.green;
    case 'Find freelancers':
      return colors.peach;
    case 'Find agencies':
      return colors.peach;
    case 'Find business partners':
      return colors.blue;
    case 'Find a mentor':
      return colors.blue;
    case 'Network':
      return colors.blue;
    case 'Get coffee':
      return colors.blue;
    case 'Get advice':
      return colors.blue;
    case 'Get feedback':
      return colors.blue;
    default:
      return colors.darkGray1;
  }
};

export const getBackgroundColor = (goal = '') => {
  switch (goal) {
    case '':
      return colors.systemGray3;
    case 'Find investors':
      return colors.goalGreen;
    case 'Find freelancers':
      return colors.goalPeach;
    case 'Find agencies':
      return colors.goalPeach;
    case 'Find business partners':
      return colors.goalBlue;
    case 'Find a mentor':
      return colors.goalBlue;
    case 'Network':
      return colors.goalBlue;
    case 'Get coffee':
      return colors.goalBlue;
    case 'Get advice':
      return colors.goalBlue; // was purple
    case 'Get feedback':
      return colors.goalBlue; // was purple
    default:
      return colors.systemGray3;
  }
};

export const getIcon = (goal = '', size = 15) => {
  switch (goal) {
    case '':
      return null;
    //  money
    case 'Find investors':
      return <Icon name="comment-dollar" solid size={size} color={colors.green} />;
    // help
    case 'Find freelancers':
      return <Icon name="briefcase" solid size={size} color={colors.peach} />;
    case 'Find agencies':
      return <Icon name="briefcase" solid size={size} color={colors.peach} />;
    // network
    case 'Find business partners':
      return <Icon name="user-friends" solid size={size} color={colors.blue} />;
    case 'Find a mentor':
      return <Icon name="user-friends" solid size={size} color={colors.blue} />;
    case 'Network':
      return <Icon name="user-friends" solid size={size} color={colors.blue} />;
    case 'Get coffee':
      return <Icon name="user-friends" solid size={size} color={colors.blue} />;
    // answers
    case 'Get advice':
      return <Icon name="lightbulb" solid size={size} color={colors.purple} />;
    case 'Get feedback':
      return <Icon name="lightbulb" solid size={size} color={colors.purple} />;
    case 'hashtag':
      return <Icon name="hashtag" solid size={size} color={colors.iconGray} />;
    default:
      return null;
  }
};
