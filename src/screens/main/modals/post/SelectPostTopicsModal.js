import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
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
  const { setTopics, setSubField, topicsPassedIn = [] } = route.params;

  // STATE
  const [selectedCategories, setSelectedCategories] = useState('');
  const [activeTopics, setActiveTopics] = useState(topicsPassedIn);
  const [warning, setWarning] = useState('');

  // CONSTANTS
  let { heading } = goal;
  const activeTopicsIDonly = activeTopics.map(topic => topic.topicID);

  // if its a non topic goal
  if (goal.modalType !== 'topic') {
    heading = 'Select a topic';
  }

  // if no goal was passed in
  const multiple = goal.modalType === 'none';
  if (multiple) {
    heading = 'Select some topics';
  }

  const handleTopicSelect = selectedTopicID => {
    // build an array of active topics with topicID only - for comparision reasons

    // if there is NOT a goal passed in, then multiple selections are allowed
    if (multiple) {
      // build the new array of topics
      let newArray = [...activeTopics];
      if (activeTopicsIDonly.includes(selectedTopicID)) {
        // remove it
        newArray = activeTopics.filter(topic => topic.topicID !== selectedTopicID);
        if (warning) setWarning('');
      } else if (newArray.length < TOPIC_LIMIT) {
        // add it
        newArray = [...activeTopics, { topicID: selectedTopicID }];
      } else {
        setWarning('3 topics max');
      }

      setActiveTopics(newArray);
      setTopics(newArray);
      console.log(newArray);
    } else {
      // if there is a goal - select one topic only
      setActiveTopics([{ topicID: selectedTopicID }]);
      setTopics([{ topicID: selectedTopicID }]);

      if (goal.modalType === 'topic') {
        setSubField(selectedTopicID);
      }

      // navigate back after a short delay
      const timeout = setTimeout(() => navigation.navigate('NewPostModal'), 300);
    }
  };

  const handleCategorySelect = category => {
    if (selectedCategories.includes(category)) {
      const index = selectedCategories.indexOf(category);
      if (index > -1) {
        const newArray = [...selectedCategories];
        newArray.splice(index, 1);
        setSelectedCategories(newArray);
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <HeaderBackBlank
          navigation={navigation}
          title={warning}
          rightComponent={<Icon name="question-circle" size={22} color={colors.iconDark} />}
          leftText="Done"
        />

        <ScrollView style contentContainerStyle={styles.scrollView}>
          <View style={{ width: '100%', paddingHorizontal: 5 }}>
            <View style={styles.mainTitle}>
              <Text style={defaultStyles.headerMedium}>{heading}</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={defaultStyles.defaultMute}>
                {multiple
                  ? `Your post will appear on these\ntopic timelines (3 max)`
                  : `Your post will also appear on this\ntopic timeline`}
              </Text>
            </View>
          </View>
          <TopicsList
            activeTopicIDs={activeTopicsIDonly}
            selectedCategories={selectedCategories}
            handleTopicSelect={handleTopicSelect}
            handleCategorySelect={handleCategorySelect}
          />
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
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  mainTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  subTitle: {
    width: '100%',
    paddingBottom: 20,
  },
});
