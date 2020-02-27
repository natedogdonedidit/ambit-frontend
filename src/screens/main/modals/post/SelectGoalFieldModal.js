import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import TopicsList from 'library/components/lists/TopicsList';
import InvestList from 'library/components/lists/InvestList';
import FreelanceList from 'library/components/lists/FreelanceList';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const SelectGoalFieldModal = ({ navigation, route }) => {
  const { goal, setGoal, setTopics, setSubField } = route.params;

  // STATE
  const [selectedCategories, setSelectedCategories] = useState('');
  const [activeSubfield, setActiveSubfield] = useState('');
  const [warning, setWarning] = useState('');

  if (!goal) navigation.navigate('NewPostModal');

  const handleTopicSelect = selectedTopicID => {
    setGoal(goal);
    setSubField(selectedTopicID);
    setActiveSubfield(selectedTopicID);

    // if its a topic type goal - then set topic also
    if (goal.modalType === 'topic') {
      // if its a topic type goal - then set topic also
      setTopics([{ topicID: selectedTopicID }]);
    } else {
      // if its NOT topic type goal - clear out previous selected topics
      setTopics([]);
    }

    // navigate back after a short delay
    const timeout = setTimeout(() => navigation.navigate('NewPostModal'), 300);
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
          activeTopicIDs={[activeSubfield]}
          selectedCategories={selectedCategories}
          handleTopicSelect={handleTopicSelect}
          handleCategorySelect={handleCategorySelect}
        />
      );
    }

    if (goal.modalType === 'invest') {
      return <InvestList activeTopicIDs={[activeSubfield]} handleTopicSelect={handleTopicSelect} />;
    }

    return (
      <TopicsList
        activeTopicIDs={[activeSubfield]}
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
          title={warning}
          rightComponent={<Icon name="question-circle" size={22} color={colors.iconDark} />}
        />

        <ScrollView style contentContainerStyle={styles.scrollView}>
          <View style={{ width: '100%', paddingHorizontal: 5 }}>
            <View style={styles.mainTitle}>
              <Text style={defaultStyles.headerMedium}>{goal.heading}</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={defaultStyles.defaultMute}>This info will be used to connect you with the right people</Text>
            </View>
          </View>
          {renderList()}
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectGoalFieldModal;

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
