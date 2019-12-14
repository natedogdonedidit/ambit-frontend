/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';

const SubTopicsSelector = ({ activeTopic, activeSubTopic, setActiveSubTopic, height }) => {
  const mainTopic = topicsList.find(item => item.topic === activeTopic);

  const renderTabs = () => {
    return mainTopic.subTopics.map((subTopic, i) => {
      // const { topic } = item;

      return (
        <TouchableOpacity activeOpacity={0.6} key={i} onPress={() => setActiveSubTopic(subTopic)}>
          <View style={{ justifyContent: 'center' }}>
            <View style={[activeSubTopic === subTopic ? { ...styles.topicSelected } : { ...styles.topic }]}>
              <Text style={activeSubTopic === subTopic ? styles.topicSelectedText : styles.topicText}>{subTopic}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={{ ...styles.topics, height }} horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.selectIcon}>
        <Icon name="bars" size={16} color={colors.iconDark} style={{ paddingLeft: 4, paddingRight: 5 }} />
      </View>
      {renderTabs()}
    </ScrollView>
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
  topics: {
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
    borderWidth: 0.5,
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
