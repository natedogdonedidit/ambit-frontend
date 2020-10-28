/* eslint-disable react/prop-types */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Lines from 'library/components/UI/icons/Lines';

const ProfileTabs = ({ tabState, setTabState }) => {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={tabState === 0 ? styles.tabSelected : styles.tab}
        onPress={() => setTabState(0)}
      >
        <Icon name="user" solid size={18} color={colors.blueGray} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={tabState === 1 ? styles.tabSelected : styles.tab}
        onPress={() => setTabState(1)}
      >
        <Lines />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={tabState === 2 ? styles.tabSelected : styles.tab}
        onPress={() => setTabState(2)}
      >
        <Icon name="bars" solid size={18} color={colors.blueGray} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileTabs;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    borderTopColor: colors.borderBlack,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderBottomColor: 'white',
    borderBottomWidth: 2.4,
  },
  tabSelected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderBottomColor: colors.purp,
    borderBottomWidth: 2.4,
  },
});
