/* eslint-disable no-underscore-dangle */
import React, { useContext, useState } from 'react';
import { StyleSheet, View, FlatList, Text, ActivityIndicator, RefreshControl, Animated, StatusBar } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderNotifications from 'library/components/headers/HeaderNotifications';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';

import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import NotificationListItem from 'library/components/lists/NotificationListItem';
import { UserContext } from 'library/utils/UserContext';
import { useEffect } from 'react';

const NotificationsScreen = ({ navigation }) => {
  const [scrollY] = useState(new Animated.Value(0));

  const { clearNotifications } = useContext(UserContext);

  useEffect(() => {
    navigation.addListener('focus', () => {
      clearNotifications();
    });
  }, []);

  const insets = useSafeArea();

  // QUERIES
  const { error, data, refetch, networkStatus } = useQuery(NOTIFICATIONS_QUERY, {
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

  if (loading || error) {
    return (
      <View style={{ ...styles.container, paddingTop: insets.top }}>
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
  const { myNotifications } = data;

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
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
              myNotifications.length > 0 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.borderBlack,
              },
            ]}
          />
        }
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>No notifications</Text>
        }
        data={myNotifications}
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
          height: insets.top,
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
