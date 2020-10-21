import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

// import { moneyGoals, helpGoals, networkGoals, answersGoals, hireGoals } from 'library/utils/lists';
import { getGoalInfo } from 'library/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomGoal = ({ navigation, goal, color, icon }) => {
  return (
    // color background w/ black text
    <View style={styles.whiteBack}>
      <View style={{ ...styles.goalView, backgroundColor: color || colors.gray12 }}>
        <View style={styles.iconView}>
          {/* <Ionicons name="ios-rocket" size={22} color={colors.blueGray} /> */}
          <Text style={{ ...defaultStyles.defaultMedium }}>{icon || '🚀'}</Text>
        </View>
        <Text style={{ paddingRight: 16 }}>
          <Text style={{ ...defaultStyles.defaultMedium }}>{`${goal}`}</Text>
        </Text>
      </View>
    </View>
  );
};

export default CustomGoal;

const styles = StyleSheet.create({
  whiteBack: {
    backgroundColor: 'white',
    borderRadius: 15,
    ...defaultStyles.shadowGoal,
    // flexDirection: 'row',
    // flex: 1,
    // flexShrink: 10,
    marginRight: 25,
    marginTop: 5,
    marginBottom: 10,
  },
  goalView: {
    minWidth: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    paddingLeft: 16,
    paddingVertical: 10,
    backgroundColor: colors.grayButton,
    // marginRight: 25,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    // flexShrink: 10,
  },
  iconView: {
    justifyContent: 'center',
    paddingRight: 10,
  },
});
