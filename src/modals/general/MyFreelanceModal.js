import React, { useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useQuery } from '@apollo/client';

import HeaderBack from 'library/components/headers/HeaderBack';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';

import TopicsOfFreelance from 'library/components/settings/TopicsOfFreelance';

import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import TopicsOfFreelanceDesc from 'library/components/settings/TopicsOfFreelanceDesc';

const MyFreelanceModal = ({ navigation }) => {
  const scrollRef = useRef(null);

  // ////////////////////////////////////////
  // QUERIES
  // this is the single source of truth
  const { loading, error, data } = useQuery(CURRENT_USER_TOPICS);
  if (loading)
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title="Freelance" />
        <Loader loading={loading} />
      </View>
    );
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { userLoggedIn: myTopics } = data;

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="Freelance" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
          <TopicsOfFreelance navigation={navigation} myTopics={myTopics} />
          <TopicsOfFreelanceDesc myTopics={myTopics} scrollRef={scrollRef} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
});

export default MyFreelanceModal;
