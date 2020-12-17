import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { HOME_TABS_HEIGHT } from 'styles/constants';

const HomeTimelineTabs = ({ activeTimeline, setActiveTimeline }) => {
  return (
    <View style={[styles.section, { height: HOME_TABS_HEIGHT }]}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setActiveTimeline(0)}
        style={activeTimeline === 0 ? styles.tabSelected : styles.tab}
        hitSlop={{ top: 12, left: 20, bottom: 12 }}
      >
        <Text style={activeTimeline === 0 ? styles.selectedText : styles.nonSelectedText}>For you</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setActiveTimeline(1)}
        style={activeTimeline === 1 ? styles.tabSelected : styles.tab}
        hitSlop={{ top: 12, bottom: 12, right: 20 }}
      >
        <Text style={activeTimeline === 1 ? styles.selectedText : styles.nonSelectedText}>Following</Text>
      </TouchableOpacity>
      {/* </View> */}

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setActiveTimeline(2)}
        style={activeTimeline === 2 ? styles.tabSelected : styles.tab}
        hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}
      >
        <Text style={activeTimeline === 2 ? styles.selectedText : styles.nonSelectedText}>My Goals</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    height: 46,
    backgroundColor: 'white',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 2.4,
  },
  tabSelected: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.purp,
    borderBottomWidth: 2.4,
  },
  selectedText: {
    ...defaultStyles.largeBoldDisplay,
    color: colors.purp,
  },
  nonSelectedText: {
    ...defaultStyles.largeBoldDisplay,
    color: colors.gray60,
  },
});

export default HomeTimelineTabs;
