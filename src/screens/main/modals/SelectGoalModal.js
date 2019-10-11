import React, { useState } from 'react';
import { StyleSheet, Modal, View, ScrollView, StatusBar, SafeAreaView, Image, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { invest, hire, connect } from 'library/utils/lists';

import HeaderWhite from 'library/components/headers/HeaderWhite';
import GoalSelect from 'library/components/UI/GoalSelect';

const SelectGoalModal = ({ navigation }) => {
  const goal = navigation.getParam('goal');
  const setGoal = navigation.getParam('setGoal');
  const setIsGoal = navigation.getParam('setIsGoal');

  // CUSTOM FUNCTIONS
  const handleGoalSelect = goalText => {
    setGoal(goalText);
    if (goalText) setIsGoal(true);
    navigation.goBack();
  };

  const renderGoals = list => {
    return list.map((goalText, i) => (
      <View key={i} style={styles.goal}>
        <GoalSelect goal={goalText} activeGoal={goal} showIcon={false} fill={false} onPress={() => handleGoalSelect(goalText)} />
      </View>
    ));
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <HeaderWhite handleLeft={navigation.goBack} textLeft="Cancel" title="Select a Goal" />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.titleView}>
            <Image style={styles.imageIcon} source={require('library/assets/images/invest.png')} />
            <Text style={{ ...defaultStyles.defaultMedium, color: colors.green }}>Invest</Text>
          </View>
          <View style={styles.goals}>{renderGoals(invest)}</View>
          <View style={styles.titleView}>
            <Icon name="briefcase" solid size={15} color={colors.blue} style={{ paddingRight: 10 }} />
            <Text style={{ ...defaultStyles.defaultMedium, color: colors.blue }}>Hire</Text>
          </View>
          <View style={styles.goals}>{renderGoals(hire)}</View>
          <View style={styles.titleView}>
            <Image style={styles.imageIcon} source={require('library/assets/images/connect.png')} />
            <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Connect</Text>
          </View>
          <View style={styles.goals}>{renderGoals(connect)}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectGoalModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    height: '100%',
    // flex: 1,
  },
  content: {
    backgroundColor: 'white',
    padding: 15,
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  imageIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  goals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  goal: {
    marginRight: 10,
    marginTop: 10,
  },
});
