/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const TopicsSelector = ({ height }) => {
  const topics = ['Trending', 'Software', 'Gaming', 'Finance', 'Real Estate'];
  const [activeTopic, setActiveTopic] = useState('Trending');

  const renderTabs = () => {
    return topics.map((topic, i) => {
      return (
        <TouchableOpacity activeOpacity={1} key={i} onPress={() => setActiveTopic(topic)}>
          <View style={{ justifyContent: 'center' }}>
            <View style={[activeTopic === topic ? { ...styles.topicSelected } : { ...styles.topic }]}>
              <Text style={activeTopic === topic ? styles.topicSelectedText : styles.topicText}>{topic}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScrollView contentContainerStyle={{ ...styles.topics, height }} horizontal showsHorizontalScrollIndicator={false}>
      {renderTabs()}
    </ScrollView>
  );
};

export default TopicsSelector;

const styles = StyleSheet.create({
  topics: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.lightLightGray,
    // backgroundColor: 'rgba(0,0,0,.02)',
    paddingHorizontal: 10,
    // backgroundColor: 'pink',
  },
  topic: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.blueGray,
    // backgroundColor: colors.lightGray,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  topicSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.purp,
    // backgroundColor: colors.lightGray,
    // backgroundColor: 'white',
    backgroundColor: colors.purp,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  topicText: {
    ...defaultStyles.defaultMedium,
    color: colors.purp,
  },
  topicSelectedText: {
    ...defaultStyles.defaultBold,
    // color: colors.purp,
    color: 'white',
  },
});
