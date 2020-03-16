import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const HeaderTopic = ({ navigation, handleMiddle, handleRight, user, height = 44, topicName }) => {
  return (
    <View style={{ ...styles.container, height }}>
      <TouchableOpacity style={styles.leftSide} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={28} color={colors.purp} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.middleSection} onPress={handleMiddle}>
        <Text style={{ ...defaultStyles.headerSmall }}>{topicName}</Text>
      </TouchableOpacity>
      <View style={styles.rightSide}>
        <TouchableOpacity onPress={() => null} hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
          <View style={styles.iconCircleBlank}>
            <Icon name="star" solid size={20} color={colors.yellow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRight} hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
          <View style={styles.iconCircle}>
            <Icon name="search" size={16} color={colors.black} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    // backgroundColor: colors.lightLightGray,
    backgroundColor: 'white',
    // backgroundColor: 'gray',
  },
  leftSide: {
    width: 60,
    alignItems: 'flex-start',
  },
  rightSide: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  middleSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    height: 34,
    width: 34,
    marginLeft: 5,
    borderRadius: 17,
    backgroundColor: colors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleBlank: {
    height: 34,
    width: 34,
    marginLeft: 8,
    borderRadius: 17,
    // backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderTopic;
