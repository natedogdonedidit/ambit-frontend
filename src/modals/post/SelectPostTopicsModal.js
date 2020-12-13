import React, { useState, useMemo } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput } from 'react-native';

import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import TopicsList from 'library/components/lists/TopicsList';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TOPIC_LIMIT = 3;

const SelectPostTopicsModal = ({ navigation, route }) => {
  // PARAMS
  const {
    goal = {
      heading: '',
      icon: '',
      primaryColor: colors.blue,
      secondaryColor: colors.blue,
      modalType: 'none',
    },
  } = route.params;
  const { setTopic, setSubField, topicsPassedIn = [] } = route.params;

  // STATE
  const [activeTopics, setActiveTopics] = useState(topicsPassedIn);

  // CONSTANTS
  let { heading } = goal;
  const activeTopicsIDonly = activeTopics.map((topic) => topic.topicID);

  // if its a non topic goal
  if (goal.modalType !== 'topic') {
    heading = 'Select a topic';
  }

  const handleTopicSelect = (selectedTopicID) => {
    // build an array of active topics with topicID only - for comparision reasons

    // if there is NOT a goal passed in, then multiple selections are allowed
    // if there is a goal - select one topic only
    setActiveTopics([{ topicID: selectedTopicID }]);
    setTopic(selectedTopicID);

    if (goal.modalType === 'topic') {
      setSubField(selectedTopicID);
    }

    // navigate back after a short delay
    const timeout = setTimeout(() => navigation.navigate('NewPostModal'), 300);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <HeaderBackBlank navigation={navigation} />
        <ScrollView style contentContainerStyle={styles.scrollView}>
          <View style={{ width: '100%', paddingHorizontal: 5 }}>
            <View style={styles.mainTitle}>
              <Text style={{ ...defaultStyles.headerMedium, textAlign: 'center' }}>{heading}</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center' }}>
                Your post will also appear on this topic timeline
              </Text>
            </View>
          </View>
          <TopicsList activeTopicIDs={activeTopicsIDonly} handleTopicSelect={handleTopicSelect} />
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectPostTopicsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 20,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  mainTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 13,
  },
  subTitle: {
    width: '100%',
    paddingBottom: 20,
  },
});
