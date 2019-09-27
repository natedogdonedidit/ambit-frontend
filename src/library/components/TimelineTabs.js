/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TimelineTabs = ({ tabState, setTabState }) => {
  const tabNames = ['Global', 'Local', 'Following', 'Trending'];

  const [widthAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.timing(widthAnim, {
        toValue: 0,
        duration: 0,
      }),
      Animated.spring(widthAnim, {
        toValue: 100,
        friction: 20,
        tension: 1,
        delay: 200,
      }),
    ]).start();
  }, [tabState]);

  const renderTabs = () => {
    return tabNames.map((tabName, i) => {
      return (
        <TouchableOpacity key={i} onPress={() => setTabState(i)}>
          <View style={{ justifyContent: 'center' }}>
            <View style={styles.tab}>
              <Text style={tabState === i ? styles.tabSelectedText : styles.tabText}>{tabName}</Text>
            </View>
            {tabState === i && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: 2,
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Animated.View
                  style={{
                    height: '100%',
                    width: widthAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: colors.purp,
                  }}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return <View style={styles.tabs}>{renderTabs()}</View>;
};

export default TimelineTabs;

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: 42,
    paddingHorizontal: 20,
    backgroundColor: colors.lightLightGray,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 13,
    height: '100%',
  },
  tabText: {
    ...defaultStyles.defaultSemibold,
    color: 'black',
    opacity: 0.6,
  },
  tabSelectedText: {
    ...defaultStyles.defaultSemibold,
    color: colors.purp,
  },
});
