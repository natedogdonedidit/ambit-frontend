import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, Animated, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { useSafeArea } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import { HEADER_HEIGHT } from 'styles/constants';

const HeaderHome = ({ navigation, handleMiddle, handleRight, user, height = HEADER_HEIGHT }) => {
  // const insets = useSafeArea();

  return (
    <View style={{ ...styles.container, height }}>
      <TouchableOpacity style={styles.leftSide} onPress={() => navigation.openDrawer()}>
        <ProfilePic user={user} size={30} disableVideo disableClick />
      </TouchableOpacity>
      <TouchableOpacity style={styles.middleSection} onPress={handleMiddle}>
        <Text style={{ ...defaultStyles.ambitLogo }}>Ambit</Text>
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
    alignItems: 'flex-end',
  },
  middleSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeaderHome;
