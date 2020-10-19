import React, { useState, useEffect, useMemo, useContext } from 'react';
import { StyleSheet, View, Text, Animated, TouchableOpacity, FlatList, SectionList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery, useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList, allTopicsArray } from 'library/utils/lists';
import { getParentTopicID, getIconID, getTopicFromID } from 'library/utils';
import Section from 'library/components/UI/Section';
import TextButton from 'library/components/UI/buttons/TextButton';

import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import Loader from 'library/components/UI/Loader';
import { UserContext } from 'library/utils/UserContext';
import EDIT_TOPICS_MUTATION from 'library/mutations/EDIT_TOPICS_MUTATION';
import RecommendedTopic from 'library/components/topics/RecommendedTopic';
import ButtonDefault from '../UI/buttons/ButtonDefault';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const TopicsHome = ({ navigation, scrollY, paddingTop }) => {
  const { currentUserId } = useContext(UserContext);
  // QUERY TO GET USERS TOPICS
  const { loading, error, data } = useQuery(CURRENT_USER_TOPICS);

  const topicsIDonly = useMemo(() => {
    if (data && data.userLoggedIn && data.userLoggedIn.topicsFocus) {
      return data.userLoggedIn.topicsFocus.map((topic) => topic.id);
    }
    return [];
  }, [data]);

  const [updateOneUser] = useMutation(EDIT_TOPICS_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
    refetchQueries: () => [{ query: CURRENT_USER_TOPICS }],
  });

  // //////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleFollow = (selectedTopicID) => {
    requestAnimationFrame(() => {
      // run the mutation
      updateOneUser({
        variables: {
          where: { id: currentUserId }, // userLoggedIn
          data: {
            topicsFocus: { connect: [{ id: selectedTopicID }] },
          },
        },
      });
    });
  };

  // compiles the list of favoriteTopics whenever myTopics changes
  const favoriteTopics = useMemo(() => {
    let newFavoriteTopics = [];
    if (data) {
      const { userLoggedIn: myTopics } = data;
      if (myTopics) {
        if (myTopics.topicsFocus.length > 0) {
          newFavoriteTopics = [...newFavoriteTopics, ...myTopics.topicsFocus.map((top) => top.id)];
        }
        if (myTopics.topicsInterest.length > 0) {
          if (newFavoriteTopics === []) {
            newFavoriteTopics = [...myTopics.topicsInterest.map((top) => top.id)];
          } else {
            // only add topics that dont already exist
            myTopics.topicsInterest.forEach((topic) => {
              if (newFavoriteTopics.findIndex((favTopicID) => favTopicID === topic.id) === -1) {
                newFavoriteTopics = [...newFavoriteTopics, topic.id];
              }
            });
          }
        }
      }
    }
    return [...newFavoriteTopics];
  }, [data]);

  // add 5 random topics to recommendedTopics
  const recommendedTopics = useMemo(() => {
    const recTopics = [];

    // remove the topics we already follow
    const allTopicsArrayFiltered = allTopicsArray.filter((t) => {
      const check = favoriteTopics.findIndex((ft) => ft === t.topicID);
      return check === -1;
    });

    // add 5 topics that we don't already follow
    recTopics.push(allTopicsArrayFiltered[getRandomInt(70)]);
    recTopics.push(allTopicsArrayFiltered[getRandomInt(70)]);
    recTopics.push(allTopicsArrayFiltered[getRandomInt(70)]);
    recTopics.push(allTopicsArrayFiltered[getRandomInt(70)]);
    recTopics.push(allTopicsArrayFiltered[getRandomInt(70)]);
    return recTopics;
  }, [data]);

  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;

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
          title: 'Following',
          data: favoriteTopics,
        },
        {
          title: 'Recommended',
          data: recommendedTopics,
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
          // rightComponent={
          //   section.title === 'Following' ? <TextButton onPress={() => navigation.navigate('MyTopics')}>Edit</TextButton> : null
          // }
        />
      )}
      renderSectionFooter={({ section }) => {
        if (section.title === 'Recommended') {
          return (
            <View style={{ alignSelf: 'center', paddingTop: 30, paddingBottom: 30 }}>
              <ButtonDefault onPress={() => navigation.navigate('SelectTopicsFocusModal')}>More Topics</ButtonDefault>
            </View>
          );
        }
        return null;
      }}
      renderItem={({ item, section, index }) => {
        if (section.title === 'Following') {
          return (
            <RecommendedTopic
              key={item}
              topicID={item}
              navigation={navigation}
              showBottomBorder={index === section.data.length - 1}
            />
          );
        }
        if (section.title === 'Recommended') {
          const { topicID } = item;

          const isFollowing = topicsIDonly.includes(topicID);

          return (
            <RecommendedTopic
              key={topicID}
              topicID={topicID}
              showFollowButton
              following={isFollowing}
              handleFollow={handleFollow}
              navigation={navigation}
              showBottomBorder={index === section.data.length - 1}
            />
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
  borderBottom: {
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  addButton: {
    height: 32,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.purp,
    opacity: 0.9,
  },
  addedButton: {
    height: 32,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.purp,
  },
});

export default TopicsHome;
