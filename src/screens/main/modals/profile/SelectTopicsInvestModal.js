import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery, useMutation } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { investmentMarkets } from 'library/utils/lists';
import HeaderBack from 'library/components/headers/HeaderBack';

import EDIT_TOPICS_INVEST_MUTATION from 'library/mutations/EDIT_TOPICS_INVEST_MUTATION';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const SelectTopicsInvestModal = ({ navigation }) => {
  // ////////////////////////////////////////
  // QUERIES
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { userLoggedIn } = data;
  // this is the single source of truth
  const { id, investorFields } = userLoggedIn;

  // ////////////////////////////////////////
  // MUTATIONS
  const [editTopicsInvest, { loading: loadingEdit, error: errorEdit, data: dataEdit }] = useMutation(
    EDIT_TOPICS_INVEST_MUTATION,
    {
      onError: () =>
        Alert.alert('Oh no!', 'An error occured when trying to edit your investor topics. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]),
    }
  );

  // ////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleTopicSelect = selectedTopic => {
    // build the new array of topics
    let newArray = [];
    if (investorFields.includes(selectedTopic)) {
      // remove it
      newArray = investorFields.filter(field => field !== selectedTopic);
    } else {
      // add it
      newArray = [...investorFields, selectedTopic];
    }

    // run the mutation
    editTopicsInvest({
      variables: {
        id,
        topics: newArray,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editTopicsInvest: {
          __typename: 'User',
          ...userLoggedIn,
          investorFields: newArray,
        },
      },
      update: (proxy, { data: dataReturned }) => {
        proxy.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            userLoggedIn: dataReturned.editTopicsInvest,
          },
        });
      },
    });
  };

  // ////////////////////////////////////////
  // RENDER FUNCTIONS
  const renderList = () => {
    return investmentMarkets.map((market, i) => {
      const isSelected = investorFields.includes(market);

      return (
        <View key={i} style={styles.categorySection}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(market)}>
            <View style={{ ...styles.mainRow }}>
              <Text style={{ ...defaultStyles.hugeSemibold, color: colors.blueGray, paddingRight: 15, flex: 1 }}>{market}</Text>
              {isSelected ? (
                <View style={styles.addedButton}>
                  <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
                </View>
              ) : (
                <View style={styles.addButton}>
                  <Text style={{ ...defaultStyles.defaultMedium, color: colors.green }}>Add</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.goalGreen,
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          {/* <Icon name="briefcase" size={40} color={colors.green} /> */}
          <Icon name="comment-dollar" size={40} color={colors.green} />
        </View>
        <View style={{ width: '100%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text
              style={{
                ...defaultStyles.headerMedium,
              }}
            >
              Select your target investment markets
            </Text>
          </View>

          <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>
            We will send you investment opporunities from these markets
          </Text>
        </View>

        <View style={styles.listView}>{renderList()}</View>
      </ScrollView>
    </View>
  );
};

export default SelectTopicsInvestModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listView: {
    flex: 1,
    width: '100%',
    paddingTop: 30,
  },
  categorySection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  mainRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    paddingRight: 10,
  },
  subTopicsView: {
    paddingLeft: 15,
  },
  subRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
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
    borderColor: colors.green,
    opacity: 0.9,
  },
  addedButton: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.green,
  },
});
