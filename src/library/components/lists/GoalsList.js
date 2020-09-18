import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { goalsList } from 'library/utils/lists';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GoalsList = ({ handleGoalSelect, handleCustomGoalSelect, includeCustom = false }) => {
  // RETURN FUNCTION
  const renderList = () => {
    return goalsList.map((goal, i) => {
      return (
        <TouchableOpacity key={goal.name} activeOpacity={0.8} onPress={() => handleGoalSelect(goal)}>
          <View style={[styles.mainRow, i === goalsList.length - 1 && styles.addBottomBorder]}>
            <View style={styles.iconView}>
              <Icon name={goal.icon} solid size={20} color={goal.primaryColor} style={{}} />
            </View>

            <Text style={styles.mainRowText}>{goal.name}</Text>
            <Ionicons name="ios-chevron-forward" size={22} color={colors.iconGray} />
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <>
      {includeCustom && (
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleCustomGoalSelect(goalsList[0])}>
          <View style={styles.mainRow}>
            <View style={styles.iconView}>
              <Ionicons name="ios-rocket" size={22} color={colors.iconGray} />
            </View>

            <Text style={styles.mainRowText}>Custom Goal</Text>
            <Ionicons name="ios-chevron-forward" size={22} color={colors.iconGray} />
          </View>
        </TouchableOpacity>
      )}
      {renderList()}
    </>
  );
};

const styles = StyleSheet.create({
  mainRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    paddingRight: 15,
  },
  mainRowText: {
    ...defaultStyles.largeRegular,
    flex: 1,
  },
  iconView: {
    width: 55,
    alignItems: 'center',
    paddingRight: 5,
  },
  addBottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default GoalsList;
