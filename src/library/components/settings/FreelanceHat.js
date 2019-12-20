import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

import EDIT_TOPICS_FREELANCE_MUTATION from 'library/mutations/EDIT_TOPICS_FREELANCE_MUTATION';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const FreelanceHat = ({ navigation, userLoggedIn }) => {
  const { id, freelanceFields } = userLoggedIn;
  // ////////////////////////////////////////
  // MUTATIONS
  const [editTopicsFreelance, { loading: loadingEdit, error: errorEdit, data: dataEdit }] = useMutation(
    EDIT_TOPICS_FREELANCE_MUTATION,
    {
      onError: () =>
        Alert.alert('Oh no!', 'An error occured when trying to edit your freelance topics. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]),
    }
  );

  // //////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleTopicSelect = selectedTopic => {
    // build the new array of topics
    let newArray = [];
    if (freelanceFields.includes(selectedTopic)) {
      // remove it
      newArray = freelanceFields.filter(field => field !== selectedTopic);
    } else {
      // add it
      newArray = [...freelanceFields, selectedTopic];
    }

    // run the mutation
    editTopicsFreelance({
      variables: {
        id,
        topics: newArray,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editTopicsFreelance: {
          __typename: 'User',
          ...userLoggedIn,
          freelanceFields: newArray,
        },
      },
      update: (proxy, { data: dataReturned }) => {
        proxy.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            userLoggedIn: dataReturned.editTopicsFreelance,
          },
        });
      },
    });
  };

  // //////////////////////////////////////////////////////
  // RENDER FUNCTIONS
  const renderTopics = () => {
    return freelanceFields.map(topic => {
      const isSelected = freelanceFields.includes(topic);

      return (
        <TouchableOpacity key={topic} activeOpacity={0.7} onPress={() => handleTopicSelect(topic)}>
          <View style={{ ...styles.topicRow }}>
            <Ionicons name="ios-chatbubbles" size={22} color={colors.blueGray} />

            <Text style={{ ...defaultStyles.largeMedium, color: colors.darkGray, paddingLeft: 10, paddingRight: 15, flex: 1 }}>
              {topic}
            </Text>
            {isSelected ? (
              <View style={styles.addedButton}>
                <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
              </View>
            ) : (
              <View style={styles.addButton}>
                <Text style={{ ...defaultStyles.defaultMedium, color: colors.peach }}>Add</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.section}>
      <Text style={{ ...defaultStyles.headerHat, textAlign: 'center', paddingBottom: 10 }}>Are you a freelancer?</Text>
      <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center', paddingBottom: 20 }}>
        Select your specialties and we will send you freelance opporunities from other users
      </Text>
      {freelanceFields.length > 0 && <View style={styles.topicsSection}>{renderTopics()}</View>}
      <ButtonDefault
        buttonStyle={{ backgroundColor: colors.peach }}
        onPress={() => navigation.navigate('SelectTopicsFreelanceModal')}
      >
        Add specialities
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
    borderColor: colors.peach,
    opacity: 0.9,
  },
  addedButton: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.peach,
  },
});

export default FreelanceHat;
