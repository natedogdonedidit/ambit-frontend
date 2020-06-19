import React from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, FlatList, SectionList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';
import { getParentTopicFromID, getIconFromID } from 'library/utils';
import Section from 'library/components/UI/Section';
import TextButton from 'library/components/UI/buttons/TextButton';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const TopicsList = ({ navigation, scrollY, paddingTop }) => {
  const { data } = useQuery(CURRENT_USER_QUERY);

  let favoritesList = [];

  const { userLoggedIn } = data;
  if (userLoggedIn) {
    if (userLoggedIn.topicsFocus.length > 0) {
      favoritesList = [...userLoggedIn.topicsFocus];
    }
    if (userLoggedIn.topicsInterest.length > 0) {
      if (favoritesList === []) {
        favoritesList = [...userLoggedIn.topicsInterest];
      } else {
        // only add topics that dont already exist
        userLoggedIn.topicsInterest.forEach((topic) => {
          if (favoritesList.findIndex((fav) => fav.topicID === topic.topicID) === -1) {
            favoritesList = [...favoritesList, topic];
          }
        });
      }
    }
  }

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
        ]
        // { useNativeDriver: true }
      )}
      keyExtractor={(item, index) => item + index}
      sections={[
        {
          title: 'My Topics',
          data: favoritesList,
        },
        {
          title: 'More Topics',
          data: topicsList,
        },
      ]}
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
          const { name, topicID } = item;
          const { icon, color } = getIconFromID(topicID);
          const parent = getParentTopicFromID(topicID);

          const isSubTopic = parent.topicID !== topicID;
          const subTopic = isSubTopic ? topicID : null;

          return (
            <View key={item} style={styles.categorySection}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Topic', { topicID: parent.topicID, subTopic })}
              >
                <View style={{ ...styles.mainRow }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 50 }}>
                    <Icon name={icon || 'bolt'} size={18} color={color || colors.iconGray} solid />
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
          const { icon, color } = getIconFromID(topicID);

          return (
            <View key={topicID} style={styles.categorySection}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Topic', { topicID })}>
                <View style={{ ...styles.mainRow }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 50 }}>
                    <Icon name={icon || 'bolt'} size={18} color={color || colors.iconGray} solid />
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
