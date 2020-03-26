import React from 'react';
import { PermissionsAndroid } from 'react-native';
import { differenceInSeconds, differenceInDays, differenceInHours } from 'date-fns';
import { cloud_name } from 'library/config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../styles/colors';
import { goalsList, allTopics, topicsList } from './lists';

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

export const sortChats = (a, b) => {
  if (a.latestMessage.createdAt > b.latestMessage.createdAt) {
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

export const profilePicUpload = async (userId, uri) => {
  // create tags
  const tags = `${userId}, profilepic, image`;

  // create file object (all fields required)
  const photo = {
    uri,
    type: 'image',
    name: `${userId}_profilepic`,
  };
  // create body
  const uploadData = new FormData();
  uploadData.append('file', photo);
  uploadData.append('upload_preset', 'ambit-profilepic-preset');
  uploadData.append('tags', tags);
  // uploadData.append('public_id', `${user.id}_profilepic`); // cant overwrite for unsigned uploads

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });
    const resJson = await res.json();
    // console.log('resJson', resJson);

    // return the image url
    return resJson.url;
    // return { uri: resJson.url, width: resJson.width, height: resJson.height };
  } catch (error) {
    console.log('an error occured trying to upload your photo');
    // console.error(error);
    return error;
  }
};

export const bannerPicUpload = async (userId, uri) => {
  // create tags
  const tags = `${userId}, bannerpic, image`;

  // create file object (all fields required)
  const photo = {
    uri,
    type: 'image',
    name: `${userId}_bannerpic`,
  };
  // create body
  const uploadData = new FormData();
  uploadData.append('file', photo);
  uploadData.append('upload_preset', 'ambit-bannerpic-preset');
  uploadData.append('tags', tags);
  // uploadData.append('public_id', `${user.id}_profilepic`); // cant overwrite for unsigned uploads

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });
    const resJson = await res.json();
    // console.log('resJson', resJson);

    // return the image url
    return resJson.url;
    // return { uri: resJson.url, width: resJson.width, height: resJson.height };
  } catch (error) {
    console.log('an error occured trying to upload your photo');
    // console.error(error);
    return error;
  }
};

export const postPicUpload = async (userId, uri) => {
  // create tags
  const tags = `${userId}, post, image`;

  // create file object (all fields required)
  const photo = {
    uri,
    type: 'image',
    name: uri,
  };
  // create body
  const uploadData = new FormData();
  uploadData.append('file', photo);
  uploadData.append('upload_preset', 'ambit-postpic-preset');
  uploadData.append('tags', tags);
  // uploadData.append('public_id', `${user.id}_profilepic`); // cant overwrite for unsigned uploads

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });
    const resJson = await res.json();
    // console.log('resJson', resJson);

    // return the image url
    return resJson.url;
  } catch (error) {
    console.log('an error occured trying to upload your photo');
    // console.error(error);
    return error;
  }
};

export const introPicUpload = async (userId, uri) => {
  // create tags
  const tags = `${userId}, intro, image`;

  // create file object (all fields required)
  const photo = {
    uri,
    type: 'image',
    name: uri,
  };
  // create body
  const uploadData = new FormData();
  uploadData.append('file', photo);
  uploadData.append('upload_preset', 'ambit-postpic-preset');
  uploadData.append('tags', tags);
  // uploadData.append('public_id', `${user.id}_profilepic`); // cant overwrite for unsigned uploads

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: uploadData,
    });
    const resJson = await res.json();
    // console.log('resJson', resJson);

    // return the image url
    return resJson.url;
  } catch (error) {
    console.log('an error occured trying to upload your photo');
    // console.error(error);
    return error;
  }
};

export const introVideoUpload = async (userId, uri) => {
  // create tags
  const tags = `${userId}, intro, video`;

  // create file object (all fields required)
  const video = {
    uri,
    type: 'video',
    name: uri,
  };
  // create body
  const uploadData = new FormData();
  uploadData.append('file', video);
  uploadData.append('upload_preset', 'ambit-intro-video-preset');
  uploadData.append('tags', tags);
  // uploadData.append('public_id', `${user.id}_profilepic`); // cant overwrite for unsigned uploads

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`, {
      method: 'POST',
      body: uploadData,
    });
    const resJson = await res.json();
    // console.log('resJson', resJson);

    // return the image url and duration
    return { url: resJson.url, duration: resJson.duration };
  } catch (error) {
    console.log('fail2');
    console.log('an error occured trying to upload your photo');
    // console.error(error);
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

export const getGoalInfo = (goal, field) => {
  const fullGoal = goalsList.find(i => i.name === goal);
  if (!fullGoal) return '';
  if (!field) return fullGoal;
  return fullGoal[field];
};

// will return an object { topicID: 'text', name: 'text' }
export const getTopicFromID = topicID => allTopics.find(topic => topic.topicID === topicID);
export const getFullTopicFromID = topicID => topicsList.find(topic => topic.topicID === topicID);
export const getParentTopicFromID = topicIDpassedIn => {
  for (let i = 0; i < topicsList.length; i++) {
    const parentTopic = topicsList[i];

    const { name, topicID, icon, color, children } = parentTopic;

    if (topicID === topicIDpassedIn) {
      return parentTopic;
    }

    const ind = children.findIndex(sub => sub.topicID === topicIDpassedIn);
    if (ind >= 0) {
      return parentTopic;
    }
  }

  return null;
};

export const addMainTopics = topics => {
  // the new array we are creating
  const mainTopicsToAdd = [];

  const usedTopicsIDonly = topics.map(topic => topic.topicID);
  const mainTopicsIDonly = topicsList.map(topic => topic.topicID);

  mainTopicsIDonly.forEach(mainTopicID => {
    // check if the mainTopicID needs to be added
    const addIt = usedTopicsIDonly.some(usedTopicID => usedTopicID.startsWith(mainTopicID) && mainTopicID !== usedTopicID);

    // if true - add the main topic
    if (addIt) {
      mainTopicsToAdd.push({ topicID: mainTopicID });
    }
  });

  // return a new array with the main topics on the end
  return [...topics, ...mainTopicsToAdd];
};
