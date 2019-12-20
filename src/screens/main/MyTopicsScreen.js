import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HeaderBack from 'library/components/headers/HeaderBack';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

import EDIT_TOPICS_FOCUS_MUTATION from 'library/mutations/EDIT_TOPICS_FOCUS_MUTATION';
import EDIT_TOPICS_INTEREST_MUTATION from 'library/mutations/EDIT_TOPICS_INTEREST_MUTATION';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const MyTopicsScreen = ({ navigation }) => {
  // ////////////////////////////////////////
  // ROUTE PARAMS
  const userPassedIn = navigation.getParam('userLoggedIn');

  // ////////////////////////////////////////
  // QUERIES
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { userLoggedIn } = data;
  // this is the single source of truth
  const { id, topicsFocus, topicsInterest } = userLoggedIn;

  // ////////////////////////////////////////
  // MUTATIONS
  const [editTopicsFocus, { loading: loadingEdit1, error: errorEdit1, data: dataEdit1 }] = useMutation(
    EDIT_TOPICS_FOCUS_MUTATION,
    {
      onError: () =>
        Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]),
    }
  );
  const [editTopicsInterest, { loading: loadingEdit2, error: errorEdit2, data: dataEdit2 }] = useMutation(
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
  const handleTopicFocusSelect = selectedTopic => {
    // build the new array of topics
    let newArray = [];
    if (topicsFocus.includes(selectedTopic)) {
      // remove it
      newArray = topicsFocus.filter(field => field !== selectedTopic);
    } else {
      // add it
      newArray = [...topicsFocus, selectedTopic];
    }

    // run the mutation
    editTopicsFocus({
      variables: {
        id,
        topics: newArray,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editTopicsFocus: {
          __typename: 'User',
          ...userLoggedIn,
          topicsFocus: newArray,
        },
      },
      update: (proxy, { data: dataReturned }) => {
        proxy.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            userLoggedIn: dataReturned.editTopicsFocus,
          },
        });
      },
    });
  };

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
  const renderTopicsOfFocus = () => {
    return topicsFocus.map(topic => {
      const isSelected = topicsFocus.includes(topic);

      return (
        <TouchableOpacity key={topic} activeOpacity={0.7} onPress={() => handleTopicFocusSelect(topic)}>
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
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="My Topics" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.section}>
          <Text style={{ ...defaultStyles.headerMedium, paddingBottom: 10 }}>Topics of focus</Text>
          <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center', paddingBottom: 20 }}>
            These are topics you are focused on building{'\n'}your career goals around (3 max)
          </Text>
          {topicsFocus.length > 0 && <View style={styles.topicsSection}>{renderTopicsOfFocus()}</View>}
          <ButtonDefault onPress={() => navigation.navigate('SelectTopicsFocusModal')}>Add some topics</ButtonDefault>
        </View>
        <View style={styles.section}>
          <Text style={{ ...defaultStyles.headerMedium, paddingBottom: 10 }}>Topics of interest</Text>
          <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center', paddingBottom: 20 }}>
            These are topics you enjoy following and{'\n'}reading about
          </Text>
          {topicsInterest.length > 0 && <View style={styles.topicsSection}>{renderTopicsOfInterest()}</View>}
          <ButtonDefault onPress={() => navigation.navigate('SelectTopicsInterestModal')}>Add some topics</ButtonDefault>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
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

export default MyTopicsScreen;
