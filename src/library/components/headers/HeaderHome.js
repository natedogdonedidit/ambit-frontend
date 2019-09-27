import React from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';

const HeaderHome = ({ navigation, handleMiddle, handleRight, user }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.leftSide} onPress={() => navigation.openDrawer()}>
        <ProfilePic user={user} size={30} disableVideo disableClick />
      </TouchableOpacity>
      <TouchableOpacity style={styles.middleSection} onPress={handleMiddle}>
        <Text style={{ ...defaultStyles.ambitLogo }}>Ambit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightSide} onPress={handleRight}>
        <Icon name="search" size={18} color={colors.darkGray} style={{ opacity: 0.6 }} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.lightLightGray,
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
