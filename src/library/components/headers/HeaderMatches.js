import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { useSafeArea } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import { HEADER_HEIGHT } from 'styles/constants';

const HeaderMatches = ({ navigation, handleMiddle, handleRight, user }) => {
  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity style={styles.leftSide} onPress={() => navigation.openDrawer()}>
        <ProfilePic user={user} size={30} disableVideo disableClick />
      </TouchableOpacity>
      <TouchableOpacity style={styles.middleSection} onPress={handleMiddle}>
        <Text style={{ ...defaultStyles.headerSmall, color: colors.black }}>Matches</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightSide} onPress={handleRight} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
        <Icon name="search" size={18} color={colors.iconDark} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  leftSide: {
    width: 60,
    alignItems: 'flex-start',
  },
  rightSide: {
    width: 60,
    alignItems: 'flex-end',
  },
  middleSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeaderMatches;
