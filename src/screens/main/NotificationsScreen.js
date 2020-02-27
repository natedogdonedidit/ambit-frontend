/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderNotifications from 'library/components/headers/HeaderNotifications';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';

import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import NotificationListItem from 'library/components/lists/NotificationListItem';
import { UserContext } from 'library/utils/UserContext';

const NotificationsScreen = ({ navigation }) => {
  const { clearNotifications } = useContext(UserContext);
  navigation.addListener('focus', () => {
    clearNotifications();
  });

  // QUERIES
  const { error, data, refetch, networkStatus } = useQuery(NOTIFICATIONS_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;
  const ok = networkStatus === 7;

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
