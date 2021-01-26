import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery, useApolloClient, useSubscription } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderMessages from 'library/components/headers/HeaderMessages';
import CURRENT_USER_CONVOS from 'library/queries/CURRENT_USER_CONVOS';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import FullWidthTabs from 'library/components/UI/FullWidthTabs';
import ChatListItem from 'library/components/chat/ChatListItem';
import { sortChats } from 'library/utils';
import MESSAGE_SUBSCRIPTION from 'library/subscriptions/MESSAGE_SUBSCRIPTION';
import MESSAGES_CONNECTION from 'library/queries/MESSAGES_CONNECTION';
import { UserContext } from 'library/utils/UserContext';

const ConvosScreen = ({ navigation }) => {
  const client = useApolloClient();
  const { currentUserId } = useContext(UserContext);

  // CONSTANTS
  // const TABS = ['Messages', 'Requests'];
  const [currentTime, setCurrentTime] = useState(new Date());

  // STATE
  // const [activeTab, setActiveTab] = useState(TABS[0]);
  const insets = useSafeAreaInsets();
  const [top, setTop] = useState(insets.top || 20); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal

  useEffect(() => {
    if (insets.top > 0) {
      setTop(insets.top);
    }
  }, [insets.top]);

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser, refetch, networkStatus } = useQuery(CURRENT_USER_CONVOS, {
    notifyOnNetworkStatusChange: true,
  });
  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;

  // HOOKS
  // updates the time on each focus
  useEffect(() => {
    navigation.addListener('focus', () => {
      setCurrentTime(new Date());
    });
  }, []);

  // console.log('loading convos: ', loading);

  if (errorUser) return <Error error={errorUser} />;
  if (loading)
    return (
      <View style={{ ...styles.container, paddingTop: top }}>
        <HeaderMessages handleMiddle={() => null} handleRight={() => navigation.navigate('Search')} navigation={navigation} />
        {/* <FullWidthTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} height={40} /> */}
        <Loader loading={loading} full={false} size="small" backgroundColor={colors.lightGray} />
      </View>
    );

  const { userLoggedIn } = dataUser;
  const convos = [...userLoggedIn.convos] || [];

  // convos.sort(sortChats); // sort convos by date, do this in query fragment

  // console.log('convos', convos);

  return (
    <View style={{ ...styles.container, paddingTop: top }}>
      <HeaderMessages
        handleMiddle={() => null}
        handleRight={() => navigation.navigate('DMPostPopup', { isNewMessage: true })}
        navigation={navigation}
      />
      {/* <FullWidthTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} height={40} /> */}
      <FlatList
        // refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        // onRefresh={refetch}
        // refreshing={refetching}
        initialNumToRender={10} // speeds up load time
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={
          <View
            style={[
              { height: 15 },
              convos.length > 0 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.borderBlack,
              },
            ]}
          />
        }
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
            Your messages will appear here
          </Text>
        }
        data={convos}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          // console.log(item);
          return <ChatListItem navigation={navigation} userLoggedIn={userLoggedIn} convo={item} currentTime={currentTime} />;
        }}
      />
    </View>
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

export default ConvosScreen;
