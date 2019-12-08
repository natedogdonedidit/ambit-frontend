/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TimelineTabs = ({ activeTimeline, setActiveTimeline, height, scrollX, horizontalScrollRef, width }) => {
  const tabNames = ['Home', 'Local', 'Topics'];

  // const [widthAnim] = useState(new Animated.Value(0));
  const UNDERLINE_WIDTH = width / 3;
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

  // const renderTabs = () => {
  //   return tabNames.map((tabName, i) => {
  //     return (
  //       <TouchableOpacity key={i} onPress={() => horizontalScrollRef.current.getNode().scrollTo({ x: i * width })}>
  //         <View style={{ justifyContent: 'center' }}>
  //           <View style={{ ...styles.tab, height }}>
  //             <Text style={activeTimeline === i ? styles.tabSelectedText : styles.tabText}>{tabName}</Text>
  //           </View>
  //           {activeTimeline === i && (
  //             <View
  //               style={{
  //                 position: 'absolute',
  //                 bottom: 0,
  //                 left: 0,
  //                 height: UNDERLINE_HEIGHT,
  //                 width: '100%',
  //                 alignItems: 'center',
  //               }}
  //             >
  //               {/* <Animated.View
  //                 style={{
  //                   height: '100%',
  //                   width: widthAnim.interpolate({
  //                     inputRange: [0, 100],
  //                     outputRange: ['0%', '100%'],
  //                   }),
  //                   backgroundColor: colors.purp,
  //                 }}
  //               /> */}
  //               <View
  //                 style={{
  //                   height: '100%',
  //                   width: '100%',
  //                   backgroundColor: colors.purp,
  //                 }}
  //               />
  //             </View>
  //           )}
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   });
  // };

  return (
    <View style={{ ...styles.tabs, height }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          setActiveTimeline(0);
          horizontalScrollRef.current.getNode().scrollTo({ x: 0 * width });
        }}
      >
        <View style={{ ...styles.tab }}>
          <Text style={activeTimeline === 0 ? styles.tabSelectedText : styles.tabText}>Home</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          setActiveTimeline(1);
          horizontalScrollRef.current.getNode().scrollTo({ x: 1 * width });
        }}
      >
        <View style={{ ...styles.tab }}>
          <Text style={activeTimeline === 1 ? styles.tabSelectedText : styles.tabText}>Local</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          setActiveTimeline(2);
          horizontalScrollRef.current.getNode().scrollTo({ x: 2 * width });
        }}
      >
        <View style={{ ...styles.tab }}>
          <Text style={activeTimeline === 2 ? styles.tabSelectedText : styles.tabText}>Topics</Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          setActiveTimeline(3);
          horizontalScrollRef.current.getNode().scrollTo({ x: 3 * width });
        }}
      >
        <View style={{ ...styles.tab }}>
          <Text style={activeTimeline === 3 ? styles.tabSelectedText : styles.tabText}>Goals</Text>
        </View>
      </TouchableOpacity> */}

      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: UNDERLINE_WIDTH,
          height: UNDERLINE_HEIGHT,
          paddingHorizontal: 15,
          transform: [
            {
              translateX: scrollX.interpolate({
                inputRange: [0, 2 * width],
                outputRange: [0, (2 * width) / 3],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <View style={{ width: '100%', height: '100%', backgroundColor: colors.purp }} />
      </Animated.View>
    </View>
  );
};

// <ScrollView contentContainerStyle={{ ...styles.tabs, height }} horizontal showsHorizontalScrollIndicator={false}>
//   {renderTabs()}
// </ScrollView>

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
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 15,
  },
  tabText: {
    ...defaultStyles.largeRegular,
    color: colors.blueGray,
  },
  tabSelectedText: {
    ...defaultStyles.largeSemibold,
    color: colors.purp,
  },
});
