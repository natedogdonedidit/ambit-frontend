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
            <Text style={{ ...defaultStyles.largeRegular, color: getPrimaryColor(listItem) }}>{listItem}</Text>
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
        <View
          style={{
            height: 46,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          >
            <Icon name="chevron-left" size={22} color={colors.iconDark} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={() => null} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
            <Icon name="question-circle" size={22} color={colors.iconDark} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1, paddingHorizontal: 15, paddingBottom: 20 }}>
          <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  ...defaultStyles.headerLarge,
                }}
              >
                Select a goal
              </Text>
            </View>

            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>Goals tell other people what you're working on.</Text>
            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 1, paddingBottom: 20 }}>
              Ambit will also suggest people to help!
            </Text>
          </View>
          <View>{renderList(moneyGoals)}</View>
          <View>{renderList(helpGoals)}</View>
          <View>{renderList(networkGoals)}</View>
          <View>{renderList(answersGoals)}</View>
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
    // backgroundColor: colors.grayButton,
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
