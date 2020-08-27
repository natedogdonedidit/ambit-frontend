import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import TopicsList from 'library/components/lists/TopicsList';

import EDIT_TOPICS_MUTATION from 'library/mutations/EDIT_TOPICS_MUTATION';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

const SelectTopicsFocusModal = ({ navigation }) => {
  const client = useApolloClient();

  const [selectedCategories, setSelectedCategories] = useState('');

  // ////////////////////////////////////////
  // MUTATIONS
  const [updateOneUser] = useMutation(EDIT_TOPICS_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // ////////////////////////////////////////
  // QUERIES
  const { loading, error, data } = useQuery(CURRENT_USER_TOPICS);
  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { userLoggedIn: myTopics } = data;
  // this is the single source of truth
  const { topicsFocus: topics } = myTopics;
  const topicsIDonly = useMemo(() => {
    return topics.map((topic) => topic.id);
  }, [topics]);

  // ////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleTopicSelect = (selectedTopicID) => {
    requestAnimationFrame(() => {
      // for mutation
      const dataObject = {};

      // build the new array of topics
      let newArray = [];
      if (topicsIDonly.includes(selectedTopicID)) {
        // remove it
        newArray = topics.filter((topic) => topic.id !== selectedTopicID);
        dataObject.disconnect = [{ id: selectedTopicID }];
      } else {
        // add it
        newArray = [...topicsIDonly, selectedTopicID];
        dataObject.connect = [{ id: selectedTopicID }];
      }

      // for optimistic response
      const newArrayTopicIDandType = newArray.map((topic) => {
        return { id: topic, __typename: 'Topic' };
      });

      // run the mutation
      updateOneUser({
        variables: {
          where: { id: myTopics.id }, // userLoggedIn
          data: {
            topicsFocus: dataObject,
          },
        },
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   editTopicsFocus: {
        //     __typename: 'User',
        //     topicsFocus: [...newArrayTopicIDandType],
        //   },
        // },
        // update: (proxy, { data: dataReturned }) => {
        //   const dataCache = client.readQuery({ query: CURRENT_USER_TOPICS });

        //   client.writeQuery({
        //     query: CURRENT_USER_TOPICS,
        //     data: {
        //       myTopics: {
        //         ...dataCache.myTopics,
        //         topicsFocus: [...dataReturned.editTopicsFocus.topicsFocus],
        //       },
        //     },
        //   });
        // },
      });
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
              <Text style={defaultStyles.headerMedium}>Select your topics{`\n`}of focus</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={defaultStyles.defaultMute}>
                We will use this data to show you interesting posts and help you grow your network
              </Text>
            </View>
          </View>
          <TopicsList
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

export default SelectTopicsFocusModal;

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
