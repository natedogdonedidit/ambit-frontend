import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { getTopicFromID } from 'library/utils';

const StoryFooter = ({ story, activeIndex, isMyPost, handleMoreButton, favoriteTopics, setDisableOutterScroll }) => {
  const [topicsSorted, setTopicsSorted] = useState([]);

  const { owner, items, title, type, topics } = story;
  const activeItem = { ...items[activeIndex] };

  const { stories, views, plays, text, link } = activeItem;

  const indexOfProject = stories ? stories.findIndex((s) => s.type === 'PROJECT') : 0;
  const project = stories && indexOfProject !== -1 ? stories[indexOfProject] : null;
  const soloStory = stories ? stories.find((s) => s.type === 'SOLO') : false;

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
    const hasTopics = topicsSorted.length > 0;

    if (hasTopics || owner.location) {
      return (
        <ScrollView
          horizontal
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 12,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={() => setDisableOutterScroll(true)}
            onPressOut={() => setDisableOutterScroll(false)}
            style={{ flexDirection: 'row' }}
          >
            <>
              {owner.location && (
                <View
                  style={{
                    height: 26,
                    paddingHorizontal: 6,
                    borderRadius: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                    marginRight: 5,
                    ...defaultStyles.shadowButton,
                  }}
                >
                  <Icon name="map-marker-alt" solid size={10} color={colors.white} style={{ paddingRight: 6 }} />
                  <Text style={{ ...defaultStyles.smallSemibold, color: colors.white }}>{owner.location}</Text>
                </View>
              )}
              {hasTopics &&
                topicsSorted.map((topic) => {
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
                        ...defaultStyles.shadowButton,
                      }}
                    >
                      {icon && (
                        <Icon name={icon} solid size={14} color={colors[color] || colors.blueGray} style={{ paddingRight: 6 }} />
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

    // if no topics or location
    return null;
  };

  const renderActions = () => {
    return (
      <View style={{ paddingRight: 8, paddingBottom: 55, paddingLeft: 10, alignItems: 'center' }}>
        <View style={styles.sideButtonCircle}>
          <Icon name="heart" solid size={20} color="white" style={{ paddingTop: 2 }} />
          {!!plays && <Text style={styles.sideButtonText}>{plays}</Text>}
        </View>
        <View style={styles.sideButtonCircle}>
          <Icon name="share" solid size={20} color="white" style={{ paddingTop: 1 }} />
        </View>
        <View style={styles.sideButtonCircle}>
          <Icon name={link ? 'link' : 'user'} solid size={20} color="white" style={{ paddingTop: 1 }} />
        </View>
      </View>
    );
  };

  const renderTextAndTopics = () => {
    if (type === 'INTRO') {
      return (
        <>
          <View style={{ paddingRight: 70, paddingBottom: 16 }}>
            {!!title && (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
                <Text
                  style={{
                    ...defaultStyles.defaultBold,
                    color: 'white',
                    paddingTop: 5,
                  }}
                >
                  {`${owner.firstName}'s Intro`}
                </Text>
              </View>
            )}
            {!!text && (
              <Text
                numberOfLines={3}
                style={{
                  ...defaultStyles.defaultRegular,
                  color: 'white',
                  paddingLeft: 12,
                  paddingTop: 10,
                }}
              >
                {text}
              </Text>
            )}
          </View>
          {renderTopics()}
        </>
      );
    }

    if (type === 'MYSTORY') {
      return (
        <>
          <View style={{ paddingRight: 70, paddingBottom: 16 }}>
            {!!text && (
              <Text
                numberOfLines={3}
                style={{
                  ...defaultStyles.defaultRegular,
                  color: 'rgba(255,255,255,1)',
                  paddingLeft: 12,
                  paddingTop: 10,
                }}
              >
                {text}
              </Text>
            )}
          </View>
          {renderTopics()}
        </>
      );
    }

    // if the active story is a project
    if (type === 'PROJECT') {
      return (
        <>
          <View style={{ paddingRight: 70, paddingBottom: 16 }}>
            {!!title && (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
                <Text
                  style={{
                    ...defaultStyles.defaultBold,
                    color: 'rgba(255,255,255,1)',
                    paddingTop: 3,
                  }}
                >
                  {title}
                </Text>
              </View>
            )}

            {!!text && (
              <Text
                numberOfLines={3}
                style={{
                  ...defaultStyles.defaultRegular,
                  color: 'rgba(255,255,255,1)',
                  paddingLeft: 12,
                  paddingTop: 10,
                }}
              >
                {text}
              </Text>
            )}
          </View>

          {renderTopics()}
        </>
      );
    }

    return null;
  };

  const renderBottomRow = () => {
    if (isMyPost) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{ ...defaultStyles.defaultRegular, color: 'white', paddingLeft: 6, paddingRight: 30 }}
            >{`${plays} views`}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={handleMoreButton}
              activeOpacity={0.8}
              style={{
                paddingRight: 15,
                paddingTop: 4,
              }}
            >
              <Feather name="more-horizontal" solid size={30} color="rgba(255,255,255,0.8)" />
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
    <View style={{ ...styles.container, bottom: 5 }}>
      <View style={styles.textAndTopics}>{renderTextAndTopics()}</View>
      <View style={styles.bottomRow}>{renderBottomRow()}</View>
      <View style={styles.sideButtonContainer}>{renderActions()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    // backgroundColor: 'pink',
  },
  textAndTopics: {
    flex: 1,
    paddingBottom: 14,
    // backgroundColor: 'tomato',
  },
  bottomRow: {
    width: '100%',
    height: 50,
    paddingLeft: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
  },

  // side buttons
  sideButtonContainer: {
    position: 'absolute',
    bottom: 68,
    right: 0,
  },
  sideButtonCircle: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 32,
    ...defaultStyles.shadowButton,
  },
  sideButtonText: {
    ...defaultStyles.smallBold,
    color: 'white',
    position: 'absolute',
    bottom: -17,
  },
});

export default StoryFooter;
