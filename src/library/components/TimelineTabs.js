/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TimelineTabs = ({ height, tabState, setTabState, setNewPostModalVisible }) => {
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

  return (
    <View style={styles.container}>
      <View style={{ ...styles.tabs, height }}>{renderTabs()}</View>
      <TouchableOpacity onPress={() => setNewPostModalVisible(true)}>
        <View style={{ justifyContent: 'center', height }}>
          <Icon name="search" size={18} color={colors.darkGray} style={{ opacity: 0.6 }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TimelineTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 15,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabs: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // width: '100%',
    backgroundColor: 'white',
    // borderBottomColor: colors.borderBlack,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
    backgroundColor: 'white',
  },
  tabSelected: {
    width: 70,
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
    ...defaultStyles.defaultSemibold,
    color: 'black',
    opacity: 0.4,
  },
  tabSelectedText: {
    ...defaultStyles.defaultBold,
    color: colors.purp,
  },
  newPostButton: {
    height: 30,
    width: 60,
    borderRadius: 15,
    backgroundColor: colors.purp,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
