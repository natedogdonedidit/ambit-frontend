import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, Animated, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { useSafeArea } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';

const HeaderTopic = ({ navigation, handleMiddle, handleRight, user, height = 44, topic }) => {
  // const insets = useSafeArea();

  return (
    <View style={{ ...styles.container, height }}>
      <TouchableOpacity style={styles.leftSide} onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={26} color={colors.iconDark} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.middleSection} onPress={handleMiddle}>
        <Text style={{ ...defaultStyles.headerTopic, color: colors.blueGray }}>{topic}</Text>
      </TouchableOpacity>
      <View style={styles.rightSide}>
        <TouchableOpacity onPress={handleRight}>
          <Icon name="star" solid size={18} color={colors.yellow} style={{ paddingRight: 12 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRight}>
          <Icon name="search" size={18} color={colors.iconDark} />
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
});

export default HeaderTopic;
