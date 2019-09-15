/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TimelineTabs = ({ height, tabState, setTabState }) => {
  const tabNames = ['Home', 'Local', 'Global'];

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

  return <View style={{ ...styles.tabs, height }}>{renderTabs()}</View>;
};

export default TimelineTabs;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    backgroundColor: 'white',
  },
  tabSelected: {
    width: 80,
    height: '100%',
    // borderBottomColor: colors.purp,
    // borderBottomWidth: 3,
    backgroundColor: 'white',
  },
  touchable: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  tabText: {
    ...defaultStyles.largeSemibold,
    color: 'black',
    opacity: 0.3,
  },
  tabSelectedText: {
    ...defaultStyles.largeBold,
    color: colors.purp,
  },
});
