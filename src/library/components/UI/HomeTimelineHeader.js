import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const HomeTimelineHeader = ({ navigation, borderBottom = true, activeTimeline, setActiveTimeline }) => {
  return (
    <View
      style={[
        styles.section,
        borderBottom && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack },
      ]}
    >
      <View style={styles.sectionHeader}>
        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setActiveTimeline(0)}
            style={{ paddingRight: 10 }}
            hitSlop={{ top: 12, left: 20, bottom: 12 }}
          >
            <Text style={activeTimeline === 0 ? styles.selectedButton : styles.nonSelectedButton}>For you</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setActiveTimeline(1)}
            style={{ paddingHorizontal: 10 }}
            hitSlop={{ top: 12, bottom: 12, right: 20 }}
          >
            <Text style={activeTimeline === 1 ? styles.selectedButton : styles.nonSelectedButton}>Following</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setActiveTimeline(2)}
          style={{ paddingLeft: 20 }}
          hitSlop={{ top: 12, left: 20, bottom: 12, right: 20 }}
        >
          <Text style={activeTimeline === 2 ? styles.selectedButton : styles.nonSelectedButton2}>My Goals</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedButton: {
    ...defaultStyles.largeBoldDisplay,
    color: colors.purp,
  },
  nonSelectedButton: {
    ...defaultStyles.largeBoldDisplay,
    color: colors.gray60,
  },
  nonSelectedButton2: {
    ...defaultStyles.largeBoldDisplay,
    color: colors.gray30,
  },
});

export default HomeTimelineHeader;
