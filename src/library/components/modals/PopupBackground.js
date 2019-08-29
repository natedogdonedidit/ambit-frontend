import React from 'react';
import { StyleSheet, View } from 'react-native';

const PopupBackground = ({ dim }) => {
  return <View style={dim ? styles.containerDim : styles.containerTransparent} />;
};

const styles = StyleSheet.create({
  containerDim: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
    zIndex: 10,
  },
  containerTransparent: {
    ...StyleSheet.absoluteFill,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
});

export default PopupBackground;
