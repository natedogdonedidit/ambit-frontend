import { StyleSheet } from 'react-native';

import colors from 'styles/colors';

const small = 13;
const reg = 15;
const large = 15;
const huge = 17;

const styles = StyleSheet.create({
  // SMALL
  smallMute: {
    color: colors.blueGray,
    fontSize: small,
    fontFamily: 'SFProText-Regular',
  },
  smallThin: {
    color: colors.black,
    fontSize: small,
    fontFamily: 'SFProText-Thin',
  },
  smallLight: {
    color: colors.black,
    fontSize: small,
    fontFamily: 'SFProText-Light',
  },
  smallRegular: {
    color: colors.black,
    fontSize: small,
    fontFamily: 'SFProText-Regular',
  },
  smallMedium: {
    color: colors.black,
    fontSize: small,
    fontFamily: 'SFProText-Medium',
  },
  smallSemibold: {
    color: colors.black,
    fontSize: small,
    fontFamily: 'SFProText-Semibold',
  },
  smallBold: {
    color: colors.black,
    fontSize: small,
    fontFamily: 'SFProText-Bold',
  },

  // FOR STORY SCREEN
  // storyBold: {
  //   color: colors.white,
  //   textShadowColor: colors.black,
  //   textShadowRadius: StyleSheet.hairlineWidth,
  //   fontSize: reg,
  //   fontFamily: 'SFProText-Bold',
  // },

  // DEFAULT
  defaultItalic: {
    color: colors.black,
    fontSize: reg,
    fontFamily: 'SFProText-LightItalic',
  },
  defaultMediumItalic: {
    color: colors.black,
    fontSize: reg,
    fontFamily: 'SFProText-MediumItalic',
  },
  defaultMute: {
    color: colors.blueGray,
    fontSize: reg,
    fontFamily: 'SFProText-Regular',
  },
  defaultPlaceholder: {
    color: colors.gray30,
    fontSize: reg,
    fontFamily: 'SFProText-Regular',
  },
  defaultMediumMute: {
    color: colors.blueGray,
    fontSize: reg,
    fontFamily: 'SFProText-Medium',
  },
  defaultBoldMute: {
    color: colors.gray30,
    fontSize: reg,
    fontFamily: 'SFProText-Semibold',
  },
  defaultWarning: {
    color: colors.peach,
    fontSize: reg,
    fontFamily: 'SFProText-Regular',
  },
  defaultMuteItalic: {
    color: colors.blueGray,
    fontSize: reg,
    fontFamily: 'SFProText-RegularItalic',
  },
  defaultThin: {
    color: colors.black,
    fontSize: reg,
    fontFamily: 'SFProText-Thin',
  },
  defaultLight: {
    color: colors.black,
    fontSize: reg,
    fontFamily: 'SFProText-Light',
  },
  defaultText: {
    color: colors.black,
    fontSize: reg,
    // fontFamily: 'SFProText-Regular',
    fontWeight: '400',
    // lineHeight: 17,
  },
  defaultMedium: {
    color: colors.black,
    fontSize: reg,
    fontFamily: 'SFProText-Medium',
  },
  defaultSemibold: {
    color: colors.black,
    fontSize: reg,
    fontFamily: 'SFProText-Semibold',
  },
  defaultBold: {
    color: colors.black,
    fontSize: reg,
    fontFamily: 'SFProText-Bold',
  },
  defaultHeavy: {
    color: colors.black,
    fontSize: reg,
    fontFamily: 'SFProText-Heavy',
  },
  // LARGE, 15px
  largeMute: {
    color: colors.blueGray,
    fontSize: large,
    fontFamily: 'SFProText-Regular',
  },
  largeMuteItalic: {
    color: colors.blueGray,
    fontSize: large,
    fontFamily: 'SFProText-RegularItalic',
  },
  largeThin: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProText-Thin',
  },
  largeLight: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProText-Light',
  },
  largeRegular: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProText-Regular',
  },
  largeMedium: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProText-Medium',
  },
  largeMediumMute: {
    color: colors.blueGray,
    fontSize: large,
    fontFamily: 'SFProText-Regular',
    opacity: 0.6,
  },
  largeSemibold: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProText-Semibold',
  },
  largeBold: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProText-Bold',
  },
  largeHeavy: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProText-Heavy',
  },
  largeDisplay: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProDisplay-Light',
  },
  // HUGE, 17px
  hugeThin: {
    color: colors.black,
    fontSize: huge,
    fontFamily: 'SFProText-Thin',
  },
  hugeLight: {
    color: colors.black,
    fontSize: huge,
    fontFamily: 'SFProText-Light',
  },
  hugeRegular: {
    color: colors.black,
    fontSize: huge,
    fontFamily: 'SFProText-Regular',
  },
  hugeMedium: {
    color: colors.black,
    fontSize: huge,
    fontFamily: 'SFProText-Medium',
  },
  hugeMediumDisplay: {
    color: colors.black,
    fontSize: huge,
    fontFamily: 'SFProDisplay-Medium',
  },
  hugeSemibold: {
    color: colors.black,
    fontSize: huge,
    fontFamily: 'SFProText-Semibold',
  },
  hugeBold: {
    color: colors.black,
    fontSize: huge,
    fontFamily: 'SFProText-Bold',
  },
  hugeHeavy: {
    color: colors.black,
    fontSize: huge,
    fontFamily: 'SFProDisplay-Heavy',
  },

  headerHat: {
    color: colors.black,
    fontSize: 18,
    fontFamily: 'SFProText-Semibold',
  },
  headerTitle: {
    color: colors.black,
    fontSize: huge,
    fontFamily: 'SFProText-Bold',
  },
  headerSection: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProText-Heavy',
  },
  headerTopic: {
    color: colors.black,
    fontSize: 18,
    fontFamily: 'SFProDisplay-Medium',
  },
  headerSmall: {
    color: colors.black,
    fontSize: 19,
    fontFamily: 'SFProDisplay-Heavy',
  },
  headerMedium: {
    color: colors.black,
    fontSize: 24,
    fontFamily: 'SFProDisplay-Bold',
  },
  headerLarge: {
    color: colors.black,
    fontSize: 30,
    fontFamily: 'SFProDisplay-Bold',
  },
  ambitLogo: {
    color: colors.purp,
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold',
  },
  ambitLogoSplash: {
    color: colors.purp,
    fontSize: 34,
    fontFamily: 'Poppins-SemiBold',
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
    shadowOpacity: 0.15,
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
