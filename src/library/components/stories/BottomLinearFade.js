import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

function BottomLinearFade({ disable = false }) {
  if (disable) return null;

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={['transparent', 'rgba(0,0,0,0.8)']}
      style={styles.linearGradientBottom}
    />
  );
}

const styles = StyleSheet.create({
  linearGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 500,
    width: '100%',
  },
});

export default React.memo(BottomLinearFade);
