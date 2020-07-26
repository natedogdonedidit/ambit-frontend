import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { useMutation, useApolloClient } from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

import EDIT_TOPICS_INTEREST_MUTATION from 'library/mutations/EDIT_TOPICS_INTEREST_MUTATION';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

const TopicsOfInterest = ({ navigation, myTopics }) => {
  const { topicsFocus, topicsInterest: topics, topicsFreelance, topicsInvest, topicsMentor } = myTopics;

  const topicsIDonly = topics.map((topic) => topic.topicID);

  const client = useApolloClient();

  // ////////////////////////////////////////
  // MUTATIONS
  const [editTopicsInterest] = useMutation(EDIT_TOPICS_INTEREST_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // //////////////////////////////////////////////////////
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
    editTopicsInterest({
      variables: {
        topics: newArrayTopicIDonly,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editTopicsInterest: {
          __typename: 'User',
          ...myTopics,
          topicsInterest: newArrayTopicIDandType,
        },
      },
      update: (proxy, { data: dataReturned }) => {
        // console.log('dataReturned', dataReturned.editTopicsInterest);
        // const data = proxy.readQuery({ query: CURRENT_USER_QUERY });

        client.writeQuery({
          query: CURRENT_USER_TOPICS,
          data: {
            myTopics: dataReturned.editTopicsInterest,
          },
        });
      },
    });
  };

  // //////////////////////////////////////////////////////
  // RENDER FUNCTIONS
  const renderTopics = () => {
    return topics.map(({ topicID, name }) => {
      const isSelected = topicsIDonly.includes(topicID);

      return (
        <TouchableOpacity key={topicID} activeOpacity={1} onPress={() => handleTopicSelect(topicID, name)}>
          <View style={{ ...styles.topicRow }}>
            <Ionicons name="ios-chatbubbles" size={22} color={colors.blueGray} />

            <Text style={{ ...defaultStyles.largeMedium, color: colors.darkGray, paddingLeft: 10, paddingRight: 15, flex: 1 }}>
              {name}
            </Text>
            {isSelected ? (
              <TouchableOpacity key={topicID} activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
                <View style={styles.addedButton}>
                  <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity key={topicID} activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
                <View style={styles.addButton}>
                  <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.section}>
      <Text style={{ ...defaultStyles.headerMedium, paddingBottom: 10 }}>Topics of interest</Text>
      <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center', paddingBottom: 20 }}>
        These are topics you enjoy following and{'\n'}reading about
      </Text>
      {topics.length > 0 && <View style={styles.topicsSection}>{renderTopics()}</View>}
      <ButtonDefault onPress={() => navigation.navigate('SelectTopicsInterestModal')}>Add some topics</ButtonDefault>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  topicsSection: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    marginBottom: 30,
  },
  topicRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  // add button
  addButton: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.purp,
    opacity: 0.9,
  },
  addedButton: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.purp,
  },
});

export default TopicsOfInterest;
