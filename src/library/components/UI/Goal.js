import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

// import { moneyGoals, helpGoals, networkGoals, answersGoals, hireGoals } from 'library/utils/lists';
import { getGoalInfo } from 'library/utils';

const Goal = ({ goal, onPress }) => {
  return (
    // color background w/ black text
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.whiteBack}>
        <View
          style={{
            ...styles.goalView,
            backgroundColor: getGoalInfo(goal, 'secondaryColor'),
            // borderColor: getGoalInfo(goal, 'primaryColor'),
          }}
        >
          <View style={{ paddingRight: 10 }}>
            <Icon name={getGoalInfo(goal, 'logo')} size={15} color={getGoalInfo(goal, 'primaryColor')} solid />
          </View>
          <Text style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(goal, 'primaryColor') }}>{goal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Goal;

const styles = StyleSheet.create({
  whiteBack: {
    height: 32,
    borderRadius: 8,
    backgroundColor: 'white',
    // ...defaultStyles.shadowGoal,
  },
  goalView: {
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.darkGray,
    paddingHorizontal: 15,
  },
  goalText: {},
  imageIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});
