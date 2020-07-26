import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, FlatList, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery, useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';
import { getParentTopicID, getIconID, getTopicFromID } from 'library/utils';
import Section from 'library/components/UI/Section';
import TextButton from 'library/components/UI/buttons/TextButton';

import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import Loader from 'library/components/UI/Loader';

const TopicsList = ({ navigation, scrollY, paddingTop }) => {
  // QUERY TO GET USERS TOPICS
  const { data } = useQuery(CURRENT_USER_TOPICS);

  // compiles the list of favoriteTopics whenever myTopics changes
  const favoriteTopics = useMemo(() => {
    let newFavoriteTopics = [];
    if (data) {
      const { myTopics } = data;
      if (myTopics) {
        if (myTopics.topicsFocus.length > 0) {
          newFavoriteTopics = [...newFavoriteTopics, ...myTopics.topicsFocus.map((top) => top.topicID)];
        }
        if (myTopics.topicsInterest.length > 0) {
          if (newFavoriteTopics === []) {
            newFavoriteTopics = [...myTopics.topicsInterest.map((top) => top.topicID)];
          } else {
            // only add topics that dont already exist
            myTopics.topicsInterest.forEach((topic) => {
              if (newFavoriteTopics.findIndex((favTopicID) => favTopicID === topic.topicID) === -1) {
                newFavoriteTopics = [...newFavoriteTopics, topic.topicID];
              }
            });
          }
        }
      }
    }
    return [...newFavoriteTopics];
  }, [data]);

  return (
    <SectionList
      contentContainerStyle={{ paddingTop: paddingTop + 10, paddingBottom: 20 }}
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
        { useNativeDriver: false }
      )}
      keyExtractor={(item, index) => item + index}
      sections={[
        {
          title: 'My Topics',
          data: favoriteTopics,
        },
        {
          title: 'More Topics',
          data: topicsList,
        },
      ]}
      ListEmptyComponent={
        <View>
          <Text>hey</Text>
        </View>
      }
      renderSectionHeader={({ section }) => (
        <Section
          text={section.title}
          marginTop={false}
          borderBottom={false}
          rightComponent={
            section.title === 'My Topics' ? <TextButton onPress={() => navigation.navigate('MyTopics')}>Edit</TextButton> : null
          }
        />
      )}
      renderItem={({ item, section }) => {
        if (section.title === 'My Topics') {
          const topicID = item;
          const { parentTopic, color, icon, name } = getTopicFromID(topicID);

          const isSubTopic = !!parentTopic;
          const mainTopicID = isSubTopic ? parentTopic.topicID : topicID;
          const subTopic = isSubTopic ? topicID : null;

          return (
            <View key={item} style={styles.categorySection}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Topic', { topicID: mainTopicID, subTopic })}
              >
                <View style={{ ...styles.mainRow }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 50 }}>
                    <Icon name={icon || 'bolt'} size={18} color={colors[color] || colors.iconGray} solid />
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
        }
        if (section.title === 'More Topics') {
          const { name, topicID } = item;
          const { icon, color } = getTopicFromID(topicID);

          return (
            <View key={topicID} style={styles.categorySection}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Topic', { topicID })}>
                <View style={{ ...styles.mainRow }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 50 }}>
                    <Icon name={icon || 'bolt'} size={18} color={colors[color] || colors.iconGray} solid />
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
        }
        return null;
      }}
      SectionSeparatorComponent={({ trailingSection, trailingItem }) => {
        if (trailingSection && !trailingItem) return <View style={{ height: 15 }} />;
        return null;
      }}
    />
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
    flex: 1,
    width: '100%',
  },
});

export default TopicsList;
