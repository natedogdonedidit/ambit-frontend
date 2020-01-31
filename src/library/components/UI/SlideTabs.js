import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const UNDERLINE_HEIGHT = 2.5;

const SlideTabs = ({ tabs, activeTab, setActiveTab, height }) => {
  const renderTabs = () => {
    return tabs.map((tab, i) => {
      return (
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

export default SlideTabs;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  tab: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: UNDERLINE_HEIGHT,
  },
  tabSelected: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: colors.purp,
    borderBottomWidth: UNDERLINE_HEIGHT,
  },
  tabText: {
    ...defaultStyles.largeSemibold,
    color: colors.blueGray,
  },
  tabSelectedText: {
    ...defaultStyles.largeSemibold,
    color: colors.purp,
  },
});
