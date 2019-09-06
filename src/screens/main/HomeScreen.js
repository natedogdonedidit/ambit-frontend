import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';

import HeaderHome from 'library/components/headers/HeaderHome';
import HeaderBackground from 'library/components/headers/HeaderBackground';
import NewPostModal from 'library/components/modals/NewPostModal';
import Loader from 'library/components/UI/Loader';
import GlobalTimeline from 'library/components/GlobalTimeline';

const HomeScreen = props => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [newPostModalVisible, setNewPostModalVisible] = useState(false);

  // navigation
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderBackground />
      <HeaderHome
        navigation={navigation}
        activeTimeline={activeTimeline}
        setActiveTimeline={setActiveTimeline}
        setNewPostModalVisible={setNewPostModalVisible}
      />

      {activeTimeline === 0 && <GlobalTimeline />}
      {activeTimeline === 1 && <GlobalTimeline />}
      {activeTimeline === 2 && <GlobalTimeline />}

      <NewPostModal newPostModalVisible={newPostModalVisible} setNewPostModalVisible={setNewPostModalVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
});

export default HomeScreen;
