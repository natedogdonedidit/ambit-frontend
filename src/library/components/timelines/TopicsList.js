import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';

const TopicsList = ({ activeTopic, navigation, scrollY, paddingTop }) => {
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        contentContainerStyle={{ paddingTop: paddingTop + 5, paddingBottom: 20 }}
        style={styles.timeline}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        data={topicsList}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          const { name, topicID, children } = item;

          return (
            <View key={topicID} style={styles.categorySection}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Topic', { topicID })}>
                <View style={{ ...styles.mainRow }}>
                  <Text
                    style={{
                      ...defaultStyles.largeMedium,
                      color: colors.blueGray,
                      paddingLeft: 15,
                      paddingRight: 15,
                      flex: 1,
                    }}
                  >
                    {name}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categorySection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  mainRow: {
    flexDirection: 'row',
    width: '100%',
    height: 42,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  timeline: {
    backgroundColor: colors.lightGray,
    // height: '100%',
    flex: 1,
    width: '100%',
  },
});

export default TopicsList;
