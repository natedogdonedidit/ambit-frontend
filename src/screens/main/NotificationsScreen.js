/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator, RefreshControl, Animated, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery, useMutation } from '@apollo/client';
// import isAfter from 'date-fns/isAfter';
// import addDays from 'date-fns/addDays';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderNotifications from 'library/components/headers/HeaderNotifications';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import CLEAR_NOTIFICATIONS_MUTATION from 'library/mutations/CLEAR_NOTIFICATIONS_MUTATION';

import Loader from 'library/components/UI/Loader';
import NotificationListItem from 'library/components/lists/NotificationListItem';
import { UserContext } from 'library/utils/UserContext';
import POSTS_MYGOALS_QUERY from 'library/queries/POSTS_MYGOALS_QUERY';
import { DAYS_TILL_INACTIVE, DAYS_TILL_INACTIVE_NOTIFY } from 'styles/constants';

const NotificationsScreen = ({ navigation }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const { currentUserId } = useContext(UserContext);

  const insets = useSafeAreaInsets();
  const [top, setTop] = useState(insets.top); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal

  // GET "MY GOALS"
  const {
    error: errorPostsMyGoals,
    data: dataPostsMyGoals,
    refetch: refetchPostsMyGoals,
    fetchMore: fetchMorePostsMyGoals,
    networkStatus: networkStatusPostsMyGoals,
  } = useQuery(POSTS_MYGOALS_QUERY, {
    variables: {
      feed: 'mygoals',
      take: 10,
    },
    onError: (e) => console.log('error loading my goals posts', e),
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'cache-and-network', // had to do this or refetch would not update the UI (but it ruins opt response of Likes)
  });
  const createGoalNotifications = () => {
    if (dataPostsMyGoals && dataPostsMyGoals.postsMyGoals && dataPostsMyGoals.postsMyGoals.posts) {
      // map over goals and create a notifcation for each (if about to expire)
      // setting the goal to inactive and creating the "your goal expired" notification happens on server
      const { posts } = dataPostsMyGoals.postsMyGoals;

      return posts.reduce((acc, post) => {
        if (post.goal && post.goalStatus === 'Active') {
          const today = new Date();
          const daysSinceUpdated = differenceInCalendarDays(today, new Date(post.lastUpdated));
          const daysRemainingTillInactive = DAYS_TILL_INACTIVE - daysSinceUpdated;
          const isAlmostInactive = daysRemainingTillInactive < DAYS_TILL_INACTIVE_NOTIFY;

          // if today is after dateToNotify, create notifcation
          if (isAlmostInactive) {
            const newNotif = {
              id: post.id,
              createdAt: new Date(),
              style: 'GOAL_ALMOST_EXPIRE',
              post,
              seen: false,
            };

            return [...acc, newNotif];
          }
        }
        return acc;
      }, []);
    }

    return [];
  };

  const almostInactiveGoals = useMemo(createGoalNotifications, [dataPostsMyGoals]);

  useEffect(() => {
    if (insets.top > 0) {
      setTop(insets.top);
    }
  }, [insets.top]);

  const [clearMyNotifications] = useMutation(CLEAR_NOTIFICATIONS_MUTATION, {
    // update: (proxy, { data: dataReturned }) => {
    //   proxy.writeQuery({
    //     query: NOTIFICATIONS_QUERY,
    //     data: {
    //       notifications: dataReturned.clearMyNotifications,
    //     },
    //   });
    // },
    onError: (e) => {
      console.log(e);
    },
    // onCompleted: () => refetch(),
    refetchQueries: [
      {
        query: NOTIFICATIONS_QUERY,
        variables: {
          where: { targetId: { equals: currentUserId } },
          first: 20,
          orderBy: [{ createdAt: 'desc' }],
        },
      },
    ],
  });

  useEffect(() => {
    navigation.addListener('focus', () => {
      clearMyNotifications();
    });
  }, []);

  // QUERIES
  const { error, data, refetch, networkStatus } = useQuery(NOTIFICATIONS_QUERY, {
    variables: {
      where: { targetId: { equals: currentUserId } },
      first: 20,
      orderBy: [{ createdAt: 'desc' }],
    },
    notifyOnNetworkStatusChange: true,
    // fetchPolicy: 'cache-and-network',
  });

  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;
  const ok = networkStatus === 7;

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    refetch();
  };

  // if (error) return <Error error={error} />;
  if (error) {
    console.log(error);
  }

  if (loading || error || !data) {
    return (
      <View style={{ ...styles.container, paddingTop: top }}>
        <HeaderNotifications
          handleMiddle={() => null}
          handleRight={() => navigation.navigate('Search')}
          navigation={navigation}
        />
        <Loader loading={loading} size="small" full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }

  // PREPARE DATE FOR GIFTED CHAT
  const { notifications } = data;

  const notificationsWithInactiveGoals = [...almostInactiveGoals, ...notifications];
  // console.log('chad:', notificationsWithInactiveGoals);

  if (!data || !notifications) {
    return (
      <View style={{ ...styles.container, paddingTop: top, backgroundColor: colors.white }}>
        <HeaderNotifications
          handleMiddle={() => null}
          handleRight={() => navigation.navigate('Search')}
          navigation={navigation}
        />
        {/* Gives a solid background to the StatusBar */}
        <View
          style={{
            ...styles.statusBar,
            height: top,
          }}
        />
        <Loader loading={loading} size="small" full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }

  return (
    <View style={{ ...styles.container, paddingTop: top }}>
      <StatusBar barStyle="dark-content" />
      <HeaderNotifications handleMiddle={() => null} handleRight={() => navigation.navigate('Search')} navigation={navigation} />

      {/* This is the loading animation */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 15,
          left: 0,
          width: '100%',
          height: 60,
          justifyContent: 'flex-end',
          backgroundColor: colors.lightGray,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-45, 0],
                outputRange: [45, 0],
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
            }}
            size="small"
            // color={colors.purp}
            animating={refetching}
            hidesWhenStopped={false}
          />
        </View>
      </Animated.View>
      <FlatList
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={refetch}
        refreshing={refetching}
        initialNumToRender={20} // speeds up load time
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
          { useNativeDriver: false }
        )}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={
          <View
            style={[
              { height: 15 },
              notifications.length > 0 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.borderBlack,
              },
            ]}
          />
        }
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>No notifications</Text>
        }
        data={notificationsWithInactiveGoals}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return <NotificationListItem navigation={navigation} notification={item} />;
        }}
      />
      {/* Gives a solid background to the StatusBar */}
      <View
        style={{
          ...styles.statusBar,
          height: top,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    overflow: 'hidden',
    position: 'relative',
  },
  flatList: {
    // backgroundColor: colors.lightGray,
    flex: 1,
    width: '100%',
  },
  flatListContainer: {
    paddingBottom: 20,
    backgroundColor: colors.lightGray,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default NotificationsScreen;
