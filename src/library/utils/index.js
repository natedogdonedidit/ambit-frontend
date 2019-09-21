import { PermissionsAndroid } from 'react-native';
import { differenceInSeconds, differenceInDays, differenceInHours } from 'date-fns';

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
