import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

// import { moneyGoals, helpGoals, networkGoals, answersGoals, hireGoals } from 'library/utils/lists';
import { getGoalInfo } from 'library/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomGoal = ({ navigation, goal }) => {
  return (
    // color background w/ black text
    <TouchableOpacity
      // style={{ width: '100%', height: '100%' }}
      style={{ flexDirection: 'row', flex: 1 }}
      onPress={() => navigation.navigate('Search', { textToSearch: goal })}
      activeOpacity={0.6}
    >
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          borderRadius: 10,
          flex: 1,
          flexShrink: 10,
          // ...defaultStyles.shadowGoal,
        }}
      >
        <View style={{ ...styles.goalView, backgroundColor: colors.gray12 }}>
          <View style={styles.iconView}>
            <Ionicons name="ios-rocket" size={22} color={colors.red} />
          </View>
          <View style={styles.textView}>
            <Text>
              <Text style={{ ...defaultStyles.defaultMedium }}>{`${goal}`}</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomGoal;

const styles = StyleSheet.create({
  whiteBack: {
    height: 32,
    borderRadius: 8,
    backgroundColor: 'white',
    // ...defaultStyles.shadowGoal,
  },
  goalView: {
    flexDirection: 'row',
    flexShrink: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: colors.grayButton,
  },
  iconView: {
    justifyContent: 'center',
    paddingRight: 10,
  },
  textView: {
    flexShrink: 10,
  },
});
