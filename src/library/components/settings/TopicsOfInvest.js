import React, { useMemo } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { useMutation, useApolloClient } from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

import EDIT_TOPICS_MUTATION from 'library/mutations/EDIT_TOPICS_MUTATION';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import { getTopicFromID } from 'library/utils';

const TopicsOfInvest = ({ navigation, myTopics }) => {
  const client = useApolloClient();

  const { topicsInvest: topics } = myTopics;

  const topicsIDonly = useMemo(() => {
    return topics.map((topic) => topic.id);
  }, [topics]);

  // ////////////////////////////////////////
  // MUTATIONS
  const [updateOneUser] = useMutation(EDIT_TOPICS_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // //////////////////////////////////////////////////////
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
            topicsInvest: dataObject,
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

  // //////////////////////////////////////////////////////
  // RENDER FUNCTIONS
  const renderTopics = () => {
    return topics.map(({ id }) => {
      const isSelected = topicsIDonly.includes(id);
      const { name } = getTopicFromID(id);

      return (
        <TouchableOpacity key={id} activeOpacity={1} onPress={() => handleTopicSelect(id)}>
          <View style={{ ...styles.topicRow }}>
            <Ionicons name="ios-chatbubbles" size={22} color={colors.blueGray} />

            <Text style={{ ...defaultStyles.largeMedium, color: colors.darkGray, paddingLeft: 10, paddingRight: 15, flex: 1 }}>
              {name}
            </Text>
            {isSelected ? (
              <TouchableOpacity key={id} activeOpacity={0.7} onPress={() => handleTopicSelect(id)}>
                <View style={styles.addedButton}>
                  <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity key={id} activeOpacity={0.7} onPress={() => handleTopicSelect(id)}>
                <View style={styles.addButton}>
                  <Text style={{ ...defaultStyles.defaultMedium, color: colors.green }}>Add</Text>
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
      <Text style={{ ...defaultStyles.headerHat, textAlign: 'center', paddingBottom: 10 }}>Are you an investor?</Text>
      <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center', paddingBottom: 20 }}>
        Select your target markets and we will send you investment opportunities from other users
      </Text>
      {topics.length > 0 && <View style={styles.topicsSection}>{renderTopics()}</View>}
      <ButtonDefault
        buttonStyle={{ backgroundColor: colors.green }}
        onPress={() => navigation.navigate('SelectTopicsInvestModal')}
      >
        Add target markets
      </ButtonDefault>
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
    height: 32,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.green,
    opacity: 0.9,
  },
  addedButton: {
    height: 32,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.green,
  },
});

export default TopicsOfInvest;
