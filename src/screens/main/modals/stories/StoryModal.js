import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native';
import Video from 'react-native-video';
import { useQuery } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { timeDifference } from 'library/utils';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import Loader from 'library/components/UI/Loader';

const IMAGE_DURATION = 2;

const StoryModal = ({ navigation, route }) => {
  const { isPreview = false, story = null, intro = null } = route.params;

  const videoRef = useRef(null);
  const { height, width } = Dimensions.get('window');

  // STATE
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeOfDay, setTimeOfDay] = useState(new Date());
  const [activeStory, setActiveStory] = useState(story || intro);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showIntroPreview, setShowIntroPreview] = useState(false);

  // console.log(new Date());

  // VARIABLES
  const { items } = activeStory;
  const isEmpty = items.length < 1;
  const activeItem = { ...items[activeIndex] };
  const storyLength = items.reduce((total, item) => {
    const length = Math.max(item.duration || IMAGE_DURATION, 10); // minimum of 10
    return total + length;
  }, 0);

  // EFFECTS

  // if reached the end of photo timelimit - go to next item
  useEffect(() => {
    if (activeItem.type === 'IMAGE' && currentTime >= IMAGE_DURATION) {
      // incrementIndex();
    }
  }, [currentTime]);

  // if the activeIndex changes always reset the current time to zero
  useEffect(() => {
    setCurrentTime(0);

    // only start the timer if showIntroPreview is false
    if (!showIntroPreview) {
      // increment the timer ever X seconds
      const intervalID = setInterval(() => {
        if (activeItem.type === 'IMAGE') {
          setCurrentTime(prevState => prevState + 0.01);
        }
      }, 10);

      // if the new item is a video...clear the inverval
      if (activeItem.type === 'VIDEO') {
        clearInterval(intervalID);
      }

      return () => clearInterval(intervalID);
    }
  }, [activeIndex, showIntroPreview]);

  if (isEmpty) {
    navigation.navigate('Home');
  }

  // VIDEO PLAYER CALLBACKS
  const onBuffer = data => {
    setIsBuffering(data.isBuffering);
  };
  // const onError = () => {};
  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onVideoEnd = () => {
    incrementIndex();
  };

  // CUSTOM FUNCTIONS

  const incrementIndex = () => {
    if (activeIndex < items.length - 1) {
      setCurrentTime(0);
      setActiveIndex(prevState => prevState + 1);
    }

    // if it was the last item
    if (activeIndex === items.length - 1) {
      // if this is a story, check to see if there is an intro
      if (activeStory.type === 'STORY' && intro) {
        if (intro.items.length > 0) {
          setActiveStory(intro);
          setActiveIndex(0);
          setCurrentTime(0);
          setShowIntroPreview(true);
        }
      } else {
        // if there is no intro to play...then close the modal
        navigation.navigate('Home');
      }
    }
  };

  const decrementIndex = () => {
    if (activeIndex > 0) {
      setActiveIndex(prevState => prevState - 1);
    } else if (activeStory.type === 'INTRO' && story) {
      setShowIntroPreview(true);
    }
    setCurrentTime(0);
  };

  const closeIntroPreview = () => {
    setShowIntroPreview(false);
  };

  const goBackToStory = () => {
    setShowIntroPreview(false);
    if (story) {
      setActiveStory(story);
      setActiveIndex(story.items.length - 1);
    } else {
      navigation.navigate('Home');
    }
  };

  // RENDER FUNCTIONS
  const renderProgressBars = () => {
    return items.map((item, i) => {
      const length = Math.max(item.duration || IMAGE_DURATION, 10); // minimum of 10. ex: if dur of video is 2s, dur = 10
      const ratio = length / storyLength;
      const usableWidth = width - 15; // because there is padding on the left side of the parent View
      const itemWidth = ratio * usableWidth;

      // if its already been viewed
      if (i < activeIndex) {
        return (
          <View
            key={i}
            style={{
              height: 3,
              width: itemWidth - 2, // -10 bc marginRight
              borderRadius: 1.5,
              marginRight: 2,
              backgroundColor: 'white',
            }}
          />
        );
      }

      // if its being viewed right now
      if (i === activeIndex) {
        let r = 0;
        if (activeItem.type === 'IMAGE') {
          r = currentTime / IMAGE_DURATION;
        }
        if (activeItem.type === 'VIDEO') {
          r = currentTime / activeItem.duration;
        }
        // console.log(currentTime);
        const w = (itemWidth - 2) * r;

        return (
          <View
            key={i}
            style={{
              height: 3,
              width: itemWidth - 2, // -10 bc marginRight
              borderRadius: 1.5,
              marginRight: 2,
              backgroundColor: 'rgba(0,0,0,0.3)',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: 3,
                width: w, // -10 bc marginRight
                borderRadius: 1.5,
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
              height: 3,
              width: itemWidth - 2, // -10 bc marginRight
              borderRadius: 1.5,
              marginRight: 2,
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
          />
        );
      }
    });
  };

  const renderStory = () => {
    const { type, url } = activeItem;

    if (type === 'IMAGE') {
      return <Image source={{ uri: url }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />;
    }
    if (type === 'VIDEO') {
      return (
        <Video
          source={{ uri: url }}
          ref={videoRef}
          style={{ height: '100%', width: '100%' }}
          resizeMode="cover"
          progressUpdateInterval={100}
          onProgress={onProgress}
          onBuffer={onBuffer}
          onEnd={onVideoEnd}
        />
      );
    }
    return <Text>Oopsss</Text>;
  };

  const renderHeader = () => {
    const { owner } = activeItem;

    if (owner) {
      const createdAt = new Date(activeItem.createdAt);
      const { timeDiff, period } = timeDifference(timeOfDay, createdAt);

      return (
        <View style={styles.absoluteTop}>
          <SafeAreaView>
            <LinearGradient
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              colors={[colors.gray60, 'transparent']}
              style={styles.linearGradientTop}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 5,
                paddingTop: 5,
              }}
            >
              {renderProgressBars()}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (!isPreview) navigation.navigate('Profile', { profileId: owner.id });
              }}
            >
              <View style={styles.header}>
                <ProfilePic size="small" user={owner} navigation={navigation} disableVideo />
                <View>
                  <Text style={{ ...defaultStyles.defaultBold, color: 'white', paddingLeft: 8 }}>{owner.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...defaultStyles.smallRegular, fontSize: 13, color: 'white', paddingLeft: 8 }}>
                      {owner.headline}
                    </Text>
                    <Icon
                      name="circle"
                      solid
                      size={2}
                      color={colors.white}
                      style={{ alignSelf: 'center', paddingHorizontal: 5 }}
                    />
                    <Text style={{ ...defaultStyles.smallRegular, fontSize: 13, color: 'white' }}>
                      {timeDiff} {period}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      );
    }

    return null;
  };

  const renderTopic = () => {
    const { topic, projectTopics, type } = activeStory;
    if (type === 'TOPICSTORY') {
      return (
        <View
          style={{
            height: 30,
            paddingHorizontal: 10,
            // borderColor: colors.white,
            // borderWidth: StyleSheet.hairlineWidth,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.3)',
          }}
        >
          <Text style={{ ...defaultStyles.defaultMedium, color: colors.white }}>{topic.name}</Text>
        </View>
      );
    }
    if (type === 'PROJECT') {
      return projectTopics.map(({ topicID, name }) => {
        return (
          <View
            key={topicID}
            style={{
              height: 30,
              paddingHorizontal: 10,
              // borderColor: colors.white,
              // borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}
          >
            <Text style={{ ...defaultStyles.defaultMedium, color: colors.white }}>{name}</Text>
          </View>
        );
      });
    }
    return null;
  };

  const renderActions = () => {
    const { owner } = activeItem;

    return (
      <View style={styles.absoluteBottom}>
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['transparent', colors.gray60]}
          style={styles.linearGradientBottom}
        />
        <View style={{ width: '100%', alignItems: 'flex-end', paddingRight: 10 }}>
          <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <ProfilePic size="medium" user={owner} navigation={navigation} disableVideo border borderWidth={0.5} />
            <View
              style={{
                position: 'absolute',
                bottom: -6,
                right: 2,
                width: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: colors.peach,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name="plus" solid size={10} color={colors.white} style={{ textAlign: 'center' }} />
            </View>
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              marginTop: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="heart" solid size={30} color="rgba(255,255,255,0.8)" />
            <Text style={{ ...defaultStyles.smallBold, color: 'white', paddingTop: 2 }}>427</Text>
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="share" solid size={30} color="rgba(255,255,255,0.8)" />
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              marginTop: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="comment" solid size={30} color="rgba(255,255,255,0.8)" />
          </View>
        </View>
      </View>
    );
  };

  const renderTitle = () => {
    const { title, type } = activeStory;

    return (
      <View style={styles.absoluteBottom}>
        <View style={{ width: '100%' }}>
          <View style={{ width: '100%', paddingHorizontal: 8 }}>
            <View style={{ flexDirection: 'column', paddingLeft: 5, alignItems: 'flex-start', paddingBottom: 10 }}>
              {type === 'PROJECT' && (
                <Text style={{ ...defaultStyles.hugeBold, fontSize: 20, color: 'rgba(255,255,255,1)', paddingBottom: 10 }}>
                  {title || null}
                </Text>
              )}
              {renderTopic()}
            </View>
          </View>
        </View>
      </View>
    );
  };

  // RETURN
  if (hasError) {
    return (
      <View style={styles.coverView}>
        <Text>There was an error</Text>
      </View>
    );
  }

  if (showIntroPreview) {
    const { owner } = activeItem;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" hidden />
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: colors.gray60 }}>
          <SafeAreaView style={styles.overlay}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
              <ProfilePic size="xlarge" user={owner} navigation={navigation} disableVideo />
              <Text
                style={{ paddingTop: 20, ...defaultStyles.headerMedium, color: 'white' }}
              >{`${owner.firstName}'s Intro`}</Text>
              <Text style={{ paddingTop: 5, ...defaultStyles.defaultSemibold, color: 'white', opacity: 0.8 }}>
                Tap right side to view
              </Text>
            </View>
            <View style={{ ...StyleSheet.absoluteFillObject, flexDirection: 'row', alignItems: 'stretch' }}>
              <TouchableOpacity onPress={goBackToStory} style={{ flex: 1 }} />
              <TouchableOpacity onPress={closeIntroPreview} style={{ flex: 1 }} />
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" hidden />
      <View style={StyleSheet.absoluteFill}>
        {renderStory()}
        {isBuffering && <Loader loading={isBuffering} backgroundColor="transparent" color="white" />}
      </View>

      <SafeAreaView style={styles.overlay}>
        <View style={{ ...StyleSheet.absoluteFillObject, flexDirection: 'row', alignItems: 'stretch' }}>
          <TouchableOpacity onPress={decrementIndex} style={{ flex: 1 }} />
          <TouchableOpacity onPress={incrementIndex} style={{ flex: 1 }} />
        </View>
        {!isPreview && renderActions()}
        {!isPreview && renderTitle()}
        {renderHeader()}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    // alignItems: 'center',
    padding: 8,
  },
  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    paddingBottom: 10,
  },
  sendMessageBox: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    borderColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.gray60,
    justifyContent: 'center',
    paddingHorizontal: 14,
    // alignItems: 'center',
    marginTop: 15,
  },
  coverView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 200,
    width: '100%',
  },
  linearGradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 200,
    width: '100%',
  },
});

export default StoryModal;
