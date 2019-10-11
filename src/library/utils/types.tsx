// copied from https://github.com/react-navigation/stack/tree/master/src/types.tsx

import Animated from 'react-native-reanimated';
import { EdgeInsets } from 'react-native-safe-area-context';

const { cond, add, multiply, interpolate } = Animated;

export type Layout = { width: number; height: number };

export type CardInterpolatedStyle = {
  containerStyle?: any;
  cardStyle?: any;
  overlayStyle?: any;
  shadowStyle?: any;
};

export type CardInterpolationProps = {
  current: {
    progress: Animated.Node<number>;
  };
  next?: {
    progress: Animated.Node<number>;
  };
  index: number;
  closing: Animated.Node<0 | 1>;
  layouts: {
    screen: Layout;
  };
  insets: EdgeInsets;
};

// chad created
export function forVerticalIOSCustom({
  current,
  layouts: { screen },
}: CardInterpolationProps): CardInterpolatedStyle {

  const overlayOpacity = interpolate(current.progress, {
    inputRange: [0, 1],
    outputRange: [0, 0.4],
  });

  const shadowOpacity = interpolate(current.progress, {
    inputRange: [0, 1],
    outputRange: [0, 0.3],
  });

  const translateY = interpolate(current.progress, {
    inputRange: [0, 1],
    outputRange: [screen.height, 0],
  });

  return {
    cardStyle: {
      transform: [
        // Translation for the animation of the current card
        { translateY },
      ],
    },
    overlayStyle: { opacity: overlayOpacity },
    shadowStyle: { shadowOpacity },
  };
}