/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderNotifications from 'library/components/headers/HeaderNotifications';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import NEW_NOTIFICATION_SUBSCRIPTION from 'library/subscriptions/NEW_NOTIFICATION_SUBSCRIPTION';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
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
    notifyOnNetworkStatusChange: true,
  });

  // const more = () =>
  //   subscribeToMore({
  //     document: NEW_NOTIFICATION_SUBSCRIPTION,
  //     variables: { id: currentUserId },
  //     updateQuery: (previousData, { subscriptionData }) => {
  //       // console.log('subscriptionData', subscriptionData);
  //       // console.log('previousData', previousData);
  //       if (!subscriptionData.data) return previousData;
  //       const newNotifation = subscriptionData.data.newNotification;
  //       // console.log('newMessage', newMessage);
  //       const newList = [newNotifation, ...previousData.myNotifications];
  //       return {
  //         myNotifications: newList,
  //       };
  //     },
  //   });

  // useEffect(() => {
  //   more();
  // }, []);

  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;

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
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
            Sorry, no chats to display at this time
          </Text>
        }
        data={myNotifications}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <Text>
              {item.user.name} liked your post about {item.post.goal}
            </Text>
          );
        }}
      />
    </SafeAreaView>
  );
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
