import { StyleSheet } from 'react-native';

import colors from 'styles/colors';

const small = 12;
const reg = 14;
const large = 16;
const huge = 18;

const styles = StyleSheet.create({
  // SMALL
  smallThinMute: {
    color: colors.darkGray,
    fontSize: small,
    fontFamily: 'SFProText-Light',
    opacity: 0.9,
  },
  smallMute: {
    color: colors.darkGray,
    fontSize: small,
    opacity: 0.6,
    fontFamily: 'SFProText-Regular',
  },
  smallMutey: {
    color: colors.darkGray,
    fontSize: small,
    opacity: 0.8,
    fontFamily: 'SFProText-Regular',
  },
  smallThin: {
    color: colors.darkGray,
    fontSize: small,
    fontFamily: 'SFProText-Thin',
  },
  smallLight: {
    color: colors.darkGray,
    fontSize: small,
    fontFamily: 'SFProText-Light',
  },
  smallRegular: {
    color: colors.darkGray,
    fontSize: small,
    fontFamily: 'SFProText-Regular',
  },
  smallMedium: {
    color: colors.darkGray,
    fontSize: small,
    fontFamily: 'SFProText-Medium',
  },
  // smallMediumMute: {
  //   color: colors.darkGray,
  //   fontSize: small,
  //   fontFamily: 'SFProText-Light',
  //   opacity: 0.9,
  // },
  smallSemibold: {
    color: colors.darkGray,
    fontSize: small,
    fontFamily: 'SFProText-Semibold',
  },
  smallBold: {
    color: colors.darkGray,
    fontSize: small,
    fontFamily: 'SFProText-Bold',
  },

  // DEFAULT
  defaultItalic: {
    color: colors.darkGray,
    fontSize: reg,
    fontFamily: 'SFProText-LightItalic',
  },
  defaultMediumItalic: {
    color: colors.darkGray,
    fontSize: reg,
    fontFamily: 'SFProText-MediumItalic',
  },
  defaultMute: {
    color: colors.darkGray,
    fontSize: reg,
    opacity: 0.6,
    fontFamily: 'SFProText-Light',
  },
  defaultThin: {
    color: colors.darkGray,
    fontSize: reg,
    fontFamily: 'SFProText-Thin',
  },
  defaultText: {
    color: colors.darkGray,
    fontSize: reg,
    fontFamily: 'SFProText-Light',
  },
  defaultRegular: {
    color: colors.darkGray,
    fontSize: reg,
    fontFamily: 'SFProText-Regular',
  },
  defaultMedium: {
    color: colors.darkGray,
    fontSize: reg,
    fontFamily: 'SFProText-Medium',
  },
  defaultSemibold: {
    color: colors.darkGray,
    fontSize: reg,
    fontFamily: 'SFProText-Semibold',
  },
  defaultBold: {
    color: colors.darkGray,
    fontSize: reg,
    fontFamily: 'SFProText-Bold',
  },
  // LARGE, 15px
  largeThin: {
    color: colors.darkGray,
    fontSize: large,
    fontFamily: 'SFProText-Thin',
  },
  largeLight: {
    color: colors.darkGray,
    fontSize: large,
    fontFamily: 'SFProText-Light',
  },
  largeRegular: {
    color: colors.darkGray,
    fontSize: large,
    fontFamily: 'SFProText-Regular',
  },
  largeMedium: {
    color: colors.darkGray,
    fontSize: large,
    fontFamily: 'SFProText-Medium',
  },
  largeSemibold: {
    color: colors.darkGray,
    fontSize: large,
    fontFamily: 'SFProText-Semibold',
  },
  largeBold: {
    color: colors.darkGray,
    fontSize: large,
    fontFamily: 'SFProText-Bold',
  },
  largeHeavy: {
    color: colors.darkGray,
    fontSize: large,
    fontFamily: 'SFProText-Heavy',
  },
  largeDisplay: {
    color: colors.darkGray,
    fontSize: large,
    fontFamily: 'SFProDisplay-Light',
  },
  // HUGE, 17px
  hugeThin: {
    color: colors.darkGray,
    fontSize: huge,
    fontFamily: 'SFProText-Thin',
  },
  hugeLight: {
    color: colors.darkGray,
    fontSize: huge,
    fontFamily: 'SFProText-Light',
  },
  hugeRegular: {
    color: colors.darkGray,
    fontSize: huge,
    fontFamily: 'SFProText-Regular',
  },
  hugeMedium: {
    color: colors.darkGray,
    fontSize: huge,
    fontFamily: 'SFProText-Medium',
  },
  hugeMediumDisplay: {
    color: colors.darkGray,
    fontSize: huge,
    fontFamily: 'SFProDisplay-Medium',
  },
  hugeSemibold: {
    color: colors.darkGray,
    fontSize: huge,
    fontFamily: 'SFProText-Semibold',
  },
  hugeBold: {
    color: colors.darkGray,
    fontSize: huge,
    fontFamily: 'SFProText-Bold',
  },

  headerTitle: {
    color: colors.darkGray,
    fontSize: huge,
    fontFamily: 'SFProText-Bold',
  },
  ambitLogo: {
    color: colors.purp,
    fontSize: 22,
    fontFamily: 'SFProDisplay-Semibold',
  },
  paddingBottomNav: {
    paddingBottom: 50,
  },
  // SHADOWS
  // shadowGoal: {
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 2,

  //   // elevation: 3,
  // },
  shadowButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  shadowGoal: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  shadowSlider: {
    shadowColor: colors.purp,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    // elevation: 6,
  },

  shadow3: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
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
