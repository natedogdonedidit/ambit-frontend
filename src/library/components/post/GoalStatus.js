import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';

const GoalStatus = ({ navigation, post }) => {
  const { goalStatus = 'active' } = post;

  if (!goalStatus) {
    return null;
  }

  const renderText = () => {
    if (goalStatus === 'active') {
      return 'In Progress';
    }
    if (goalStatus === 'inactive') {
      return 'Inactive';
    }
    if (goalStatus === 'complete') {
      return 'Complete';
    }
  };

  const getColor = () => {
    if (goalStatus === 'active') {
      return colors.goalGreen;
    }
    if (goalStatus === 'inactive') {
      return colors.goalOrange;
    }
    if (goalStatus === 'complete') {
      return colors.goalBlue;
    }
  };

  const getTextColor = () => {
    if (goalStatus === 'active') {
      return colors.green;
    }
    if (goalStatus === 'inactive') {
      return colors.orange;
    }
    if (goalStatus === 'complete') {
      return colors.blue;
    }
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Post', { post })} activeOpacity={0.3}>
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
