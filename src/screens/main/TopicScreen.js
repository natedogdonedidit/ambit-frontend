import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, Animated, TouchableOpacity, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from 'library/utils/UserContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import { getTopicFromID } from 'library/utils';
import TopicsTimeline from 'library/components/timelines/TopicsTimeline';

// SET THESE
const HEADER_HEIGHT = 44;

const TopicScreen = ({ navigation, route }) => {
  // PARAMS
  const { topicID } = route.params;
  const { name } = getTopicFromID(topicID);

  // STATE
  const [scrollY] = useState(new Animated.Value(0));

  // REFS & CONTEXT
  const insets = useSafeAreaInsets();
  const [top] = useState(insets.top || 20); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal

  return (
    <View style={styles.container}>
      <TopicsTimeline activeTopicID={topicID} navigation={navigation} scrollY={scrollY} paddingTop={top} />

      {/* Hidden Header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: HEADER_HEIGHT + top,
          backgroundColor: colors.purpO,
          paddingTop: top,
          opacity: scrollY.interpolate({
            inputRange: [90, 120],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
        }}
      >
        <Text style={{ ...defaultStyles.hugeHeavy, color: 'white' }}>{name}</Text>
      </Animated.View>

      {/* Back Button */}
      <View
        style={{
          position: 'absolute',
          top: 8 + top,
          left: 15,
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
          <Icon name="chevron-left" size={15} color="white" />
        </TouchableOpacity>
      </View>

      {/* Share Button */}
      <View
        style={{
          position: 'absolute',
          top: 8 + top,
          right: 15,
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('DMPostPopup', { topicID })}
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
        >
          <Icon name="share" size={15} color="white" />
        </TouchableOpacity>
      </View>

      {/* New Post Button */}
      <View style={styles.newPostButtonAbsolute}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('NewPostModal', {
              topicPassedIn: topicID,
            });
          }}
        >
          <View style={{ ...styles.newPostButton, ...defaultStyles.shadowButton }}>
            <Icon name="pencil-alt" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrollView: {
    ...StyleSheet.absoluteFill,
    // backgroundColor: colors.lightGray,
  },
  newPostButtonAbsolute: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  newPostButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default TopicScreen;
