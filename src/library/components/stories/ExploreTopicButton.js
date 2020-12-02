import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import { getIconFromID, getTopicFromID } from 'library/utils';
import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import { useQuery } from '@apollo/client';
import StoryBox from 'library/components/stories/StoryBox';

const placeholderImage =
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

const ExploreTopicButton = ({ navigation, topicID, refetching }) => {
  // const { icon, color, image, name } = getTopicFromID(topicID);
  const { parentTopic, color, icon, name, image } = getTopicFromID(topicID);

  const isSubTopic = !!parentTopic;
  const mainTopicID = isSubTopic ? parentTopic.topicID : topicID;
  const subTopic = isSubTopic ? topicID : null;

  // GETS STORIES FOR YOUR FAV TOPICS
  // const { error, data, loading } = useQuery(STORIES_TOPIC_QUERY, {
  //   variables: {
  //     topicID,
  //   },
  // });

  return (
    <TouchableOpacity
      // onPress={() => navigation.navigate('Topic', { topicID: mainTopicID, subTopic })}
      style={styles.storyBox}
      activeOpacity={0.8}
    >
      <Image
        style={{ position: 'absolute', top: 0, left: 0, width: 100, height: 160 }}
        source={{ uri: image || placeholderImage }}
        resizeMode="cover"
      />
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.linearGradient}
      />
      {icon && (
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
          <Icon
            name={icon}
            size={16}
            color={colors[color] || colors.iconGray}
            solid
            style={{ textAlign: 'center', paddingTop: 1 }}
          />
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          paddingHorizontal: 6,
        }}
      >
        <Text numberOfLines={3} style={{ ...defaultStyles.defaultMedium, fontSize: 13, color: colors.white }}>
          Explore {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyBox: {
    justifyContent: 'space-between',
    height: 160,
    width: 100,
    borderRadius: 12,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
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

export default ExploreTopicButton;
