import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import { getTopicFromID } from 'library/utils';

const StoryFooter = ({
  story,
  activeIndex,
  isMyPost,
  navigation,
  handleAddToProfile,
  indexAddedToProfile,
  handleMoreButton,
  favoriteTopics,
  setDisableOutterScroll,
}) => {
  const [topicsSorted, setTopicsSorted] = useState([]);

  const { items, title, type, topics } = story;
  const activeItem = { ...items[activeIndex] };

  const { owner, stories } = activeItem;

  const indexOfProject = stories.findIndex((s) => s.type === 'PROJECT');
  const project = indexOfProject !== -1 ? stories[indexOfProject] : null;
  const soloStory = activeItem.stories.find((s) => s.type === 'SOLO');
  const saved = soloStory ? soloStory.save : false;
  const insets = useSafeArea();

  useEffect(() => {
    let topicsToShow = [];

    if (project) {
      topicsToShow = project.topics ? [...project.topics] : [];
    } else if (soloStory) {
      topicsToShow = soloStory.topics ? [...soloStory.topics] : [];
    } else if (topics) {
      topicsToShow = [...topics];
    }

    // sort the topics based on favoriteTopics array passed in
    const sortTopics = (a, b) => {
      console.log(favoriteTopics);
      const indexOfA = favoriteTopics.indexOf(a.topicID);
      const indexOfB = favoriteTopics.indexOf(b.topicID);

      // if a is a favorite but not b
      if (indexOfA >= 0 && indexOfB === -1) {
        return -1;
      }
      // if b is a favorite but not a
      if (indexOfB >= 0 && indexOfA === -1) {
        return 1;
      }
      // if both are favorites
      if (indexOfA >= 0 && indexOfB >= 0) {
        if (indexOfA < indexOfB) {
          return -1;
        }
        return 1;
      }
      // if neither are favorites
      return -1;
    };

    const topicsSortedNew = topicsToShow.sort(sortTopics);
    setTopicsSorted(topicsSortedNew);
  }, [story, favoriteTopics, activeIndex]);

  const renderTopics = () => {
    if (topicsSorted.length > 0) {
      return (
        <ScrollView
          horizontal
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 8,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => setDisableOutterScroll(true)}
            onPressOut={() => setDisableOutterScroll(false)}
            style={{ flexDirection: 'row' }}
          >
            <>
              {topicsSorted.map((topic) => {
                const { icon, color } = getTopicFromID(topic.topicID);

                return (
                  <View
                    key={topic.topicID}
                    style={{
                      height: 26,
                      paddingHorizontal: 6,
                      borderRadius: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(255,255,255,0.4)',
                      marginRight: 5,
                    }}
                  >
                    {icon && (
                      <Icon name={icon} solid size={14} color={colors[color] || colors.blueGray} style={{ paddingRight: 4 }} />
                    )}
                    <Text style={{ ...defaultStyles.smallSemibold, color: colors.white }}>{topic.name}</Text>
                  </View>
                );
              })}
            </>
          </TouchableOpacity>
        </ScrollView>
      );
    }

    return null;
  };

  const renderActions = () => {
    // if (isMyPost) {
    //   return null;
    // }

    return (
      <View style={{ paddingRight: 8, paddingBottom: 45, paddingLeft: 10 }}>
        <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <ProfilePic size="medium" user={owner} navigation={navigation} disableVideo border borderWidth={0.5} />
          {!isMyPost && (
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
          )}
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
          <Icon name="heart" solid size={30} color="white" />
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
          <Icon name="share" solid size={30} color="white" />
        </View>
      </View>
    );
  };

  const renderTitle = () => {
    // const { title, type, topics } = story;

    // if the active story is a project
    if (type === 'PROJECT') {
      return (
        <>
          <Text
            style={{ ...defaultStyles.hugeBold, fontSize: 20, color: 'rgba(255,255,255,1)', paddingBottom: 8, paddingLeft: 8 }}
          >
            {title || null}
            {'  '}
            <Icon name="caret-right" solid size={20} color="white" />
          </Text>
          {renderTopics(topics || [])}
        </>
      );
    }

    // if the active story is not a project...but the story item belongs to a project
    if (project) {
      return (
        <>
          <Text
            style={{ ...defaultStyles.hugeBold, fontSize: 20, color: 'rgba(255,255,255,1)', paddingBottom: 8, paddingLeft: 8 }}
          >
            {project.title || null}
            {'  '}
            <Icon name="caret-right" solid size={20} color="white" />
          </Text>
          {renderTopics(project.topics || [])}
        </>
      );
    }

    if (soloStory) {
      if (soloStory.topics) {
        return renderTopics(soloStory.topics || []);
      }
    }

    // if the item does not belong to a project, but it has topics, just render the topics
    if (topics) {
      if (topics.length > 0) {
        // return renderTopics(topics || []);
      }
    }

    return null;
  };

  const renderBottom = () => {
    if (isMyPost) {
      const isSaved = saved || indexAddedToProfile.includes(activeIndex);

      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 6,
                paddingRight: 30,
              }}
            >
              <Feather name="eye" solid size={20} color="rgba(255,255,255,0.8)" />
              <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>29</Text>
            </View>
            {/* <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 10,
              }}
            >
              <Feather name="heart" solid size={20} color="rgba(255,255,255,0.8)" />
              <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>12</Text>
            </View> */}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            {!project && !isSaved && (
              <TouchableOpacity
                onPress={handleAddToProfile}
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 20,
                }}
              >
                <Feather name="plus" solid size={20} color="rgba(255,255,255,0.8)" />
                <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>My Profile</Text>
              </TouchableOpacity>
            )}
            {!project && isSaved && (
              <TouchableOpacity
                onPress={handleAddToProfile}
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 20,
                }}
              >
                <Feather name="check-circle" solid size={20} color="rgba(255,255,255,0.8)" />
                <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>Saved</Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 20,
              }}
            >
              <Feather name="download" solid size={20} color="rgba(255,255,255,0.8)" />
              <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>Download</Text>
            </View>
            <TouchableOpacity
              onPress={handleMoreButton}
              activeOpacity={0.8}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 10,
              }}
            >
              <Feather name="more-horizontal" solid size={20} color="rgba(255,255,255,0.8)" />
              <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={{ justifyContent: 'center' }}>
        <Text
          style={{ ...defaultStyles.defaultMedium, color: 'rgba(255,255,255,0.6)' }}
        >{`Send ${owner.firstName} a message..`}</Text>
      </View>
    );
  };

  return (
    <View style={{ ...styles.absoluteBottom, bottom: insets.bottom + 5 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 14 }}>
        <View
          style={{
            flex: 1,
          }}
        >
          {renderTitle()}
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 50,
          paddingLeft: 8,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: 'rgba(255,255,255,0.3)',
          justifyContent: 'center',
        }}
      >
        {renderBottom()}
      </View>
      <View style={{ position: 'absolute', bottom: 50, right: 0 }}>{renderActions()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    justifyContent: 'flex-end',
    // backgroundColor: 'pink',
  },
});

export default StoryFooter;
