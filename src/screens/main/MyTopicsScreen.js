import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';

import HeaderBack from 'library/components/headers/HeaderBack';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import TopicsOfFocus from 'library/components/settings/TopicsOfFocus';
import TopicsOfInterest from 'library/components/settings/TopicsOfInterest';

// import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

const MyTopicsScreen = ({ navigation }) => {
  // QUERIES
  // this is the single source of truth
  const { loading, error, data } = useQuery(CURRENT_USER_TOPICS);
  if (loading)
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title="My Topics" />
        <Loader loading={loading} full={false} />
      </View>
    );
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { myTopics } = data;

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="My Topics" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        <TopicsOfFocus navigation={navigation} myTopics={myTopics} />
        <TopicsOfInterest navigation={navigation} myTopics={myTopics} />
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
