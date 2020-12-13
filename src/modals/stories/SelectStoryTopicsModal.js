import React, { useState, useContext, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';
import { getTopicFromID } from 'library/utils';

import HeaderBack from 'library/components/headers/HeaderBack';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

const SelectStoryTopicsModal = ({ navigation, route }) => {
  const { handleSend } = route.params;
  const [selectedTopics, setSelectedTopics] = useState([]);

  // MUTATIONS

  // QUERIES
  // const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  // const { userLoggedIn } = dataUser;

  // // get topicIDs from user
  // const topicIDs = getTopicIDsFromUser(userLoggedIn);
  // // get the full topic info from each ID (including story.id)
  // const myTopics = getFullTopicListFromIDs(topicIDs);

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

  const toggleTopic = (selectedTopicID) => {
    let newArray = [...selectedTopics];
    if (newArray.includes(selectedTopicID)) {
      // remove it
      newArray = newArray.filter((topicID) => topicID !== selectedTopicID);
    } else {
      // add it
      newArray = [...newArray, selectedTopicID];
    }
    setSelectedTopics(newArray);
  };

  const renderTopics = () => {
    if (favoriteTopics.length < 1) {
      return null;
    }

    return favoriteTopics.map((topicID) => {
      const { icon, color, name } = getTopicFromID(topicID);

      const selected = selectedTopics.includes(topicID);

      return (
        <TouchableOpacity key={topicID} style={styles.topicRow} activeOpacity={0.8} onPress={() => toggleTopic(topicID)}>
          <View style={styles.leftSide}>
            <Icon name={icon || 'circle'} size={20} color={colors[color] || colors.iconGray} solid />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>{name}</Text>
          </View>
          <View style={{ width: 40 }}>
            {selected ? (
              <Icon name="check-circle" solid size={26} color={colors.purp} />
            ) : (
              <Feather name="circle" size={26} color={colors.gray24} />
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title="Tag topics"
        handleBack={navigation.goBack}
        textRight="Send"
        solidRight
        handleRight={() => handleSend(selectedTopics)}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 20 }}>
        <View style={{ paddingTop: 24, paddingBottom: 10, paddingHorizontal: 15 }}>
          <Text style={{ ...defaultStyles.largeBold, color: colors.gray40 }}>
            Would you like this post to appear on any Topic Stories?
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingLeft: 4, paddingRight: 10 }}>{renderTopics()}</ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  storyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  leftSide: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SelectStoryTopicsModal;
