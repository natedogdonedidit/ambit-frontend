import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useQuery } from '@apollo/client';

import HeaderBack from 'library/components/headers/HeaderBack';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';

import TopicsOfInvest from 'library/components/settings/TopicsOfInvest';

import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import TopicsOfInvestDesc from 'library/components/settings/TopicsOfInvestDesc';

const MyInvestModal = ({ navigation }) => {
  const scrollRef = useRef(null);

  // ////////////////////////////////////////
  // QUERIES
  // this is the single source of truth
  const { loading, error, data } = useQuery(CURRENT_USER_TOPICS);
  if (loading)
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title="Invest" />
        <Loader loading={loading} />
      </View>
    );
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { userLoggedIn: myTopics } = data;

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="Invest" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
          <TopicsOfInvest navigation={navigation} myTopics={myTopics} showX />
          <TopicsOfInvestDesc myTopics={myTopics} scrollRef={scrollRef} />
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

export default MyInvestModal;
