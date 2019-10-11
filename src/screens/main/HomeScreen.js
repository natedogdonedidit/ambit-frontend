import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, TouchableOpacity, RefreshControl } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HeaderHome from 'library/components/headers/HeaderHome';
import Error from 'library/components/UI/Error';
import PersonalTimeline from 'library/components/timelines/PersonalTimeline';
import GlobalTimeline from 'library/components/timelines/GlobalTimeline';
import LocalTimeline from 'library/components/timelines/LocalTimeline';
import TimelineTabs from 'library/components/timelines/TimelineTabs';

const HomeScreen = ({ navigation }) => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  // const [newPostModalVisible, setNewPostModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [requestRefresh, setRequestRefresh] = useState(false);

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  const { userLoggedIn } = dataUser;

  const onRefresh = () => {
    setRequestRefresh(true);
    setRefreshing(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <HeaderHome
        user={userLoggedIn}
        handleMiddle={() => null}
        handleRight={() => navigation.navigate('CustomSearch')}
        navigation={navigation}
      />
      <TimelineTabs tabState={activeTimeline} setTabState={setActiveTimeline} />

      <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {activeTimeline === 0 && (
          <GlobalTimeline
            requestRefresh={requestRefresh}
            setRequestRefresh={setRequestRefresh}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            navigation={navigation}
          />
        )}
        {activeTimeline === 1 && (
          <LocalTimeline
            requestRefresh={requestRefresh}
            setRequestRefresh={setRequestRefresh}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            userLoggedIn={userLoggedIn}
            navigation={navigation}
          />
        )}
        {activeTimeline === 2 && (
          <PersonalTimeline
            requestRefresh={requestRefresh}
            setRequestRefresh={setRequestRefresh}
            refreshing={refreshing}
            setRefreshing={setRefreshing}
            navigation={navigation}
          />
        )}
      </ScrollView>

      <TouchableOpacity onPress={() => navigation.navigate('NewPostModal', { userLoggedIn })}>
        <View style={{ ...styles.newPostButton, ...defaultStyles.shadowButton }}>
          <Icon name="pen" size={18} color="white" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightLightGray,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.lightGray,
  },
  newPostButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    width: 54,
    height: 54,
    borderRadius: 27,
  },
});

export default HomeScreen;
