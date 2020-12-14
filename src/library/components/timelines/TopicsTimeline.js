import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  RefreshControl,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import StoriesTopic from 'library/components/stories/StoriesTopic';

import PostGroupTL from 'library/components/post/PostGroupTL';
import POSTS_WHERE_QUERY from 'library/queries/POSTS_WHERE_QUERY';
import { getTopicFromID } from 'library/utils/';
import EDIT_TOPICS_MUTATION from 'library/mutations/EDIT_TOPICS_MUTATION';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import { UserContext } from 'library/utils/UserContext';
import TopicFollowButton from 'library/components/UI/buttons/TopicFollowButton';
import STORIES_TOPIC_QUERY from 'library/queries/STORIES_TOPIC_QUERY';
import SINGLE_TOPIC from 'library/queries/SINGLE_TOPIC';

const picExample =
  'https://images.unsplash.com/photo-1592320937521-84c88747a68a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80';

const TopicsTimeline = ({ activeTopicID, navigation, scrollY, paddingTop }) => {
  const currentTime = new Date();
  const { name, topicID, image } = getTopicFromID(activeTopicID);
  const { currentUserId } = useContext(UserContext);

  const { loading: loadingTopic, data: dataTopic, refetch: refetchTopic } = useQuery(SINGLE_TOPIC, {
    variables: {
      where: {
        id: activeTopicID,
      },
    },
  });

  // QUERIES
  const { error, data, refetch, fetchMore, networkStatus } = useQuery(POSTS_WHERE_QUERY, {
    variables: {
      take: 10, // FIXME, need to add "See more" button. onEndReached does not work bc nested scroll (i think)
      where: {
        topic: { contains: activeTopicID },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  // GETS STORIES FOR YOUR FAV TOPICS
  const { error: errorStories, data: dataStories, loading: loadingStories } = useQuery(STORIES_TOPIC_QUERY, {
    variables: {
      topic: topicID,
    },
  });

  const hasStories =
    !loadingStories && !errorStories && dataStories && dataStories.storiesTopic && dataStories.storiesTopic.length > 0;

  // GET MY TOPICS
  // const { data: dataTopics } = useQuery(CURRENT_USER_TOPICS);
  // const topicsIDonly = useMemo(() => {
  //   if (dataTopics && dataTopics.userLoggedIn && dataTopics.userLoggedIn.topicsFocus) {
  //     return dataTopics.userLoggedIn.topicsFocus.map((topic) => topic.id);
  //   }

  //   return [];
  // }, [dataTopics]);
  // const isFollowing = useMemo(() => {
  //   return topicsIDonly.includes(topicID);
  // }, [topicsIDonly]);

  // MUTATIONS
  // const [updateOneUser, { loading: loadingMutation, error: errorMutation }] = useMutation(EDIT_TOPICS_MUTATION, {
  //   onError: () =>
  //     Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ]),
  //   refetchQueries: () => [{ query: CURRENT_USER_TOPICS }],
  // });

  // const handleTopicSelect = () => {
  //   if (!loadingMutation && !errorMutation) {
  //     if (isFollowing) {
  //       // unfollow
  //       updateOneUser({
  //         variables: {
  //           where: { id: currentUserId }, // userLoggedIn
  //           data: {
  //             topicsFocus: { disconnect: [{ id: topicID }] },
  //           },
  //         },
  //       });
  //     } else {
  //       // follow
  //       updateOneUser({
  //         variables: {
  //           where: { id: currentUserId }, // userLoggedIn
  //           data: {
  //             topicsFocus: { connect: [{ id: topicID }] },
  //           },
  //         },
  //       });
  //     }
  //   }
  // };

  // networkStatus states: 1: loadin, 3: fetchMore, 4: refetch, 7: no loading, no refetch, everything OK!
  // LOADING STATES
  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;
  const fetchingMore = networkStatus === 3;
  const ok = networkStatus === 7;

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  // if (!data || loading) {
  //   return <Loader backgroundColor={colors.lightGray} size="small" />;
  // }

  const posts = data && data.postsWhere && data.postsWhere.posts ? data.postsWhere.posts : [];

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    refetch();
    refetchTopic();
  };

  const followersCount = dataTopic && dataTopic.topic && dataTopic.topic.followersCount ? dataTopic.topic.followersCount : null;

  // RENDER
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={refetching}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={styles.timeline}
        ListHeaderComponent={
          <View>
            <View
              style={{
                paddingTop: 50,
                paddingBottom: 20,
                alignItems: 'center',
                backgroundColor: 'white',
                borderBottomColor: colors.borderBlack,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderTopColor: colors.borderBlack,
                borderTopWidth: StyleSheet.hairlineWidth,
              }}
            >
              {hasStories ? (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('StoryModalTopic', {
                      topicIDtoSearch: topicID,
                    })
                  }
                  style={{
                    width: 104,
                    height: 104,
                    borderRadius: 53,
                    backgroundColor: colors.purp,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 98,
                      height: 98,
                      borderRadius: 49,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: 94,
                        height: 94,
                        borderRadius: 47,
                        // ...defaultStyles.shadow6,
                      }}
                    >
                      <Image
                        style={styles.pic}
                        resizeMode="cover"
                        source={{
                          uri: image || picExample,
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    width: 94,
                    height: 94,
                    borderRadius: 47,
                    // ...defaultStyles.shadow6,
                  }}
                >
                  <Image
                    style={styles.pic}
                    resizeMode="cover"
                    source={{
                      uri: image || picExample,
                    }}
                  />
                </View>
              )}

              <Text style={{ ...defaultStyles.headerTopic, paddingVertical: 12 }}>{name}</Text>
              <TopicFollowButton topicID={topicID} />
              {/* {isFollowing ? (
                <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(topicID)}>
                  <View style={styles.addedButton}>
                    <Text style={defaultStyles.followButton}>Following</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handleTopicSelect(topicID);
                  }}
                >
                  <View style={styles.addButton}>
                    <Text style={{ ...defaultStyles.followButton, color: colors.purp }}>Follow</Text>
                  </View>
                </TouchableOpacity>
              )} */}
              {followersCount > 1 && (
                <Text style={{ ...defaultStyles.smallMute, paddingTop: 12 }}>{followersCount} Followers</Text>
              )}
            </View>
            <View style={{ height: 10 }} />
            {/* <StoriesTopic topicID={activeTopicID} navigation={navigation} refetching={refetching} /> */}
          </View>
        }
        ListEmptyComponent={() => {
          return (
            <View style={{ width: '100%', height: 200 }}>
              {loading ? (
                <Loader backgroundColor={colors.lightGray} size="small" full={false} active />
              ) : (
                <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>No posts were found</Text>
              )}
            </View>
          );
        }}
        renderSectionFooter={() => {
          // SHOW LOADER IF FETCHING MORE
          if (fetchingMore) {
            return (
              <View style={{ height: 80 }}>
                <Loader backgroundColor="transparent" size="small" full={false} active />
              </View>
            );
          }
          return null;
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        data={posts}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => {
          // console.log(index);
          return <PostGroupTL post={item} currentTime={currentTime} navigation={navigation} showTopBorder={index === 0} />;
        }}
        onEndReachedThreshold={1.2}
        onEndReached={(info) => {
          // console.log('onEndReached triggered', info);
          // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment

          if (data && data.postsWhere && data.postsWhere.hasNextPage && networkStatus === 7 && info.distanceFromEnd > -300) {
            const lastPost = data.postsWhere.posts[data.postsWhere.posts.length - 1].id;
            // console.log('fetching more topic posts:', lastPost);

            fetchMore({
              variables: {
                cursor: lastPost,
                take: 10,
              },
            });
          }
        }}
      />
      {/* This is the loading animation */}
      <Animated.View
        style={{
          position: 'absolute',
          top: -400,
          left: 0,
          width: '100%',
          height: paddingTop + 7 + 400,
          justifyContent: 'flex-end',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-800, 0],
                outputRange: [800, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <View style={{ width: '100%', height: 60 }}>
          <ActivityIndicator
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            size="small"
            color={colors.purp}
            animating={refetching}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: colors.lightGray,
    flex: 1,
    width: '100%',
  },
  pic: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  addButton: {
    height: 32,
    width: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.purp,
    opacity: 0.9,
  },
  addedButton: {
    height: 32,
    width: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.purp,
  },
});

export default TopicsTimeline;
