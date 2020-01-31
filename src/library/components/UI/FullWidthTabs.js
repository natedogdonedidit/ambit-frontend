import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const UNDERLINE_HEIGHT = 2.5;

const FullWidthTabs = ({ tabs, activeTab, setActiveTab, height }) => {
  const renderTabs = () => {
    return tabs.map((tab, i) => {
      return (
        <TouchableOpacity
          style={[activeTab === tab ? { ...styles.tabSelected } : { ...styles.tab }]}
          activeOpacity={0.6}
          key={i}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={activeTab === tab ? styles.tabSelectedText : styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      );
    });
  };

  return <View style={{ ...styles.tabs, height }}>{renderTabs()}</View>;
};

export default FullWidthTabs;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: colors.white,
  },
  tab: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: UNDERLINE_HEIGHT,
  },
  tabSelected: {
    height: '100%',
    flex: 1,
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
