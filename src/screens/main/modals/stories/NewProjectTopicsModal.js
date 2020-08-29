import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import TopicsList from 'library/components/lists/TopicsList';

import TextButton from 'library/components/UI/buttons/TextButton';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';

const NewProjectTopicsModal = ({ navigation, route }) => {
  const { handleProjectCreate, projectTitle } = route.params;

  const [selectedCategories, setSelectedCategories] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  console.log(selectedTopic);

  const handleDone = () => {
    handleProjectCreate(projectTitle, selectedTopic);
    navigation.navigate('PostToModal');
  };

  const handleTopicSelect = (selectedTopicID, _) => {
    if (selectedTopicID === selectedTopic) {
      // remove it
      setSelectedTopic('');
    } else {
      // add it
      setSelectedTopic(selectedTopicID);
    }
  };

  const handleCategorySelect = (category) => {
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
    <View style={styles.container}>
      <HeaderBackBlank
        navigation={navigation}
        rightComponent={
          !selectedTopic ? (
            <TextButton textStyle={styles.rightText} onPress={handleDone}>
              Skip
            </TextButton>
          ) : (
            <ButtonHeader onPress={handleDone}>Done</ButtonHeader>
          )
        }
      />

      <ScrollView style contentContainerStyle={styles.scrollView}>
        <View style={{ width: '100%', paddingHorizontal: 5 }}>
          <View style={styles.mainTitle}>
            <Text style={defaultStyles.headerMedium}>Tag a topic</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={defaultStyles.defaultMute}>Your story will get more views if you tag a relevant topic</Text>
          </View>
        </View>
        <TopicsList
          activeTopicIDs={[selectedTopic]}
          selectedCategories={selectedCategories}
          handleTopicSelect={handleTopicSelect}
          handleCategorySelect={handleCategorySelect}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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

export default NewProjectTopicsModal;
