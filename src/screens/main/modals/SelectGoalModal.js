import React, { useState } from 'react';
import { StyleSheet, Modal, View, ScrollView, StatusBar, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { moneyGoals, helpGoals, networkGoals, answersGoals } from 'library/utils/lists';
import { getPrimaryColor, getBackgroundColor, getIcon } from 'library/utils';

import HeaderWhite from 'library/components/headers/HeaderWhite';
// import GoalSelect from 'library/components/UI/GoalSelect';

const SelectGoalModal = ({ navigation }) => {
  const goal = navigation.getParam('goal');
  const setGoal = navigation.getParam('setGoal');
  const setField = navigation.getParam('setField');

  const handleGoalSelect = goalText => {
    setGoal(goalText);
    setField('');
    navigation.goBack();
  };

  const renderList = list => {
    return list.map(listItem => {
      const isSelected = listItem === goal;

      return (
        <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => handleGoalSelect(listItem)}>
          <View style={{ ...styles.itemRow, borderColor: getPrimaryColor(listItem) }}>
            <Text style={{ ...defaultStyles.largeLight, color: getPrimaryColor(listItem) }}>{listItem}</Text>
            {isSelected && (
              <View style={{ height: 40, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
                <Icon name="check" size={20} color={colors.purp} />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <HeaderWhite handleLeft={navigation.goBack} handleRight={null} textLeft="Back" textRight="" title="" />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ width: '100%', paddingHorizontal: 40, paddingBottom: 20, alignItems: 'center' }}>
            {/* <Icon name="briefcase" size={40} color={colors.purp} /> */}
            <Text
              style={{
                ...defaultStyles.hugeSemibold,
                // color: colors.purp,
                textAlign: 'center',
                paddingTop: 20,
              }}
            >
              What are you trying to accomplish?
            </Text>

            <Text style={{ ...defaultStyles.defaultText, textAlign: 'center', paddingTop: 15, opacity: 0.8 }}>
              Select a goal and Ambit will suggest
            </Text>
            <Text style={{ ...defaultStyles.defaultText, textAlign: 'center', paddingBottom: 0, opacity: 0.8 }}>
              people to help
            </Text>
          </View>
          {/* <View style={styles.sectionHeader}>
            <Icon name="comment-dollar" solid size={24} color={colors.green} style={{ paddingRight: 10 }} />
            {/* <Text style={{ ...defaultStyles.largeLight, color: colors.purp }}>Looking for people</Text>
          </View> */}
          <View style={{ paddingHorizontal: 15 }}>{renderList(moneyGoals)}</View>
          {/* <View style={styles.sectionHeader}>
            <Icon name="briefcase" solid size={24} color={colors.peach} style={{ paddingRight: 10 }} />
            <Text style={{ ...defaultStyles.largeLight, color: colors.darkGray }}>Hired help</Text>
          </View> */}
          <View style={{ paddingHorizontal: 15 }}>{renderList(helpGoals)}</View>
          {/* <View style={styles.sectionHeader}>
            <Icon name="user-friends" solid size={24} color={colors.blue} style={{ paddingRight: 10 }} />
            <Text style={{ ...defaultStyles.largeLight, color: colors.darkGray }}>Networking</Text>
          </View> */}
          <View style={{ paddingHorizontal: 15 }}>{renderList(networkGoals)}</View>
          {/* <View style={styles.sectionHeader}>
            <Icon name="lightbulb" solid size={24} color={colors.purple} style={{ paddingRight: 10 }} />
            <Text style={{ ...defaultStyles.largeLight, color: colors.darkGray }}>Looking for answers</Text>
          </View> */}
          <View style={{ paddingHorizontal: 15 }}>{renderList(answersGoals)}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectGoalModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flex: 1,
    width: '100%',
  },
  // items
  itemRow: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 15,
  },

  // container: {
  //   backgroundColor: 'white',
  //   justifyContent: 'space-between',
  //   height: '100%',
  // },
  // content: {
  //   backgroundColor: 'white',
  //   padding: 15,
  //   paddingTop: 20,
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  // },
  // titleView: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingBottom: 20,
  //   marginBottom: 10,
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  //   borderBottomColor: colors.borderBlack,
  // },
  sectionHeader: {
    paddingLeft: 35,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 15,
  },
  // goals: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   marginBottom: 25,
  // },
  // goal: {
  //   marginRight: 10,
  //   marginTop: 10,
  // },
});
