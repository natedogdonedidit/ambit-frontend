import React, { useMemo } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

// import { moneyGoals, helpGoals, networkGoals, answersGoals, hireGoals } from 'library/utils/lists';
import { getGoalInfo, getTopicFromID } from 'library/utils';

const Goal = ({ navigation, goal, subField, onPress }) => {
  const { name } = useMemo(() => getTopicFromID(subField), [subField]);

  return (
    // color background w/ black text
    <View style={styles.whiteBack}>
      <View style={{ ...styles.goalView, backgroundColor: getGoalInfo(goal, 'secondaryColor') }}>
        <View style={styles.iconView}>
          {getGoalInfo(goal, 'emoji') ? (
            <Text style={{ ...defaultStyles.defaultMedium }}>{getGoalInfo(goal, 'emoji')}</Text>
          ) : (
            <Icon name={getGoalInfo(goal, 'icon')} size={16} color={getGoalInfo(goal, 'iconColor')} solid />
          )}
        </View>
        <Text style={{ paddingRight: 16 }}>
          <Text style={{ ...defaultStyles.defaultMedium }}>{`${goal}`}</Text>
          <Text style={{ ...defaultStyles.defaultLight }}>{` ${getGoalInfo(goal, 'adverb')} `}</Text>
          <Text style={{ ...defaultStyles.defaultMedium }}>{name}</Text>
        </Text>
      </View>
    </View>
  );
};

export default Goal;

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
