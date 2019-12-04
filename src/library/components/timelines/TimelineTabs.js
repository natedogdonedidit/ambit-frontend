/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TimelineTabs = ({ tabState, setTabState, height }) => {
  const tabNames = ['Home', 'Local', 'Topics'];

  // const [widthAnim] = useState(new Animated.Value(0));

  const UNDERLINE_HEIGHT = 2.5;

  // useEffect(() => {
  //   Animated.sequence([
  //     Animated.timing(widthAnim, {
  //       toValue: 0,
  //       duration: 0,
  //     }),
  //     Animated.spring(widthAnim, {
  //       toValue: 100,
  //       friction: 20,
  //       tension: 1,
  //       delay: 200,
  //     }),
  //   ]).start();
  // }, [tabState]);

  const renderTabs = () => {
    return tabNames.map((tabName, i) => {
      return (
        <TouchableOpacity key={i} onPress={() => setTabState(i)}>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ ...styles.tab, height }}>
              <Text style={tabState === i ? styles.tabSelectedText : styles.tabText}>{tabName}</Text>
            </View>
            {tabState === i && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: UNDERLINE_HEIGHT,
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                {/* <Animated.View
                  style={{
                    height: '100%',
                    width: widthAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                    backgroundColor: colors.purp,
                  }}
                /> */}
                <View
                  style={{
                    height: '100%',
                    width: '100%',
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

  return (
    <ScrollView contentContainerStyle={{ ...styles.tabs, height }} horizontal showsHorizontalScrollIndicator={false}>
      {renderTabs()}
    </ScrollView>
  );
};

export default TimelineTabs;

const styles = StyleSheet.create({
  tabs: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightLightGray,
    // backgroundColor: 'pink',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  tabText: {
    ...defaultStyles.defaultSemibold,
    color: colors.blueGray,
  },
  tabSelectedText: {
    ...defaultStyles.defaultBold,
    color: colors.purp,
  },
});
