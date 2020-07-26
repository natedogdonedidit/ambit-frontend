import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import FreelanceList from 'library/components/lists/FreelanceList';

import EDIT_TOPICS_FREELANCE_MUTATION from 'library/mutations/EDIT_TOPICS_FREELANCE_MUTATION';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

const SelectTopicsFreelanceModal = ({ navigation }) => {
  const client = useApolloClient()

  const [selectedCategories, setSelectedCategories] = useState('');

  // ////////////////////////////////////////
  // QUERIES
  const { loading, error, data } = useQuery(CURRENT_USER_TOPICS);
  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { myTopics } = data;
  // this is the single source of truth
  const { topicsFreelance: topics } = myTopics;
  const topicsIDonly = topics.map((topic) => topic.topicID);

  // ////////////////////////////////////////
  // MUTATIONS
  const [editTopicsFreelance] = useMutation(EDIT_TOPICS_FREELANCE_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // ////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleTopicSelect = (selectedTopicID, selectedTopicName) => {
    // build the new array of topics
    let newArray = [];
    if (topicsIDonly.includes(selectedTopicID)) {
      // remove it
      newArray = topics.filter((topic) => topic.topicID !== selectedTopicID);
    } else {
      // add it
      newArray = [...topics, { topicID: selectedTopicID, name: selectedTopicName }];
    }

    // for mutation
    const newArrayTopicIDonly = newArray.map((topic) => {
      return { topicID: topic.topicID };
    });

    // for optimistic response
    const newArrayTopicIDandType = newArray.map((topic) => {
      return { id: topic.topicID, topicID: topic.topicID, name: topic.name, __typename: 'Topic' };
    });

    // run the mutation
    editTopicsFreelance({
      variables: {
        topics: newArrayTopicIDonly,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editTopicsFreelance: {
          __typename: 'User',
          ...myTopics,
          topicsFreelance: newArrayTopicIDandType,
        },
      },
      update: (proxy, { data: dataReturned }) => {
        // console.log('dataReturned', dataReturned.editTopicsFreelance);
        // const data = proxy.readQuery({ query: CURRENT_USER_QUERY });

        client.writeQuery({
          query: CURRENT_USER_TOPICS,
          data: {
            myTopics: dataReturned.editTopicsFreelance,
          },
        });
      },
    });
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <HeaderBackBlank
          navigation={navigation}
          rightComponent={<Icon name="question-circle" size={22} color={colors.iconDark} />}
        />

        <ScrollView style contentContainerStyle={styles.scrollView}>
          <View style={{ width: '100%', paddingHorizontal: 5 }}>
            <View style={styles.mainTitle}>
              <Text style={defaultStyles.headerMedium}>Select your freelance specialties</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={defaultStyles.defaultMute}>We will send you freelance opporunities in these areas</Text>
            </View>
          </View>
          <FreelanceList
            activeTopicIDs={topicsIDonly}
            selectedCategories={selectedCategories}
            handleTopicSelect={handleTopicSelect}
            handleCategorySelect={handleCategorySelect}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectTopicsFreelanceModal;

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
