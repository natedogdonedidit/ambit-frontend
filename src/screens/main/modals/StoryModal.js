import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { useQuery } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';

const IMAGE_DURATION = 2;

const StoryModal = ({ navigation }) => {
  const owner = navigation.getParam('owner');
  const isPreview = navigation.getParam('isPreview', false);
  const { title, items } = navigation.getParam('story', { title: '', items: [] });

  const videoRef = useRef(null);
  const { height, width } = Dimensions.get('window');

  // ////////////////////////////////////////
  // STATE
  // ////////////////////////////////////////
  const [hasError, setHasError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // ////////////////////////////////////////
  // EFFECTS
  // ////////////////////////////////////////

  // if the activeIndex changes always reset the current time to zero
  // useEffect(() => {
  //   setCurrentTime(0);
  // }, [activeIndex]);

  useEffect(() => {
    // reached the end of photo timelimit
    if (items[activeIndex].type === 'photo' && currentTime >= IMAGE_DURATION) {
      incrementIndex();
    }
    // if (items[activeIndex].type === 'video' && currentTime >= items[activeIndex].duration) {
    //   incrementIndex();
    // }
  }, [currentTime]);

  useEffect(() => {
    // if the activeIndex changes always reset the current time to zero
    setCurrentTime(0);

    const intervalID = setInterval(() => {
      // this will run every 0.2s
      // console.log('incrementing');
      if (items[activeIndex].type === 'photo') {
        setCurrentTime(prevState => prevState + 0.01);
      }
    }, 10);

    // if the new item is a video...clear the inverval
    if (items[activeIndex].type === 'video') {
      clearInterval(intervalID);
    }

    return () => clearInterval(intervalID);
  }, [activeIndex]);

  // console.log(currentTime);

  // ////////////////////////////////////////
  // CONSTANTS
  // ////////////////////////////////////////

  const storyLength = items.reduce((total, item) => {
    const length = Math.max(item.duration || IMAGE_DURATION, 10); // minimum of 10
    return total + length;
  }, 0);

  // const storyDuration = items.reduce((total, item) => {
  //   const dur = item.duration || 10;
  //   return total + dur;
  // }, 0);

  // ////////////////////////////////////////
  // VIDEO PLAYER CALLBACKS
  // ////////////////////////////////////////

  // const onBuffer = () => {};
  // const onError = () => {};
  const onProgress = data => {
    setCurrentTime(data.currentTime);
    // console.log('updating progress');
    // console.log(items[activeIndex].duration, data);
  };

  const onEnd = () => {
    incrementIndex();
  };

  // ////////////////////////////////////////
  // CUSTOM FUNCTIONS
  // ////////////////////////////////////////

  const incrementIndex = () => {
    if (activeIndex < items.length - 1) {
      setActiveIndex(prevState => prevState + 1);
    }

    if (activeIndex === items.length - 1) {
      navigation.goBack();
    }

    setCurrentTime(0);
  };

  const decrementIndex = () => {
    if (activeIndex > 0) {
      setActiveIndex(prevState => prevState - 1);
    }

    setCurrentTime(0);
  };

  // ////////////////////////////////////////
  // RENDER FUNCTIONS
  // ////////////////////////////////////////

  const renderProgressBars = () => {
    return items.map((item, i) => {
      const length = Math.max(item.duration || IMAGE_DURATION, 10); // minimum of 10. ex: if dur of video is 2s, dur = 10
      const ratio = length / storyLength;
      const usableWidth = width - 10; // because there is padding on the left side of the parent View
      const itemWidth = ratio * usableWidth;

      // if its already been viewed
      if (i < activeIndex) {
        return (
          <View
            key={i}
            style={{
              height: 4,
              width: itemWidth - 5, // -10 bc marginRight
              borderRadius: 2,
              marginRight: 5,
              backgroundColor: 'white',
            }}
          />
        );
      }

      // if its being viewed right now
      if (i === activeIndex) {
        let r = 0;
        if (items[activeIndex].type === 'photo') {
          r = currentTime / IMAGE_DURATION;
        }
        if (items[activeIndex].type === 'video') {
          r = currentTime / items[activeIndex].duration;
        }
        // console.log(currentTime);
        const w = (itemWidth - 5) * r;

        return (
          <View
            key={i}
            style={{
              height: 4,
              width: itemWidth - 5, // -10 bc marginRight
              borderRadius: 2,
              marginRight: 5,
              backgroundColor: 'rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: 4,
                width: w, // -10 bc marginRight
                borderRadius: 2,
                // marginRight: 5,
                backgroundColor: 'white',
              }}
            />
          </View>
        );
      }

      // if it has yet to be viewed
      if (i > activeIndex) {
        return (
          <View
            key={i}
            style={{
              height: 4,
              width: itemWidth - 5, // -10 bc marginRight
              borderRadius: 2,
              marginRight: 5,
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
          />
        );
      }
    });
  };

  const renderStory = () => {
    const activeItem = items[activeIndex];
    if (activeItem.type === 'photo') {
      return <Image source={{ uri: activeItem.url }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />;
    }
    if (activeItem.type === 'video') {
      return (
        <Video
          source={{ uri: activeItem.url }}
          ref={videoRef}
          style={{ height: '100%', width: '100%' }}
          resizeMode="cover"
          progressUpdateInterval={100}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      );
    }
    return <Text>Oopsss</Text>;
  };

  // ////////////////////////////////////////
  // RETURN
  // ////////////////////////////////////////

  if (hasError) {
    return (
      <View style={styles.coverView}>
        <Text>There was an error</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={StyleSheet.absoluteFill}>{renderStory()}</View>

      <SafeAreaView style={styles.overlay}>
        <View style={styles.absoluteBottom}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: owner.id })}>
            <View style={styles.viewProfile}>
              <Text>View Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ ...StyleSheet.absoluteFillObject, flexDirection: 'row', alignItems: 'stretch' }}>
          <TouchableOpacity onPress={decrementIndex} style={{ flex: 1 }} />
          <TouchableOpacity onPress={incrementIndex} style={{ flex: 1 }} />
        </View>
        <View style={styles.absoluteTop}>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 5 }}>
            {renderProgressBars()}
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: owner.id })}>
            <View style={styles.header}>
              <ProfilePic user={owner} navigation={navigation} disableVideo size={40} />
              <View>
                <Text style={{ ...defaultStyles.largeBold, color: 'white', paddingLeft: 15 }}>{owner.name}</Text>
                <Text style={{ ...defaultStyles.defaultMedium, color: 'white', paddingLeft: 15 }}>{owner.headline}</Text>
                <Text style={{ ...defaultStyles.defaultMedium, color: 'white', paddingLeft: 15 }}>{title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFill,
  },
  overlay: {
    flex: 1,
    // justifyContent: 'space-between',
    padding: 10,
  },
  absoluteTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  absoluteBottom: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
  },
  viewProfile: {
    width: 120,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  coverView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StoryModal;
