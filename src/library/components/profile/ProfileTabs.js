/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ProfileTabs = ({ tabState, setTabState }) => {
  const tabNames = ['user', 'list', 'images'];
  // const tabNames = ['Bio', 'Posts', 'Media'];

  const renderTabs = () => {
    return tabNames.map((tabName, i) => {
      return (
        <View key={i} style={tabState === i ? styles.tabSelected : styles.tab}>
          <TouchableOpacity onPress={() => setTabState(i)} style={styles.touchable}>
            <Icon name={tabName} solid={tabName === 'user'} size={18} color={colors.blueGray} />
            {/* <Text style={tabState === i ? styles.tabSelectedText : styles.tabText}>{tabName}</Text> */}
          </TouchableOpacity>
        </View>
      );
    });
  };

  return <View style={styles.tabs}>{renderTabs()}</View>;
};

export default ProfileTabs;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderTopColor: colors.borderBlack,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 0,
    flexGrow: 1,
    height: 42,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabSelected: {
    flexBasis: 0,
    flexGrow: 1,
    height: 42,
    borderBottomColor: colors.blueGray,
    borderBottomWidth: 2,
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  tabText: {
    ...defaultStyles.hugeLight,
    color: colors.blueGray,
  },
  tabSelectedText: {
    ...defaultStyles.hugeMedium,
    color: colors.black,
  },
});
