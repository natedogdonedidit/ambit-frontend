import { StyleSheet } from 'react-native';

import colors from 'styles/colors';

const small = 13;
const reg = 15;
const large = 15;
const huge = 17;

// thin:      200
// light:     300
// regular:   400
// medium:    500
// semibold:  600
// bold:      700
// heavy:     800

const styles = StyleSheet.create({
  // SMALL
  smallMute: {
    color: colors.blueGray,
    fontSize: small,
    // fontFamily: 'SFProText-Regular',
    fontWeight: '400',
  },
  smallThin: {
    color: colors.black,
    fontSize: small,
    // fontFamily: 'SFProText-Thin',
    fontWeight: '200',
  },
  smallLight: {
    color: colors.black,
    fontSize: small,
    // fontFamily: 'SFProText-Light',
    fontWeight: '300',
  },
  smallRegular: {
    color: colors.black,
    fontSize: small,
    // fontFamily: 'SFProText-Regular',
    fontWeight: '400',
  },
  smallMedium: {
    color: colors.black,
    fontSize: small,
    // fontFamily: 'SFProText-Medium',
    fontWeight: '500',
  },
  smallSemibold: {
    color: colors.black,
    fontSize: small,
    // fontFamily: 'SFProText-Semibold',
    fontWeight: '600',
  },
  smallBold: {
    color: colors.black,
    fontSize: small,
    // fontFamily: 'SFProText-Bold',
    fontWeight: '700',
  },
  smallBoldMute: {
    color: colors.gray40,
    fontSize: small,
    // fontFamily: 'SFProText-Bold',
    fontWeight: '700',
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
    // fontFamily: 'SFProText-LightItalic',
    fontWeight: '300',
    fontStyle: 'italic',
  },
  defaultMediumItalic: {
    color: colors.black,
    fontSize: reg,
    // fontFamily: 'SFProText-MediumItalic',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  defaultMute: {
    color: colors.blueGray,
    fontSize: reg,
    // fontFamily: 'SFProText-Regular',
    fontWeight: '400',
  },
  defaultPlaceholder: {
    color: colors.gray30,
    fontSize: reg,
    // fontFamily: 'SFProText-Regular',
    fontWeight: '400',
  },
  defaultMediumMute: {
    color: colors.blueGray,
    fontSize: reg,
    // fontFamily: 'SFProText-Medium',
    fontWeight: '500',
  },
  defaultBoldMute: {
    color: colors.gray30,
    fontSize: reg,
    // fontFamily: 'SFProText-Semibold',
    fontWeight: '700',
  },
  defaultWarning: {
    color: colors.peach,
    fontSize: reg,
    // fontFamily: 'SFProText-Regular',
    fontWeight: '400',
  },
  defaultMuteItalic: {
    color: colors.blueGray,
    fontSize: reg,
    // fontFamily: 'SFProText-RegularItalic',
    fontWeight: '400',
    fontStyle: 'italic',
  },
  defaultThin: {
    color: colors.black,
    fontSize: reg,
    // fontFamily: 'SFProText-Thin',
    fontWeight: '200',
  },
  defaultLight: {
    color: colors.black,
    fontSize: reg,
    // fontFamily: 'SFProText-Light',
    fontWeight: '300',
  },
  defaultText: {
    color: colors.black,
    fontSize: reg,
    fontWeight: '400',
  },
  defaultMedium: {
    color: colors.black,
    fontSize: reg,
    // fontFamily: 'SFProText-Medium',
    fontWeight: '500',
  },
  defaultSemibold: {
    color: colors.black,
    fontSize: reg,
    // fontFamily: 'SFProText-Semibold',
    fontWeight: '600',
  },
  defaultBold: {
    color: colors.black,
    fontSize: reg,
    // fontFamily: 'SFProText-Bold',
    fontWeight: '700',
  },
  defaultHeavy: {
    color: colors.black,
    fontSize: reg,
    // fontFamily: 'SFProText-Heavy',
  },
  // LARGE, 15px
  largeMute: {
    color: colors.blueGray,
    fontSize: large,
    // fontFamily: 'SFProText-Regular',
    fontWeight: '400',
  },
  largeMuteItalic: {
    color: colors.blueGray,
    fontSize: large,
    // fontFamily: 'SFProText-RegularItalic',
    fontWeight: '400',
    fontStyle: 'italic',
  },
  largeThin: {
    color: colors.black,
    fontSize: large,
    // fontFamily: 'SFProText-Thin',
    fontWeight: '200',
  },
  largeLight: {
    color: colors.black,
    fontSize: large,
    // fontFamily: 'SFProText-Light',
    fontWeight: '300',
  },
  largeRegular: {
    color: colors.black,
    fontSize: large,
    // fontFamily: 'SFProText-Regular',
    fontWeight: '400',
  },
  largeMedium: {
    color: colors.black,
    fontSize: large,
    // fontFamily: 'SFProText-Medium',
    fontWeight: '500',
  },
  largeMediumMute: {
    color: colors.blueGray,
    fontSize: large,
    // fontFamily: 'SFProText-Regular',
    fontWeight: '500',
    opacity: 0.6,
  },
  largeSemibold: {
    color: colors.black,
    fontSize: large,
    // fontFamily: 'SFProText-Semibold',
    fontWeight: '600',
  },
  largeBold: {
    color: colors.black,
    fontSize: large,
    // fontFamily: 'SFProText-Bold',
    fontWeight: '700',
  },
  largeBoldDisplay: {
    color: colors.black,
    fontSize: large,
    fontFamily: 'SFProDisplay-Bold',
    // fontWeight: '700',
  },
  largeHeavy: {
    color: colors.black,
    fontSize: large,
    // fontFamily: 'SFProText-Heavy',
    fontWeight: '800',
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
