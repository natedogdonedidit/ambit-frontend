/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const SearchTabs = ({ navigation, activeTab, setActiveTab, height }) => {
  const tabs = ['Top', 'Latest', 'Goals', 'People', 'Projects'];

  const renderTabs = () => {
    return tabs.map((tab, i) => {
      return (
        // <TouchableOpacity activeOpacity={1} key={i} onPress={() => setActiveTopic(topic)}>
        <TouchableOpacity activeOpacity={0.6} key={i} onPress={() => setActiveTab(tab)}>
          <View style={{ justifyContent: 'center' }}>
            <View style={[activeTab === tab ? { ...styles.tabSelected } : { ...styles.tab }]}>
              <Text style={activeTab === tab ? styles.tabSelectedText : styles.tabText}>{tab}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={{ ...styles.tabs, height }} horizontal showsHorizontalScrollIndicator={false}>
      {renderTabs()}
    </ScrollView>
  );
};

export default SearchTabs;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.lightLightGray,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  tab: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  tabSelected: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomColor: colors.purp,
    borderBottomWidth: 2,
  },
  tabText: {
    ...defaultStyles.largeMedium,
    color: colors.blueGray,
  },
  tabSelectedText: {
    ...defaultStyles.largeMedium,
    color: colors.purp,
  },
});
