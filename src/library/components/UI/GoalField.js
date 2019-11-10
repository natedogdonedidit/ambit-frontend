import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { getPrimaryColor, getBackgroundColor, getIcon } from 'library/utils';

const Goal = ({ goalField, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View style={styles.whiteBack}>
        <View style={{ ...styles.goalView }}>
          <View style={{ paddingRight: 5 }}>{getIcon('hashtag', 10)}</View>
          <Text style={{ ...defaultStyles.defaultRegular }}>{goalField}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Goal;

const styles = StyleSheet.create({
  whiteBack: {
    height: 32,
    borderRadius: 10,
    // backgroundColor: 'white',
    // ...defaultStyles.shadowButton,
  },
  goalView: {
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // paddingHorizontal: 15,
    // backgroundColor: colors.goalGray,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.darkGray,
  },
  goalText: {},
  imageIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});
