import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

// import { moneyGoals, helpGoals, networkGoals, answersGoals, hireGoals } from 'library/utils/lists';
import { getGoalInfo } from 'library/utils';

const Goal = ({ navigation, goal, subField, onPress }) => {
  return (
    // color background w/ black text
    <TouchableOpacity
      onPress={() => navigation.navigate('Search', { goalToSearch: getGoalInfo(goal), topicToSearch: subField.topicID || null })}
      activeOpacity={0.6}
    >
      <View style={{ ...styles.goalView, backgroundColor: getGoalInfo(goal, 'secondaryColor') }}>
        <View style={styles.iconView}>
          <Icon name={getGoalInfo(goal, 'logo')} size={15} color={getGoalInfo(goal, 'primaryColor')} solid />
        </View>
        <View style={styles.textView}>
          <Text>
            <Text style={{ ...defaultStyles.defaultMedium }}>{`${goal}`}</Text>
            <Text style={{ ...defaultStyles.defaultLight }}>{` ${getGoalInfo(goal, 'adverb')} `}</Text>
            <Text style={{ ...defaultStyles.defaultMedium }}>{subField.name}</Text>
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.darkGray,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.grayButton,
  },
  iconView: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  textView: {},

  // old
  goalText: {},
  imageIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});
