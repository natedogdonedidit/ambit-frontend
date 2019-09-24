/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TimelineTabs = ({ height, tabState, setTabState, setNewPostModalVisible }) => {
  const tabNames = ['Global', 'Local', 'Following', 'Hot'];

  const [widthAnim] = useState(new Animated.Value(0));

  // const widthAnim = new Animated.Value(0);

  useEffect(() => {
    // setWidthAnim(0);
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
        // speed: 1,
        // bounciness: 0,
        // stiffness: 300,
        // damping: 100,
        // mass: 1,
      }),
    ]).start();
  }, [tabState]);

  const renderTabs = () => {
    return tabNames.map((tabName, i) => {
      return (
        <TouchableOpacity key={i} onPress={() => setTabState(i)}>
          <View style={{ justifyContent: 'center' }}>
            <View style={tabState === i ? styles.tabSelected : styles.tab}>
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
                  // borderRadius: 2,
                  // backgroundColor: colors.purp,
                }}
              >
                <Animated.View
                  style={{
                    height: '100%',
                    width: widthAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                    // borderRadius: 2,
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
    <View style={{ ...styles.container }}>
      <View style={{ ...styles.tabs, height }}>{renderTabs()}</View>
    </View>
  );
};

export default TimelineTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    // backgroundColor: 'white',
    backgroundColor: colors.lightLightGray,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tabs: {
    flexDirection: 'row',
    // paddingLeft: 20,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    // width: 80,
    // paddingRight: 30,
    height: '100%',
  },
  tabSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    // width: 80,
    // paddingRight: 30,
    height: '100%',
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
    opacity: 0.6,
    // paddingLeft: 15,
    // paddingRight: 15,
    // marginRight: 12,
  },
  tabSelectedText: {
    ...defaultStyles.defaultSemibold,
    color: colors.purp,
    // paddingLeft: 15,
    // paddingRight: 15,
    // marginRight: 12,
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
