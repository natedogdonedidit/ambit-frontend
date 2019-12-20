import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import HeaderBack from 'library/components/headers/HeaderBack';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import FreelanceHat from 'library/components/settings/FreelanceHat';
import InvestorHat from 'library/components/settings/InvestorHat';
import MentorHat from 'library/components/settings/MentorHat';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const MyHatsScreen = ({ navigation }) => {
  // ////////////////////////////////////////
  // ROUTE PARAMS
  // const userPassedIn = navigation.getParam('userLoggedIn');

  // ////////////////////////////////////////
  // QUERIES
  // this is the single source of truth
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading)
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title="My Hats" />
        <Loader loading={loading} />
      </View>
    );
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { userLoggedIn } = data;

  // ////////////////////////////////////////
  // MUTATIONS

  // //////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS

  // //////////////////////////////////////////////////////
  // RENDER FUNCTIONS

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="My Hats" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
        <InvestorHat navigation={navigation} userLoggedIn={userLoggedIn} />
        <FreelanceHat navigation={navigation} userLoggedIn={userLoggedIn} />
        <MentorHat navigation={navigation} userLoggedIn={userLoggedIn} />
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

export default MyHatsScreen;
