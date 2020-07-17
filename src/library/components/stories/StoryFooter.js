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

  const { owner, items, title, type, topics } = story;
  const activeItem = { ...items[activeIndex] };

  const { stories, views, plays, text, link } = activeItem;

  const indexOfProject = stories ? stories.findIndex((s) => s.type === 'PROJECT') : 0;
  const project = stories && indexOfProject !== -1 ? stories[indexOfProject] : null;
  const soloStory = stories ? stories.find((s) => s.type === 'SOLO') : false;
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
    if ((story.type === 'INTRO' || story.type === 'MYSTORY') && owner.location) {
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
            </>
          </TouchableOpacity>
        </ScrollView>
      );
    }

    if (topicsSorted.length > 0) {
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

    return null;
  };

  const renderActions = () => {
    // if (isMyPost) {
    //   return null;
    // }

    return (
      <View style={{ paddingRight: 8, paddingBottom: 55, paddingLeft: 10 }}>
        {/* <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <ProfilePic size="medium" user={owner} navigation={navigation} enableIntro={false} enableStory={false} border borderWidth={0.5} />
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
        </View> */}
        <View
          style={{
            width: 50,
            height: 50,
            marginTop: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              // marginTop: 24,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.4)',
              ...defaultStyles.shadowButton,
            }}
          >
            <Icon name="heart" solid size={20} color="white" style={{ paddingTop: 2 }} />
          </View>
          <Text style={{ ...defaultStyles.smallBold, color: 'white', paddingTop: 2 }}>427</Text>
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              // marginTop: 24,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.4)',
              ...defaultStyles.shadowButton,
            }}
          >
            <Icon name="share" solid size={20} color="white" style={{ paddingTop: 1 }} />
          </View>
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              // marginTop: 24,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.4)',
              ...defaultStyles.shadowButton,
            }}
          >
            <Icon name={link ? 'link' : 'user'} solid size={20} color="white" style={{ paddingTop: 1 }} />
          </View>
        </View>
        {/* <View
          style={{
            width: 50,
            height: 50,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              // marginTop: 24,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.4)',
              ...defaultStyles.shadowButton,
            }}
          >
            <Icon name="envelope" solid size={20} color="white" style={{ paddingTop: 1 }} />
          </View>
        </View> */}
      </View>
    );
  };

  const renderTitle = () => {
    if (type === 'INTRO') {
      return (
        <>
          <View style={{ paddingRight: 70, paddingBottom: 16 }}>
            {!!title && (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
                <Icon
                  name="hand-peace"
                  size={17}
                  color={colors.white}
                  solid
                  style={{ textAlign: 'center', ...defaultStyles.shadowButton }}
                />
                <Text
                  style={{
                    ...defaultStyles.defaultBold,
                    color: 'rgba(255,255,255,1)',
                    paddingLeft: 10,
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
                  color: 'rgba(255,255,255,1)',
                  paddingLeft: 12,
                  paddingTop: 10,
                }}
              >
                {text}
              </Text>
            )}
            {/* {!!owner.location && (
            <Text
              numberOfLines={3}
              style={{
                ...defaultStyles.defaultRegular,
                color: 'rgba(255,255,255,1)',
                paddingLeft: 12,
                paddingTop: 10,
              }}
            >
              {owner.location}
            </Text>
          )} */}
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
            {/* {!!owner.location && (
            <Text
              numberOfLines={3}
              style={{
                ...defaultStyles.defaultRegular,
                color: 'rgba(255,255,255,1)',
                paddingLeft: 12,
                paddingTop: 10,
              }}
            >
              {owner.location}
            </Text>
          )} */}
          </View>
          {renderTopics()}
        </>
      );
    }

    // if (type === 'MYSTORY') {
    //   return (
    //     <View style={{ paddingRight: 70, paddingBottom: 16 }}>
    //       {title && (
    //         <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
    //           <Icon
    //             name="history"
    //             size={13}
    //             color={colors.white}
    //             solid
    //             style={{ textAlign: 'center', paddingTop: 1, ...defaultStyles.shadowButton }}
    //           />
    //           <Text
    //             style={{
    //               ...defaultStyles.defaultBold,
    //               color: 'rgba(255,255,255,1)',
    //               paddingLeft: 10,
    //             }}
    //           >
    //             {`${owner.firstName}'s Weekly`}
    //           </Text>
    //         </View>
    //       )}
    //     </View>
    //   );
    // }

    // if the active story is a project
    if (type === 'PROJECT') {
      return (
        <>
          <View style={{ paddingRight: 70, paddingBottom: 16 }}>
            {!!title && (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
                <Icon
                  name="clone"
                  size={15}
                  color={colors.white}
                  solid
                  style={{ textAlign: 'center', paddingTop: 1, ...defaultStyles.shadowButton }}
                />
                <Text
                  style={{
                    ...defaultStyles.defaultBold,
                    color: 'rgba(255,255,255,1)',
                    paddingLeft: 10,
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
            {/* {!!owner.location && (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
                <Icon
                  name="map-marker-alt"
                  size={12}
                  color={colors.white}
                  solid
                  style={{ textAlign: 'center', paddingTop: 1, ...defaultStyles.shadowButton }}
                />
                <Text
                  style={{
                    ...defaultStyles.defaultRegular,
                    color: 'rgba(255,255,255,1)',
                    paddingLeft: 10,
                    paddingTop: 3,
                  }}
                >
                  {owner.location}
                </Text>
              </View>
            )} */}
          </View>

          {renderTopics(topics || [])}
        </>
      );
    }

    // if the active story is not a project...but the story item belongs to a project
    // if (project) {
    //   return (
    //     <>
    //       <Text style={{ ...defaultStyles.largeSemibold, color: 'rgba(255,255,255,1)', paddingBottom: 12, paddingLeft: 12 }}>
    //         {project.title || null}
    //         {/* {'  '}
    //         <Icon name="caret-right" solid size={16} color="white" /> */}
    //       </Text>
    //       {renderTopics(project.topics || [])}
    //     </>
    //   );
    // }

    // if (soloStory) {
    //   if (soloStory.topics) {
    //     return renderTopics(soloStory.topics || []);
    //   }
    // }

    // if the item does not belong to a project, but it has topics, just render the topics
    // if (topics) {
    //   if (topics.length > 0) {
    //     // return renderTopics(topics || []);
    //   }
    // }

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
              <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>{plays}</Text>
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
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 14, paddingLeft: 10 }}>
        <ProfilePic size="small" user={owner} navigation={navigation} enableIntro={story.type !== 'INTRO'} enableStory={false} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile', { profileId: owner.id });
          }}
        >
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
              <Text style={{ ...defaultStyles.defaultBold, color: 'white', paddingRight: 10 }}>{owner.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }} />
          </View>
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          width: '100%',
          height: 50,
          paddingLeft: 12,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: 'rgba(255,255,255,0.3)',
          justifyContent: 'center',
        }}
      >
        {renderBottom()}
      </View>
      <View style={{ position: 'absolute', bottom: 60, right: 0 }}>{renderActions()}</View>
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
