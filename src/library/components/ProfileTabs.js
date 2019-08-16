/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';

const ProfileTabs = ({ tabState, setTabState }) => {
  const tabNames = ['Bio', 'Goals & Posts', 'Network'];

  const renderTabs = () => {
    return tabNames.map((tabName, i) => {
      return (
        <View key={i} style={tabState === i ? styles.tabSelected : styles.tab}>
          <TouchableOpacity onPress={() => setTabState(i)} style={styles.touchable}>
            <Text style={tabState === i ? styles.tabSelectedText : styles.tabText}>{tabName}</Text>
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
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 0,
    flexGrow: 1,
    height: 36,
    borderBottomColor: colors.darkGray,
    borderBottomWidth: 0.2,
  },
  tabSelected: {
    flexBasis: 0,
    flexGrow: 1,
    height: 36,
    borderBottomColor: colors.purp,
    borderBottomWidth: 3,
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  tabText: {
    color: colors.darkGray,
    opacity: 0.6,
    fontSize: 14,
    fontWeight: '400',
  },
  tabSelectedText: {
    color: colors.purp,
    opacity: 1.0,
    fontSize: 14,
    fontWeight: '500',
  },
});
