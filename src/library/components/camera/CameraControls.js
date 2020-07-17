import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { RNCamera } from 'react-native-camera';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import FitImage from 'react-native-fit-image';

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
}) => {
  const insets = useSafeArea();

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

  const takeVideo = async () => {
    if (cameraRef && !recording) {
      const options = {
        mute: false,
        maxDuration: 30,
        quality: RNCamera.Constants.VideoQuality['720p'], // 288p, 480p, 720p, 1080p, 2160p
      };

      try {
        const promise = cameraRef.current.recordAsync(options);

        if (promise) {
          setRecording(true);
          const data = await promise;
          console.log(data);
          setCapturedVideo(data);
        }
      } catch (e) {
        console.error(e);
        setRecording(false);
      }
    }
  };

  const stopVideo = async () => {
    await cameraRef.current.stopRecording();
    setRecording(false);
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
  const renderSnapButton = () => {
    if (mode === 'video') {
      if (recording) {
        return (
          <TouchableOpacity onPress={stopVideo} style={styles.snapButton}>
            <View style={{ width: 16, height: 16, borderRadius: 1, backgroundColor: 'red' }} />
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity onPress={takeVideo} style={styles.snapButton}>
          <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: 'red' }} />
        </TouchableOpacity>
      );
    }

    return <TouchableOpacity onPress={takePicture} style={styles.snapButton} />;
  };

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
      {renderSnapButton()}
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
