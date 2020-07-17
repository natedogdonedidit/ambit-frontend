import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import TopicsList from 'library/components/lists/TopicsList';

import Loader from 'library/components/UI/Loader';
import HeaderBack from 'library/components/headers/HeaderBack';
import TextButton from 'library/components/UI/buttons/TextButton';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';

const NewProjectTopicsModal = ({ navigation, route }) => {
  const { handleProjectCreate, projectTitle } = route.params;

  const [selectedCategories, setSelectedCategories] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleDone = () => {
    handleProjectCreate(projectTitle, selectedTopics);
    navigation.navigate('PostToModal');
  };

  const handleTopicSelect = (selectedTopicID) => {
    // build the new array of topics
    let newArray = [...selectedTopics];
    if (newArray.includes(selectedTopicID)) {
      // remove it
      newArray = newArray.filter((topicID) => topicID !== selectedTopicID);
    } else {
      // add it
      newArray = [...selectedTopics, selectedTopicID];
    }

    setSelectedTopics(newArray);
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
          selectedTopics.length < 1 ? (
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
            <Text style={defaultStyles.headerMedium}>Tag some topics</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={defaultStyles.defaultMute}>Your story will get more views if you tag some relevant topics</Text>
          </View>
        </View>
        <TopicsList
          activeTopicIDs={selectedTopics}
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
