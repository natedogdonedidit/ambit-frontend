import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';

import HeaderBack from 'library/components/headers/HeaderBack';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';

import TopicsOfMentor from 'library/components/settings/TopicsOfMentor';

import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

const MyNetworkScreen = ({ navigation }) => {
  // ////////////////////////////////////////
  // QUERIES
  // this is the single source of truth
  const { loading, error, data } = useQuery(CURRENT_USER_TOPICS);
  if (loading)
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title="Mentor" />
        <Loader loading={loading} />
      </View>
    );
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { userLoggedIn: myTopics } = data;

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="Mentor" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        <TopicsOfMentor navigation={navigation} myTopics={myTopics} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
});

export default MyNetworkScreen;
