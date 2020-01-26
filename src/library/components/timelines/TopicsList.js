import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';

const TopicsList = ({ activeTopic, navigation, scrollY, paddingTop }) => {
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        contentContainerStyle={{ paddingTop: paddingTop + 7, paddingBottom: 20 }}
        style={styles.timeline}
        showsVerticalScrollIndicator={false}
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
          const { name, topicID, icon, children } = item;

          return (
            <View key={topicID} style={styles.categorySection}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Topic', { topicID })}>
                <View style={{ ...styles.mainRow }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 50 }}>
                    <Icon name={icon || 'bolt'} size={18} color={colors.blueGray} style={{ opacity: 0.6 }} />
                  </View>

                  <Text
                    style={{
                      ...defaultStyles.largeMedium,
                      color: colors.blueGray,
                      flex: 1,
                    }}
                  >
                    {name}
                  </Text>
                  <Ionicons
                    name="ios-arrow-forward"
                    size={15}
                    color={colors.blueGray}
                    style={{ paddingHorizontal: 10, opacity: 0.6 }}
                  />
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
