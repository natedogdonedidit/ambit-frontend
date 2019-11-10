import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import { peopleGoals, answersGoals, hireGoals } from 'library/utils/lists';

const GoalSelect = ({ goal, activeGoal, showIcon = true, fill = true, onPress }) => {
  let white = false;
  if (!fill && goal !== activeGoal) white = true;

  const selectBackground = () => {
    if (white) return { backgroundColor: 'white', borderWidth: StyleSheet.hairlineWidth, borderColor: colors.borderBlack };
    if (peopleGoals.includes(goal)) return { backgroundColor: colors.greenO };
    if (answersGoals.includes(goal)) return { backgroundColor: colors.blueO };
    if (hireGoals.includes(goal)) return { backgroundColor: colors.purpO };
    return colors.lightGray;
  };

  const selectText = () => {
    if (white) {
      if (peopleGoals.includes(goal)) return { color: colors.green, fontWeight: '300' };
      if (answersGoals.includes(goal)) return { color: colors.blue, fontWeight: '300' };
      if (hireGoals.includes(goal)) return { color: colors.purp, fontWeight: '300' };
    } else {
      if (peopleGoals.includes(goal)) return { color: colors.green };
      if (answersGoals.includes(goal)) return { color: colors.blue };
      if (hireGoals.includes(goal)) return { color: colors.purp };
    }

    return null;
  };

  const selectIcon = () => {
    if (showIcon) {
      if (peopleGoals.includes(goal))
        return <Image style={styles.imageIcon} source={require('library/assets/images/invest.png')} />;
      if (answersGoals.includes(goal))
        return <Icon name="briefcase" solid size={15} color={colors.blue} style={{ paddingRight: 8 }} />;
      if (hireGoals.includes(goal))
        return <Image style={styles.imageIcon} source={require('library/assets/images/connect.png')} />;
    }

    return null;
  };

  const selectShadow = () => {
    if (white) return null;
    // return {};
    return { ...defaultStyles.shadowGoal };
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={{ ...selectShadow(), backgroundColor: 'white', borderRadius: 10 }}>
        <View style={{ ...styles.goalView, ...selectBackground() }}>
          {selectIcon()}
          <Text style={{ ...defaultStyles.defaultMedium, ...selectText() }}>{goal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GoalSelect;

const styles = StyleSheet.create({
  goalView: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  goalText: {},
  imageIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});
