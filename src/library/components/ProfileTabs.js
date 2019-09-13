/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

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
    height: 42,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
  },
  tabSelected: {
    flexBasis: 0,
    flexGrow: 1,
    height: 42,
    borderBottomColor: colors.purp,
    borderBottomWidth: 3,
    backgroundColor: 'white',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  tabText: {
    ...defaultStyles.largeRegular,
    color: 'black',
    opacity: 0.6,
  },
  tabSelectedText: {
    ...defaultStyles.largeSemibold,
    color: colors.purp,
  },
});
