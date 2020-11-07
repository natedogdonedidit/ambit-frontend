import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { RNCamera } from 'react-native-camera';
import * as Progress from 'react-native-progress';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import FitImage from 'react-native-fit-image';
import SnapButton from 'library/components/camera/SnapButton';

const CameraControls = ({
  cameraRef,
  setCapturedImage,
  setCapturedVideo,
  recording,
  setRecording,
  mode,
  setMode,
  flashMode,
  setFlashMode,
  flashModeOrder,
  direction,
  setDirection,
  handleCameraRollButton,
  firstImage,
  videoDuration,
  videoDur,
  setVideoDur,
  MAX_DURATION,
}) => {
  const insets = useSafeAreaInsets();

  // CUSTOM FUNCTIONS
  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      if (data.uri) {
        setCapturedImage(data);
      }
    }
  };

  const stopRecording = () => {
    videoDuration.removeAllListeners();
    videoDuration.setValue(0);
    setRecording(false);

    setTimeout(() => {
      setVideoDur(0);
    }, 500);
  };

  const takeVideo = async () => {
    if (cameraRef && !recording) {
      const options = {
        mute: false,
        orientation: 'portrait',
        maxDuration: MAX_DURATION,
        maxFileSize: 100 * 1024 * 1024,
        quality: RNCamera.Constants.VideoQuality['1080p'], // 288p, 480p, 720p, 1080p, 2160p
      };

      try {
        const promise = cameraRef.current.recordAsync(options);

        if (promise) {
          // setRecording(true);
          const data = await promise;
          // console.log(data);
          setCapturedVideo(data);
          stopRecording();
        }
      } catch (e) {
        console.error(e);
        stopRecording();
      }
    }
  };

  const stopVideo = async () => {
    // console.log('stopped');
    await cameraRef.current.stopRecording();
    stopRecording();
  };

  const toggleMode = () => {
    setMode(mode === 'photo' ? 'video' : 'photo');
  };

  const toggleFlash = () => {
    setFlashMode(flashModeOrder[flashMode]);
  };

  const toggleDirection = () => {
    setDirection(direction === 'back' ? 'front' : 'back');
  };

  // RENDER FUNCTIONS
  return (
    <View style={{ ...styles.controls, bottom: insets.bottom + 40 }}>
      <View style={styles.controlsLeft}>
        <TouchableOpacity onPress={handleCameraRollButton} style={{ paddingRight: 40 }} activeOpacity={0.7}>
          <View
            style={{
              width: 26,
              height: 34,
              borderWidth: 1.8,
              borderColor: 'white',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            {firstImage && <Image style={{ width: 24, height: 32 }} source={{ uri: firstImage }} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFlash} activeOpacity={0.7}>
          <View>
            <Feather
              name={flashMode === 'off' ? 'zap-off' : 'zap'}
              size={26}
              color={colors.white}
              solid
              style={{ textAlign: 'center', paddingTop: 1 }}
            />
            {flashMode === 'auto' && (
              <View style={styles.autoText}>
                <Text style={{ ...defaultStyles.smallBold, color: colors.white }}>A</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      {/* {renderSnapButton()} */}
      <SnapButton
        // videoDuration={videoDuration}
        videoDur={videoDur}
        mode={mode}
        recording={recording}
        takePicture={takePicture}
        takeVideo={takeVideo}
        stopVideo={stopVideo}
      />
      <View style={styles.controlsRight}>
        <TouchableOpacity onPress={toggleDirection} style={{ paddingRight: 40 }} activeOpacity={0.7}>
          <Feather name="refresh-cw" size={26} color={colors.white} style={{ textAlign: 'center', paddingTop: 1 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMode} activeOpacity={0.7}>
          <Feather
            name={mode === 'photo' ? 'video' : 'camera'}
            size={26}
            color={colors.white}
            solid
            style={{ textAlign: 'center', paddingTop: 1 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    bottom: 40,
    left: 0,
    // backgroundColor: 'rgba(0,0,0,0.1)',
    // paddingBottom: 40,
  },
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
  controlsLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  autoText: {
    position: 'absolute',
    bottom: -2,
    right: -1,
  },
});

export default CameraControls;
