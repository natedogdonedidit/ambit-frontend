/* eslint-disable react/prop-types */

import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const SubTopicsSelector = ({ activeTopic, activeSubTopic, setActiveSubTopic, height }) => {
  const subTopicsScrollRef = useRef();
  const { width } = Dimensions.get('window');

  useEffect(() => {
    // tries to put the activeSubTopic at the middle of the screen. Not perfect but close.
    const index = activeTopic.children.findIndex(top => top.topicID === activeSubTopic);

    const initPad = 10 + 51; // initial horizontal padding of list + "All"
    const pad = 24 + 8; // padding of each item + marginRight
    const mult = 8; // multiplier for calibrarting textLength to pixels

    const offset = activeTopic.children.reduce((total, x, ind) => {
      if (ind < index) {
        // text length * multiplier + padding of each Topic
        const newL = x.name.length * mult + pad;
        return total + newL;
      }
      if (ind === index) {
        // add in half of the selected Topic
        const newL = x.name.length * mult + pad;
        return total + newL / 2;
      }
      return total;
    }, initPad);

    if (offset >= 0) {
      // if you dont delay it a little bit, then it wont always work
      setTimeout(() => {
        // subtract half of the window width so it appears in the middle
        subTopicsScrollRef.current.scrollToOffset({ offset: offset - width / 2 });
      }, 10);
    }
  }, [activeSubTopic, activeTopic]);

  // useEffect(() => {
  //   const index = activeTopic.children.findIndex(top => top.topicID === activeSubTopic);
  //   // const item = activeTopic.children.find(t => t.topicID === activeSubTopic);

  //   // if (item.topicID) {
  //   if (index >= 0) {
  //     // if you dont delay it a little bit, then it wont always work
  //     setTimeout(() => {
  //       subTopicsScrollRef.current.scrollToIndex({ index, viewPosition: 0.5 });
  //       // subTopicsScrollRef.current.scrollToItem({ item, viewPosition: 0.5 });
  //     }, 10);
  //   }
  // }, [activeSubTopic, activeTopic]);

  return (
    <FlatList
      ref={subTopicsScrollRef}
      style={{ height }}
      contentContainerStyle={styles.topicsList}
      horizontal
      showsHorizontalScrollIndicator={false}
      // getItemLayout={(data, index) => {
      //   // const nums = [142.5, 126.5, 128, 84, 45.5, 102.5, 86.5, 124, 62, 100.5, 113.5];
      //   const initPad = 10 + 51; // initial horizontal padding of list + "All"
      //   const pad = 24 + 8; // padding of each item + marginRight
      //   const mult = 7.4; // multiplier
      //   // eslint-disable-next-line prefer-destructuring
      //   const textLength = data[index].name.length;
      //   // console.log(data[index].name, textLength, (nums[index] - pad) / textLength, textLength * mult + pad);
      //   const offset = data.reduce((total, x, ind) => {
      //     if (ind < index) {
      //       const newL = x.name.length * mult + pad;
      //       return total + newL;
      //     }
      //     return total;
      //   }, initPad);

      //   const length = textLength * mult + pad;

      //   return { length, offset, index };
      // }}
      data={activeTopic.children}
      keyExtractor={(item, index) => item + index}
      ListHeaderComponent={
        <TouchableOpacity activeOpacity={0.6} onPress={() => setActiveSubTopic(activeTopic.topicID)}>
          <View style={{ justifyContent: 'center' }}>
            <View style={[activeSubTopic === activeTopic.topicID ? { ...styles.topicSelected } : { ...styles.topic }]}>
              <Text style={activeSubTopic === activeTopic.topicID ? styles.topicSelectedText : styles.topicText}>All</Text>
            </View>
          </View>
        </TouchableOpacity>
      }
      renderItem={({ item, i }) => {
        const { name, topicID } = item;

        const selected = activeSubTopic === topicID;

        return (
          <TouchableOpacity activeOpacity={0.6} key={i} onPress={() => setActiveSubTopic(topicID)}>
            <View style={{ justifyContent: 'center' }}>
              <View style={[selected ? { ...styles.topicSelected } : { ...styles.topic }]}>
                <Text style={selected ? styles.topicSelectedText : styles.topicText}>{name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default SubTopicsSelector;

const styles = StyleSheet.create({
  selectIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    // width: 16,
    // borderRadius: 14,
    // borderWidth: 0.5,
    // borderColor: colors.blueGray,
    backgroundColor: colors.white,
    // paddingHorizontal: 12,
    marginRight: 8,
  },
  topicsList: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: colors.lightLightGray,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  topic: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 14,
    borderWidth: 0.7,
    borderColor: colors.blueGray,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    marginRight: 8,
  },
  topicSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: colors.blueGray,
    backgroundColor: colors.blueGray,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  topicText: {
    ...defaultStyles.defaultMedium,
    color: colors.blueGray,
  },
  topicSelectedText: {
    ...defaultStyles.defaultMedium,
    color: 'white',
  },
});
