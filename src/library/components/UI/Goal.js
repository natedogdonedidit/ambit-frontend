import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import { invest, hire, connect } from 'library/utils/lists';

const Goal = ({ goal, onPress }) => {
  const selectBackground = () => {
    if (invest.includes(goal)) return { backgroundColor: colors.greenO };
    if (hire.includes(goal)) return { backgroundColor: colors.blueO };
    if (connect.includes(goal)) return { backgroundColor: colors.purpO };
    return colors.lightGray;
  };

  const selectText = () => {
    if (invest.includes(goal)) return { color: colors.green };
    if (hire.includes(goal)) return { color: colors.blue };
    if (connect.includes(goal)) return { color: colors.darkPurp };

    return null;
  };

  const selectIcon = () => {
    if (invest.includes(goal)) return <Image style={styles.imageIcon} source={require('library/assets/images/invest.png')} />;
    if (hire.includes(goal)) return <Icon name="briefcase" solid size={15} color={colors.blue} style={{ paddingRight: 8 }} />;
    if (connect.includes(goal)) return <Image style={styles.imageIcon} source={require('library/assets/images/connect.png')} />;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={{ ...defaultStyles.shadowGoal, backgroundColor: 'white', borderRadius: 10 }}>
        <View style={{ ...styles.goalView, ...selectBackground() }}>
          {selectIcon()}
          <Text style={{ ...defaultStyles.defaultMedium, ...selectText() }}>{goal}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Goal;

const styles = StyleSheet.create({
  goalView: {
    height: 28,
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
