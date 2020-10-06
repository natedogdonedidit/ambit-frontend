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

const TopicsOfMentor = ({ navigation, myTopics, showX }) => {
  const client = useApolloClient();

  const { topicsMentor: topics } = myTopics;

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
            topicsMentor: dataObject,
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
  const renderAddButton = (id, isSelected) => {
    if (isSelected) {
      if (showX) {
        return (
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(id)}>
            <Ionicons name="md-close" size={20} color={colors.iconGray} />
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(id)}>
          <View style={styles.addedButton}>
            <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(id)}>
        <View style={styles.addButton}>
          <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
        </View>
      </TouchableOpacity>
    );
  };

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
            {renderAddButton(id, isSelected)}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.section}>
      <Text style={{ ...defaultStyles.headerHat, textAlign: 'center', paddingBottom: 10 }}>Are you open to mentor?</Text>
      <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center', paddingBottom: 20 }}>
        Select your areas of expertise and we will suggest you as a potential mentor for other users
      </Text>
      {topics.length > 0 && <View style={styles.topicsSection}>{renderTopics()}</View>}
      <ButtonDefault
        buttonStyle={{ backgroundColor: colors.purp }}
        onPress={() => navigation.navigate('SelectTopicsMentorModal')}
      >
        Add some topics
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
    borderColor: colors.purp,
    opacity: 0.9,
  },
  addedButton: {
    height: 32,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.purp,
  },
});

export default TopicsOfMentor;
