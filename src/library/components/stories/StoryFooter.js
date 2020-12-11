import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, InteractionManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { getTopicFromID } from 'library/utils';
import { useMutation } from '@apollo/client';
import UPDATE_STORY_ITEM_MUTATION from 'library/mutations/UPDATE_STORY_ITEM_MUTATION';
// import UNLIKE_STORYITEM_MUTATION from 'library/mutations/UNLIKE_STORYITEM_MUTATION';
import { StoryItemFragment } from 'library/queries/_fragments';
import { UserContext } from 'library/utils/UserContext';
import ProfilePic from 'library/components/UI/ProfilePic';
import StoryTapRegions from 'library/components/stories/StoryTapRegions';

// ONLY RE-RENDER IF THE ACTIVEITEM CHANGES
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  if (prevProps.itemIsActive === nextProps.itemIsActive) {
    return true;
  }

  return false;
}

function StoryFooter({
  navigation,
  story,
  item,
  itemIsActive,
  isMyPost,
  handleMoreButton,
  setPaused,

  decrementIndex,
  incrementIndex,
  // setDisableOutterScroll,
}) {
  const { currentUserId } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(item.likedByMe);
  const [likesCount, setLikesCount] = useState(item.likesCount);
  const [sentMutation, setSentMutation] = useState(false);

  const { owner, title, type, topic } = story;
  const { intro } = owner;
  const showIntroButton = type !== 'INTRO' && intro.items.length > 0;

  const { id, plays, text, link } = item;

  // MUTATIONS
  const [likeStoryItem, { loading: loadingLike }] = useMutation(UPDATE_STORY_ITEM_MUTATION);

  const [unlikeStoryItem, { loading: loadingUnlike }] = useMutation(UPDATE_STORY_ITEM_MUTATION, {
    onError: () => null,
  });

  // if the item isn't active...don't render anything. But this will allow us to keep our state (isLiked, likeCount)
  if (!itemIsActive) {
    return null;
  }

  // FUNCTIONS
  const handleLike = async ({ isLikeOnly = false }) => {
    // sent mutation makes it so you can only send 1 mutation per mount
    if (isLiked && !sentMutation && !isLikeOnly) {
      setSentMutation(true);
      setIsLiked(false);
      setLikesCount(likesCount - 1);
      InteractionManager.runAfterInteractions(() => {
        console.log('unlike story', id);
        unlikeStoryItem({
          variables: {
            where: { id },
            data: {
              likes: {
                disconnect: [{ id: currentUserId }],
              },
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            unlikeStoryItem: {
              __typename: 'StoryItem',
              ...item,
              likedByMe: false,
              likesCount: item.likesCount - 1,
            },
          },
        });
      });
      // } else if (!isLiked && !sentMutation) { // did this to prevent liking then unlinking right away race condition
    } else if (!isLiked) {
      setSentMutation(true);
      setIsLiked(true);
      setLikesCount(likesCount + 1);
      InteractionManager.runAfterInteractions(() => {
        console.log('like story', id);
        likeStoryItem({
          variables: {
            where: { id },
            data: {
              likes: {
                connect: [{ id: currentUserId }],
              },
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            likeStoryItem: {
              __typename: 'StoryItem',
              ...item,
              likedByMe: true,
              likesCount: item.likesCount + 1,
            },
          },
        });
      });
    }
  };

  // RENDER FUNCTIONS
  const renderTopics = () => {
    const hasTopics = !!topic;

    if (hasTopics) {
      const { icon, color, name } = getTopicFromID(topic);
      return (
        // <ScrollView
        //   horizontal
        //   style={{ flex: 1 }}
        //   showsHorizontalScrollIndicator={false}
        //   contentContainerStyle={{
        //     paddingLeft: 12,
        //     paddingBottom: 5,
        //   }}
        // >
        //   <TouchableOpacity
        //     activeOpacity={1}
        //     onPressIn={() => setDisableOutterScroll(true)}
        //     onPressOut={() => setDisableOutterScroll(false)}
        //     style={{ flexDirection: 'row' }}
        //   >
        <View style={{ paddingLeft: 12, paddingBottom: 5, alignSelf: 'flex-start' }}>
          <View
            key={topic.topicID}
            style={{
              height: 26,
              paddingHorizontal: 7,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.2)',
              marginRight: 5,
              ...defaultStyles.shadowButton,
            }}
          >
            {/* {icon && <Icon name={icon} solid size={14} color={colors[color] || colors.blueGray} style={{ paddingRight: 6 }} />} */}
            <Text style={{ ...defaultStyles.smallSemibold, color: colors.white }}>{name}</Text>
          </View>
        </View>

        /* {owner.location && (
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
                  <Icon name="map-marker-alt" solid size={10} color={colors.white} style={{ paddingRight: 6, paddingLeft: 2 }} />
                  <Text style={{ ...defaultStyles.smallSemibold, color: colors.white }}>{owner.location}</Text>
                </View>
              )} */
        //   </TouchableOpacity>
        // </ScrollView>
      );
    }

    // if no topics or location
    return null;
  };

  const renderActions = () => {
    return (
      <View style={{ paddingRight: 8, paddingBottom: 12, paddingLeft: 10, alignItems: 'center' }}>
        {/* <ProfilePic size="medium" user={owner} navigation={navigation} enableClick enableStory={false} enableIntro={false} /> */}
        <TouchableOpacity
          onPress={handleLike}
          style={styles.sideButtonCircle}
          hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
        >
          <Icon name="heart" solid size={20} color={isLiked ? colors.peach : colors.white} style={{ paddingTop: 2 }} />
          <Text style={styles.sideButtonText}>{likesCount === 0 ? null : likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPaused(true);
            navigation.navigate('DMPostPopup', { storyItemId: item.id, storyId: story.id });
          }}
          style={styles.sideButtonCircle}
          hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
        >
          <Icon name="share" solid size={20} color="white" style={{ paddingTop: 1 }} />
          {/* <Text style={styles.sideButtonText}>12</Text> */}
        </TouchableOpacity>
        <View style={{ marginTop: 32 }}>
          <ProfilePic size="medium" user={owner} navigation={navigation} enableClick enableStory={false} enableIntro={false} />
        </View>
        {/* 
        {showIntroButton ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('StoryModalUser', {
                story: {
                  ...intro,
                  owner: { ...owner },
                },
              });
            }}
            style={styles.sideButtonCircle}
            hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
          >
            <Image source={require('../../assets/images/dueces.png')} style={{ width: 22, height: 22 }} />
            <Text style={styles.sideButtonText}>{intro.items[0].plays === 0 ? null : intro.items[0].plays}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { username: owner.username })}
            style={styles.sideButtonCircle}
            hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
          >
            <Icon name={link ? 'link' : 'user'} solid size={20} color="white" style={{ paddingTop: 1 }} />
          </TouchableOpacity>
        )} */}
      </View>
    );
  };

  const renderTextAndTopics = () => {
    if (type === 'INTRO') {
      return (
        <>
          <View style={{ paddingRight: 70, paddingBottom: 12 }}>
            <View
              style={{
                marginLeft: 12,
                height: 26,
                paddingHorizontal: 7,
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.2)',
                marginRight: 5,
                ...defaultStyles.shadowButton,
                alignSelf: 'flex-start',
              }}
            >
              <Text style={{ ...defaultStyles.smallSemibold, color: colors.white }}>👋 Intro</Text>
            </View>
            {/* {!!title && (
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 12 }}>
                <Text
                  style={{
                    ...defaultStyles.defaultBold,
                    color: 'white',
                    paddingTop: 5,
                  }}
                >
                  {`${owner.username}'s Intro`}
                </Text>
              </View>
            )} */}
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
          <View style={{ paddingRight: 70, paddingBottom: 12 }}>
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
          <View style={{ paddingRight: 70, paddingBottom: 12 }}>
            {renderTopics()}
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
                  paddingTop: 8,
                }}
              >
                {text}
              </Text>
            )}
          </View>
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
        <Text style={{ ...defaultStyles.defaultMedium, color: 'rgba(255,255,255,0.6)' }}>{`Send ${owner.name} a message..`}</Text>
      </View>
    );
  };

  return (
    <>
      <StoryTapRegions
        decrementIndex={decrementIndex}
        incrementIndex={incrementIndex}
        handleLike={handleLike}
        setPaused={setPaused}
      />
      <View style={{ ...styles.container, bottom: 5 }}>
        <View style={styles.textAndTopics}>{renderTextAndTopics()}</View>
        <View style={styles.bottomRow}>{renderBottomRow()}</View>
        <View style={styles.sideButtonContainer}>{renderActions()}</View>
      </View>
    </>
  );
}

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
    backgroundColor: 'rgba(255,255,255,0.2)',
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

export default React.memo(StoryFooter, areEqual);
