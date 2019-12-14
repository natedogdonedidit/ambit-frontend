/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';

const TopicsSelector = ({ navigation, activeTopic, setActiveTopic, height }) => {
  const renderAllTab = () => {
    const topic = 'Trending';

    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => setActiveTopic(topic)}>
        <View style={{ justifyContent: 'center' }}>
          <View style={[activeTopic === topic ? { ...styles.topicSelected } : { ...styles.topic }]}>
            <Text style={activeTopic === topic ? styles.topicSelectedText : styles.topicText}>{topic}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTabs = () => {
    return topicsList.map((item, i) => {
      const { topic } = item;

      return (
        // <TouchableOpacity activeOpacity={1} key={i} onPress={() => setActiveTopic(topic)}>
        <TouchableOpacity activeOpacity={0.6} key={i} onPress={() => navigation.navigate('Topic', { topic })}>
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
      <View style={styles.selectIcon}>
        <Icon name="bars" size={16} color={colors.iconDark} style={{ paddingLeft: 4, paddingRight: 5 }} />
      </View>
      {renderAllTab()}
      {renderTabs()}
    </ScrollView>
  );
};

export default TopicsSelector;

const styles = StyleSheet.create({
  selectIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    // width: 28,
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
