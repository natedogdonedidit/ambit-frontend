/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { NavigationActions } from 'react-navigation';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderNotifications from 'library/components/headers/HeaderNotifications';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import CLEAR_NOTIFICATIONS_MUTATION from 'library/mutations/CLEAR_NOTIFICATIONS_MUTATION';

import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import NotificationListItem from 'library/components/lists/NotificationListItem';
import { UserContext } from 'library/utils/UserContext';

const NotificationsScreen = ({ navigation }) => {
  const { currentUserId } = useContext(UserContext);

  // QUERIES
  const {
    // loading,
    error,
    data,
    refetch,
    networkStatus,
    subscribeToMore,
  } = useQuery(NOTIFICATIONS_QUERY, {
    // fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;
  const ok = networkStatus === 7;

  // for marking UNSEEN notifications as SEEN
  const [clearMyNotifications] = useMutation(CLEAR_NOTIFICATIONS_MUTATION, {
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: NOTIFICATIONS_QUERY,
        data: {
          myNotifications: dataReturned.clearMyNotifications,
        },
      });
    },
    onError: e => {
      console.log(e);
    },
  });

  // // checks to see if any notifications are unSeen & clear them on the backend
  // this is running too often!! needs to only run when screen focuses
  // this should run everytime the screen focuses!! investigate React Navigation onFocusEffect v5
  useEffect(() => {
    console.log('in effect - Notifications Screen');
    if (ok && data.myNotifications) {
      console.log('in if - Notifications Screen');
      // get # of unseen
      const { myNotifications } = data;
      const unSeen = myNotifications.reduce((num, notification) => {
        if (!notification.seen) return num + 1;
        return num;
      }, 0);

      if (unSeen > 0) {
        console.log('clearing - Notifications screen');
        clearMyNotifications();

        // clear unseen in navigation params
        const setParamsAction = NavigationActions.setParams({
          params: { unSeen: 0 },
          key: 'NotificationsTab',
        });
        navigation.dispatch(setParamsAction);
      }
    }
  }, [data]);

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderNotifications
          handleMiddle={() => null}
          handleRight={() => navigation.navigate('Search')}
          navigation={navigation}
        />
        <Loader loading={loading} full={false} backgroundColor={colors.lightGray} />
      </SafeAreaView>
    );
  }

  // PREPARE DATE FOR GIFTED CHAT
  const { myNotifications } = data;
  console.log(myNotifications);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNotifications handleMiddle={() => null} handleRight={() => navigation.navigate('Search')} navigation={navigation} />
      <FlatList
        onRefresh={refetch}
        refreshing={refetching}
        initialNumToRender={20} // speeds up load time
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={
          <View style={{ height: 15, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
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
    </SafeAreaView>
  );
};

NotificationsScreen.navigationOptions = {
  title: 'Notifications',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
});

export default NotificationsScreen;
