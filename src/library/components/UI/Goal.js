import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import { moneyGoals, helpGoals, networkGoals, answersGoals, hireGoals } from 'library/utils/lists';
import { getPrimaryColor, getBackgroundColor, getIcon } from 'library/utils';

const Goal = ({ goal, onPress }) => {
  return (
    // solid w/ white text
    // <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
    //   <View style={styles.whiteBack}>
    //     <View
    //       style={{
    //         ...styles.goalView,
    //         backgroundColor: getPrimaryColor(goal),
    //         // opacity: 0.05,
    //         // backgroundColor: 'white',
    //         // borderColor: getPrimaryColor(goal),
    //         // borderWidth: StyleSheet.hairlineWidth,
    //       }}
    //     >
    //       <View style={{ paddingRight: 10 }}>{getIcon(goal)}</View>
    //       <Text style={{ ...defaultStyles.defaultSemibold, color: 'white' }}>{goal}</Text>
    //     </View>
    //   </View>
    // </TouchableOpacity>

    // color background w/ black text
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.whiteBack}>
        <View
          style={{
            ...styles.goalView,
            backgroundColor: getBackgroundColor(goal),
            // backgroundColor: 'white',
            // backgroundColor: 'rgba(0,0,0,0.06)',
            // borderColor: getPrimaryColor(goal),
            // borderWidth: StyleSheet.hairlineWidth,
          }}
        >
          <View style={{ paddingRight: 10 }}>{getIcon(goal)}</View>
          {/* <Text style={{ ...defaultStyles.defaultRegular, color: colors.darkGray }}>{goal}</Text> */}
          <Text style={{ ...defaultStyles.defaultMedium, color: getPrimaryColor(goal) }}>{goal}</Text>
        </View>
      </View>
    </TouchableOpacity>

    // <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
    //   <View style={styles.whiteBack}>
    //     <View
    //       style={{
    //         ...styles.goalView,
    //         backgroundColor: getBackgroundColor(goal),
    //         borderColor: getPrimaryColor(goal),
    //         borderWidth: StyleSheet.hairlineWidth,
    //       }}
    //     >
    //       <View style={{ paddingRight: 10 }}>{getIcon(goal)}</View>
    //       <Text style={{ ...defaultStyles.defaultSemibold, color: getPrimaryColor(goal) }}>{goal}</Text>
    //     </View>
    //   </View>
    // </TouchableOpacity>
  );
};

export default Goal;

const styles = StyleSheet.create({
  whiteBack: {
    height: 32,
    borderRadius: 10,
    backgroundColor: 'white',
    // ...defaultStyles.shadowButton,
  },
  goalView: {
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderWidth: 0.4,
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
