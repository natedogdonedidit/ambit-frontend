import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';

const GoalStatus = ({ navigation, post, updateGoalStatus, isMyPost }) => {
  const { goalStatus = 'Active' } = post;

  if (!goalStatus) {
    return null;
  }

  const renderText = () => {
    if (goalStatus === 'Active') {
      return 'In Progress';
    }
    if (goalStatus === 'Inactive') {
      return 'Inactive';
    }
    if (goalStatus === 'Complete') {
      return 'Complete';
    }
  };

  const getTextColor = () => {
    if (goalStatus === 'Active') {
      return colors.green;
    }
    if (goalStatus === 'Inactive') {
      return colors.orange;
    }
    if (goalStatus === 'Complete') {
      return colors.blue;
    }
  };

  const determineOptions = () => {
    if (post.goalStatus === 'Inactive') {
      return [
        {
          text: 'Mark goal Complete',
          onPress: () => updateGoalStatus('Complete'),
        },
        {
          text: 'Mark goal Active',
          onPress: () => updateGoalStatus('Active'),
        },
      ];
    }
    if (post.goalStatus === 'Active') {
      return [
        {
          text: 'Mark goal Complete',
          onPress: () => updateGoalStatus('Complete'),
        },
        {
          text: 'Mark goal Inactive',
          onPress: () => updateGoalStatus('Inactive'),
        },
      ];
    }
    if (post.goalStatus === 'Complete') {
      return [
        {
          text: 'Mark goal Active',
          onPress: () => updateGoalStatus('Active'),
        },
      ];
    }
    return [];
  };

  const handleClick = () => {
    if (isMyPost) {
      const options = determineOptions();
      navigation.navigate('SelectorModal', { options });
    }
  };

  return (
    <TouchableOpacity onPress={handleClick} activeOpacity={0.3}>
      {/* <View style={{ ...styles.topic, backgroundColor: getColor() }}> */}
      <Text style={{ ...defaultStyles.smallMedium, color: getTextColor() }}>{renderText()}</Text>
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default GoalStatus;

const styles = StyleSheet.create({
  // topic: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 24,
  //   borderRadius: 10,
  //   paddingHorizontal: 9,
  //   backgroundColor: colors.systemGray6,
  //   marginRight: 6,
  //   marginBottom: 6,
  // },
});
