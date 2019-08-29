import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';

import HeaderHome from 'library/components/headers/HeaderHome';
import HeaderBackground from 'library/components/headers/HeaderBackground';
import NewPostModal from 'library/components/modals/NewPostModal';

const HomeScreen = props => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [newPostModalVisible, setNewPostModalVisible] = useState(false);

  // navigation
  const { navigation } = props;

  const { currentUserId } = useContext(UserContext);

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
      <ScrollView style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%' }}>Timeline</Text>
      </ScrollView>
      <NewPostModal
        newPostModalVisible={newPostModalVisible}
        setNewPostModalVisible={setNewPostModalVisible}
        owner={currentUserId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  timeline: {
    backgroundColor: 'white',
    height: 500,
    paddingTop: 30,
  },
});

export default HomeScreen;
