import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import TopicsList from 'library/components/lists/TopicsList';
import InvestList from 'library/components/lists/InvestList';
import FreelanceList from 'library/components/lists/FreelanceList';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const SelectSearchTopicsModal = ({ navigation }) => {
  // PARAMS
  const goal = navigation.getParam('goal');
  const setTopic = navigation.getParam('setTopic');

  // STATE
  const [selectedCategories, setSelectedCategories] = useState('');
  const [activeTopic, setActiveTopic] = useState('');

  // CONSTANTS
  const heading = 'Select a topic to search';

  const handleTopicSelect = selectedTopicID => {
    // if there is a goal - select one topic only
    setActiveTopic(selectedTopicID);
    setTopic(selectedTopicID);

    // navigate back after a short delay
    const timeout = setTimeout(() => navigation.goBack(), 300);
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

  const renderList = () => {
    if (goal.modalType === 'specialist') {
      return (
        <FreelanceList
          activeTopicIDs={[activeTopic]}
          selectedCategories={selectedCategories}
          handleTopicSelect={handleTopicSelect}
          handleCategorySelect={handleCategorySelect}
        />
      );
    }

    if (goal.modalType === 'invest') {
      return <InvestList activeTopicIDs={[activeTopic]} handleTopicSelect={handleTopicSelect} />;
    }

    return (
      <TopicsList
        activeTopicIDs={[activeTopic]}
        selectedCategories={selectedCategories}
        handleTopicSelect={handleTopicSelect}
        handleCategorySelect={handleCategorySelect}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <HeaderBackBlank
          navigation={navigation}
          rightComponent={<Icon name="question-circle" size={22} color={colors.iconDark} />}
        />

        <ScrollView style contentContainerStyle={styles.scrollView}>
          <View style={{ width: '100%', paddingHorizontal: 5 }}>
            <View style={styles.mainTitle}>
              <Text style={defaultStyles.headerMedium}>{heading}</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={defaultStyles.defaultMute}>Your will only see search results from this topic</Text>
            </View>
          </View>
          {renderList()}
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectSearchTopicsModal;

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
