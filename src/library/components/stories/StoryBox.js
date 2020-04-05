import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import { getParentTopicFromID } from 'library/utils';

const StoryBox = ({ navigation, story }) => {
  if (story.type === 'TOPICSTORY') {
    const parent = getParentTopicFromID(story.topics[0].topicID);
    const { icon, color } = parent;

    return (
      <View style={styles.storyBox}>
        <Image
          style={{ position: 'absolute', top: 0, left: 0, width: 100, height: 150 }}
          source={{ uri: story.preview }}
          resizeMode="cover"
        />
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['transparent', colors.black]}
          style={styles.linearGradient}
        />
        <View
          style={{
            top: 5,
            left: 5,
            width: 32,
            height: 32,
            backgroundColor: colors.gray90,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name={icon} size={16} color={color || colors.iconGray} solid style={{ textAlign: 'center', paddingTop: 1 }} />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            paddingHorizontal: 8,
          }}
        >
          <Text style={{ ...defaultStyles.defaultMedium, color: colors.white }}>{story.title}</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  storyBox: {
    justifyContent: 'space-between',
    height: 150,
    width: 100,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    overflow: 'hidden',
    marginLeft: 10,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});

export default StoryBox;
