/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator, RefreshControl, Animated, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery, useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderNotifications from 'library/components/headers/HeaderNotifications';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import CLEAR_NOTIFICATIONS_MUTATION from 'library/mutations/CLEAR_NOTIFICATIONS_MUTATION';

import Loader from 'library/components/UI/Loader';
import NotificationListItem from 'library/components/lists/NotificationListItem';
import { UserContext } from 'library/utils/UserContext';

const NotificationsScreen = ({ navigation }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const { currentUserId } = useContext(UserContext);

  const insets = useSafeAreaInsets();
  const [top, setTop] = useState(insets.top); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal

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
    onCompleted: () => refetch(),
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
  // console.log(notifications);
  if (!data || !notifications) {
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

  return (
    <View style={{ ...styles.container, paddingTop: top }}>
      <StatusBar barStyle="dark-content" />
      <HeaderNotifications handleMiddle={() => null} handleRight={() => navigation.navigate('Search')} navigation={navigation} />

      {/* This is the loading animation */}
      {/* <Animated.View
        style={{
          position: 'absolute',
          top: 15,
          left: 0,
          width: '100%',
          height: 60,
          justifyContent: 'flex-end',
          // backgroundColor: 'pink',
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
              backgroundColor: 'transparent',
            }}
            size="small"
            color={colors.purp}
            animating={refetching}
            hidesWhenStopped={false}
          />
        </View>
      </Animated.View> */}
      <FlatList
        // refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
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
        data={notifications}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          // console.log(item);
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
    backgroundColor: colors.white,
    overflow: 'hidden',
    position: 'relative',
  },
  flatList: {
    backgroundColor: colors.lightGray,
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
