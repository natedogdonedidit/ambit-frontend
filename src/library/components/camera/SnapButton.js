import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { RNCamera } from 'react-native-camera';
import * as Progress from 'react-native-progress';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import FitImage from 'react-native-fit-image';

const SnapButton = ({ recording, mode, takePicture, takeVideo, stopVideo, videoDur }) => {
  // RENDER FUNCTIONS
  if (mode === 'video') {
    // console.log('duration', videoDur);
    // videoDuration.addListener((val) => console.log(val));

    return (
      <TouchableOpacity onPress={recording ? stopVideo : takeVideo} style={{ position: 'relative' }}>
        {videoDur > 0 ? (
          <Progress.Pie progress={videoDur} size={80} color={colors.red} unfilledColor="rgba(255,255,255,0.4)" borderWidth={0} />
        ) : (
          <Progress.Pie progress={0} size={80} color={colors.red} unfilledColor="rgba(255,255,255,0.4)" borderWidth={0} />
        )}
        <View
          style={{ position: 'absolute', top: 9, left: 9, width: 62, height: 62, borderRadius: 36, backgroundColor: 'white' }}
        />
        <View
          style={{ position: 'absolute', top: 32, left: 32, width: 16, height: 16, borderRadius: 8, backgroundColor: 'red' }}
        />
      </TouchableOpacity>
    );
  }

  return <TouchableOpacity onPress={takePicture} style={styles.snapButton} />;
};

const styles = StyleSheet.create({
  snapButton: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: colors.white,
    // backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: 6,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});

export default SnapButton;
