import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderMessages from 'library/components/headers/HeaderMessages';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import FullWidthTabs from 'library/components/UI/FullWidthTabs';
import ChatListItem from 'library/components/chat/ChatListItem';
import { sortChats } from 'library/utils';

const MessagesScreen = ({ navigation }) => {
  // CONSTANTS
  const TABS = ['Messages', 'Requests'];

  // STATE
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // HOOKS
  const currentTime = new Date();

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser, refetch, networkStatus } = useQuery(CURRENT_USER_QUERY, {
    notifyOnNetworkStatusChange: true,
  });
  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;

  if (errorUser) return <Error error={errorUser} />;
  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <HeaderMessages handleMiddle={() => null} handleRight={() => navigation.navigate('Search')} navigation={navigation} />
        {/* <FullWidthTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} height={40} /> */}
        <Loader loading={loading} full={false} backgroundColor={colors.lightGray} />
      </SafeAreaView>
    );
  const { userLoggedIn } = dataUser;

  const groups = userLoggedIn.groups || [];
  groups.sort(sortChats); // sort groups by date

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMessages handleMiddle={() => null} handleRight={() => navigation.navigate('Search')} navigation={navigation} />
      {/* <FullWidthTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} height={40} /> */}
      <FlatList
        // refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={refetch}
        refreshing={refetching}
        initialNumToRender={10} // speeds up load time
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
        data={groups}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          // console.log(item);
          return <ChatListItem navigation={navigation} userLoggedIn={userLoggedIn} chat={item} currentTime={currentTime} />;
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

export default MessagesScreen;
