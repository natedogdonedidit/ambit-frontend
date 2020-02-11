import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { useSafeArea } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import { HEADER_HEIGHT } from 'styles/constants';

const HeaderHome = ({ navigation, handleMiddle, user, handleTopicsButton }) => {
  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity style={styles.leftSide} onPress={() => navigation.openDrawer()}>
        <ProfilePic user={user} size={30} disableVideo disableClick />
      </TouchableOpacity>
      <TouchableOpacity style={styles.middleSection} onPress={handleMiddle}>
        <Text style={{ ...defaultStyles.ambitLogo }}>ambit.</Text>
      </TouchableOpacity>
      <View style={styles.rightSide}>
        <TouchableOpacity onPress={() => handleTopicsButton()} hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
          <View style={styles.iconCircle}>
            <Icon name="star" solid size={16} color={colors.black} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
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
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 10,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  leftSide: {
    width: 60,
    // alignItems: 'flex-start',
  },
  rightSide: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  middleSection: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  iconCircle: {
    height: 34,
    width: 34,
    marginLeft: 8,
    borderRadius: 17,
    backgroundColor: colors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderHome;
