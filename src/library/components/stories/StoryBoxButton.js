import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import { getIconFromID } from 'library/utils';

const StoryBoxButton = ({ navigation, story, newProject, selected = false, topic = null }) => {
  const renderIfSelected = () => {
    if (selected) {
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 100,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="check" size={40} color={colors.white} />
        </View>
      );
    }

    return null;
  };

  if (topic) {
    const parent = getIconFromID(topic.topicID);
    const { icon, color, name } = parent;

    return (
      <View style={styles.storyBox}>
        {topic.topicStory.preview && (
          <Image
            style={{ position: 'absolute', top: 0, left: 0, width: 100, height: 150 }}
            source={{ uri: topic.topicStory.preview }}
            resizeMode="cover"
          />
        )}
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['transparent', 'rgba(0,0,0,0.8)']}
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
            paddingHorizontal: 6,
          }}
        >
          <Text numberOfLines={1} style={{ ...defaultStyles.defaultMedium, fontSize: 13, color: colors.white }}>
            {topic.name}
          </Text>
        </View>
        {renderIfSelected()}
      </View>
    );
  }

  if (story.type === 'PROJECT') {
    return (
      <View style={styles.storyBox}>
        {!newProject && (
          <Image
            style={{ position: 'absolute', top: 0, left: 0, width: 100, height: 150 }}
            source={{ uri: story.items[story.items.length - 1].preview || null }}
            resizeMode="cover"
          />
        )}
        <LinearGradient
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          colors={['transparent', 'rgba(0,0,0,0.8)']}
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
          <ProfilePic user={story.owner} size="small" navigation={navigation} />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            paddingHorizontal: 6,
          }}
        >
          <Text numberOfLines={3} style={{ ...defaultStyles.defaultMedium, fontSize: 13, color: colors.white }}>
            {story.title}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 7,
            right: 8,
          }}
        >
          <Icon
            name="folder"
            size={18}
            color={colors.white}
            solid
            style={{ textAlign: 'center', paddingTop: 1, ...defaultStyles.shadowButton }}
          />
        </View>
        {renderIfSelected()}
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
    marginLeft: 6,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});

export default StoryBoxButton;
