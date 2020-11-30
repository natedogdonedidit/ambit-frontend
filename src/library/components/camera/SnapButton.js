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
      <TouchableOpacity activeOpacity={0.7} onPress={recording ? stopVideo : takeVideo} style={{ position: 'relative' }}>
        {videoDur > 0 ? (
          <Progress.Pie progress={videoDur} size={80} color={colors.red} unfilledColor="rgba(255,255,255,0.6)" borderWidth={0} />
        ) : (
          <Progress.Pie progress={0} size={80} color={colors.red} unfilledColor="rgba(255,255,255,0.6)" borderWidth={0} />
        )}
        <View
          style={{ position: 'absolute', top: 8, left: 8, width: 64, height: 64, borderRadius: 37, backgroundColor: 'white' }}
        />
        <View
          style={{ position: 'absolute', top: 32, left: 32, width: 16, height: 16, borderRadius: 8, backgroundColor: 'red' }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={takePicture} style={styles.snapButton}>
      <View
        style={{
          height: 64,
          width: 64,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 32,
          backgroundColor: 'white',
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  snapButton: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    // backgroundColor: colors.white,
    backgroundColor: 'rgba(255,255,255,0.6)',
    // borderWidth: 10,
    // borderColor: 'rgba(255,255,255,0.6)',
  },
});

export default SnapButton;
