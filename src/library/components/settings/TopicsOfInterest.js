import React from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

import EDIT_TOPICS_INTEREST_MUTATION from 'library/mutations/EDIT_TOPICS_INTEREST_MUTATION';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const TopicsOfInterest = ({ navigation, userLoggedIn }) => {
  const { id, topicsInterest } = userLoggedIn;
  // ////////////////////////////////////////
  // MUTATIONS
  const [editTopicsInterest, { loading: loadingEdit, error: errorEdit, data: dataEdit }] = useMutation(
    EDIT_TOPICS_INTEREST_MUTATION,
    {
      onError: () =>
        Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]),
    }
  );

  // //////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleTopicInterestSelect = selectedTopic => {
    // build the new array of topics
    let newArray = [];
    if (topicsInterest.includes(selectedTopic)) {
      // remove it
      newArray = topicsInterest.filter(field => field !== selectedTopic);
    } else {
      // add it
      newArray = [...topicsInterest, selectedTopic];
    }

    // run the mutation
    editTopicsInterest({
      variables: {
        id,
        topics: newArray,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editTopicsInterest: {
          __typename: 'User',
          ...userLoggedIn,
          topicsInterest: newArray,
        },
      },
      update: (proxy, { data: dataReturned }) => {
        proxy.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            userLoggedIn: dataReturned.editTopicsInterest,
          },
        });
      },
    });
  };

  // //////////////////////////////////////////////////////
  // RENDER FUNCTIONS
  const renderTopicsOfInterest = () => {
    return topicsInterest.map(topic => {
      const isSelected = topicsInterest.includes(topic);

      return (
        <TouchableOpacity key={topic} activeOpacity={0.7} onPress={() => handleTopicInterestSelect(topic)}>
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
                <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
              </View>
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
      {topicsInterest.length > 0 && <View style={styles.topicsSection}>{renderTopicsOfInterest()}</View>}
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
