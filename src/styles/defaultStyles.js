import { StyleSheet } from 'react-native';

import colors from 'styles/colors';

const styles = StyleSheet.create({
  // SMALL, 11px
  smallThinMute: {
    color: colors.darkGray,
    fontSize: 11,
    fontWeight: '300',
    opacity: 0.8,
  },
  smallMute: {
    color: colors.darkGray,
    fontSize: 11,
    fontWeight: '400',
    opacity: 0.6,
  },
  smallText: {
    color: colors.darkGray,
    fontSize: 11,
    fontWeight: '400',
  },
  smallMedium: {
    color: colors.darkGray,
    fontSize: 11,
    fontWeight: '500',
  },
  smallBold: {
    color: colors.darkGray,
    fontSize: 11,
    fontWeight: '600',
  },
  // DEFAULT, 13px
  defaultMute: {
    color: colors.darkGray,
    fontSize: 13,
    fontWeight: '300',
    opacity: 0.3,
  },
  defaultThin: {
    color: colors.darkGray,
    fontSize: 13,
    fontWeight: '100',
  },
  defaultText: {
    color: colors.darkGray,
    fontSize: 13,
    fontWeight: '400',
  },
  defaultRegular: {
    color: colors.darkGray,
    fontSize: 13,
    fontWeight: '400',
  },
  defaultMedium: {
    color: colors.darkGray,
    fontSize: 13,
    fontWeight: '500',
  },
  defaultBold: {
    color: colors.darkGray,
    fontSize: 13,
    fontWeight: '600',
  },
  // LARGE, 15px
  largeThin: {
    color: colors.darkGray,
    fontSize: 15,
    fontWeight: '300',
  },
  largeText: {
    color: colors.darkGray,
    fontSize: 15,
    fontWeight: '400',
  },
  largeMedium: {
    color: colors.darkGray,
    fontSize: 15,
    fontWeight: '500',
  },
  largeBold: {
    color: colors.darkGray,
    fontSize: 15,
    fontWeight: '600',
  },
  // HEADER, 17px
  headerTitle: {
    color: colors.darkGray,
    fontSize: 17,
    fontWeight: '600',
  },
  hugeText: {
    color: colors.darkGray,
    fontSize: 17,
    fontWeight: '400',
  },
  hugeMedium: {
    color: colors.darkGray,
    fontSize: 17,
    fontWeight: '500',
  },
  hugeBold: {
    color: colors.darkGray,
    fontSize: 17,
    fontWeight: '600',
  },
  paddingBottomNav: {
    paddingBottom: 50,
  },
  // SHADOWS
  shadow3: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 6,

    // elevation: 3,
  },
  shadow6: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  shadow12: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  shadow18: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
});

export default styles;

// san fransisco font weights
// 100: ultra-thin
// 300: thin
// 400: regular
// 500: medium
// 600: semibold
// 700: bold
// 800: heavy
