import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import { useMutation } from '@apollo/client';
import TopicsList from 'library/components/lists/TopicsList';

import EDIT_TOPICS_MUTATION from 'library/mutations/EDIT_TOPICS_MUTATION';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/buttons/TextButton';

const OnboardingTopics = ({ navigation, route }) => {
  const { username } = route.params;

  const [selectedCategories, setSelectedCategories] = useState('');
  const [activeTopics, setActiveTopics] = useState([]);

  const activeTopicsIDonly = activeTopics.map((topic) => topic.topicID);

  // MUTATION
  const [updateOneUser] = useMutation(EDIT_TOPICS_MUTATION);

  const handleNext = async () => {
    navigation.navigate('OnboardingFreelance1', { username });

    // upload profile pic if they selected one
    if (activeTopics.length > 0) {
      const topicsForMutation = activeTopics.map(({ topicID }) => {
        return { id: topicID };
      });

      try {
        updateOneUser({
          variables: {
            where: { username },
            data: {
              topicsFocus: {
                connect: topicsForMutation,
              },
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleTopicSelect = (selectedTopicID) => {
    // build the new array of topics
    let newArray = [...activeTopics];
    if (activeTopicsIDonly.includes(selectedTopicID)) {
      // remove it
      newArray = activeTopics.filter(({ topicID }) => topicID !== selectedTopicID);
    } else {
      // add it
      newArray = [...activeTopics, { topicID: selectedTopicID }];
    }

    setActiveTopics(newArray);
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
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={{ ...defaultStyles.ambitLogoSmall }}>ambit</Text>
        </View>
        <View style={styles.titleSection}>
          <Text style={{ ...defaultStyles.headerMedium, textAlign: 'center' }}>What are you interested in?</Text>
          <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center', paddingTop: 10, paddingHorizontal: 20 }}>
            Select some topics to customize your Ambit experience
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 10 }}>
          <TopicsList activeTopicIDs={activeTopicsIDonly} handleTopicSelect={handleTopicSelect} showFollowButton />
        </ScrollView>

        <View style={styles.bottom}>
          {/* <TextButton onPress={() => navigation.navigate('OnboardingFreelance1', { username })}>Skip</TextButton> */}
          <View />
          <ButtonDefault buttonStyle={styles.buttonStyle} onPress={handleNext}>
            Next
          </ButtonDefault>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  titleSection: {
    marginTop: 15,
    alignItems: 'center',
    paddingBottom: 15,
    // backgroundColor: 'pink',
  },
  scrollView: {
    flex: 1,
    // backgroundColor: 'blue',
    // padding: 20,
  },
  bottom: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingRight: 8,
    paddingLeft: 14,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.lightLightGray,
    marginTop: 15,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.7)',
    ...defaultStyles.shadow3,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 35,
    overflow: 'hidden',
  },
  buttonStyle: {
    paddingHorizontal: 14,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBlack,
    marginVertical: 13,
    paddingBottom: 4,
    ...defaultStyles.hugeRegular,
    fontSize: 18,
  },
});

export default OnboardingTopics;
