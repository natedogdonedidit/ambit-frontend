import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const windowWidth = Dimensions.get('window').width;

const PostVideo = ({ url }) => {
  const videoRef = useRef();
  const navigation = useNavigation();

  const [naturalSize, setNaturalSize] = useState(null);
  const [duration, setDuration] = useState('');
  const [paused, setPaused] = useState(true);

  const onLoad = (payload) => {
    setDuration(Math.round(payload.duration));
    setNaturalSize(payload.naturalSize);
  };

  // ratio of the actual video from Cloudinary
  const width = windowWidth - 76 - 12 - 2; // - leftColumn, - right padding, - 2 (diff calculated by comparing to onLayout)
  const ratio = naturalSize && naturalSize.width && naturalSize.height ? naturalSize.width / naturalSize.height : 0;

  // calculate the Video height based on fixed width of View & Ratio
  // const height = width && ratio ? Math.floor(width / ratio) : 160;
  let height = 160;
  if (width && ratio && naturalSize.orientation) {
    if (naturalSize.orientation === 'portrait') {
      height = Math.floor(width * ratio); // if portrait the width/height from cloudinary is opposite of what you would think
    } else {
      height = Math.floor(width / ratio);
    }
  }

  // console.log(naturalSize, ratio, viewWidth, height);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ width: '100%' }}
      onPress={() => {
        setPaused(false);
        videoRef.current.presentFullscreenPlayer();
      }}
      // onLayout={(payload) => {
      //   if (payload && payload.nativeEvent && payload.nativeEvent.layout && payload.nativeEvent.layout.width) {
      //     // console.log(payload.nativeEvent.layout.width, viewWidth);
      //     setViewWidth(payload.nativeEvent.layout.width);
      //   }
      // }}
    >
      <View style={{ position: 'relative' }}>
        <Video
          source={{ uri: url }}
          ref={videoRef}
          style={{
            width,
            height,
            borderRadius: 10,
          }}
          resizeMode="cover"
          allowsExternalPlayback={false}
          ignoreSilentSwitch="ignore"
          onLoad={onLoad} // get duration and dimensions
          onFullscreenPlayerDidPresent={() => setPaused(false)}
          onFullscreenPlayerWillDismiss={() => {
            setPaused(true);
          }}
          fullscreenOrientation="portrait"
          paused={paused}
          controls={false}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 46,
              width: 46,
              borderRadius: 23,
              backgroundColor: 'rgba(0,0,0,0.6)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="play" solid size={18} color={colors.white} style={{ paddingLeft: 3 }} />
          </View>
        </View>
        {duration > 0 && (
          <View
            style={{
              position: 'absolute',
              right: 4,
              top: 4,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 8,
              height: 22,
              paddingHorizontal: 7,
            }}
          >
            <Text style={{ ...defaultStyles.smallSemibold, color: 'white' }}>{duration} s</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PostVideo;
