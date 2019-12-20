import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery, useMutation } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';
import HeaderBack from 'library/components/headers/HeaderBack';

import EDIT_TOPICS_FOCUS_MUTATION from 'library/mutations/EDIT_TOPICS_FOCUS_MUTATION';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const SelectTopicsFocusModal = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState('');

  // ////////////////////////////////////////
  // QUERIES
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { userLoggedIn } = data;
  // this is the single source of truth
  const { id, topicsFocus } = userLoggedIn;

  // ////////////////////////////////////////
  // MUTATIONS
  const [editTopicsFocus, { loading: loadingEdit, error: errorEdit, data: dataEdit }] = useMutation(EDIT_TOPICS_FOCUS_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // ////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleTopicSelect = selectedTopic => {
    // build the new array of topics
    let newArray = [];
    if (topicsFocus.includes(selectedTopic)) {
      // remove it
      newArray = topicsFocus.filter(field => field !== selectedTopic);
    } else {
      // add it
      newArray = [...topicsFocus, selectedTopic];
    }

    // run the mutation
    editTopicsFocus({
      variables: {
        id,
        topics: newArray,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editTopicsFocus: {
          __typename: 'User',
          ...userLoggedIn,
          topicsFocus: newArray,
        },
      },
      update: (proxy, { data: dataReturned }) => {
        proxy.writeQuery({
          query: CURRENT_USER_QUERY,
          data: {
            userLoggedIn: dataReturned.editTopicsFocus,
          },
        });
      },
    });
  };

  const handleCategorySelect = category => {
    if (selectedCategories.includes(category)) {
      const index = selectedCategories.indexOf(category);
      if (index > -1) {
        const newArray = [...selectedCategories];
        newArray.splice(index, 1);
        setSelectedCategories(newArray);
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // ////////////////////////////////////////
  // RENDER FUNCTIONS
  const renderList = () => {
    return topicsList.map((item, i) => {
      const { topic, subTopics } = item;
      const isSelected = topicsFocus.includes(topic);
      const isExpanded = selectedCategories.includes(topic);

      return (
        <View key={`${topic}-${i}`} style={styles.categorySection}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategorySelect(topic)}>
            <View style={{ ...styles.mainRow }}>
              <Text style={{ ...defaultStyles.hugeSemibold, color: colors.purp, paddingRight: 15, flex: 1 }}>{topic}</Text>
              <Ionicons name={isExpanded ? 'ios-arrow-down' : 'ios-arrow-forward'} size={24} color={colors.iconGray} />
            </View>
          </TouchableOpacity>
          {isExpanded && subTopics.length > 0 && (
            <View style={styles.subTopicsView}>
              <TouchableOpacity key={`${i}-${topic}`} activeOpacity={0.7} onPress={() => handleTopicSelect(topic)}>
                <View style={{ ...styles.subRow }}>
                  <Text style={{ ...defaultStyles.largeMedium, color: colors.blueGray, paddingRight: 15, flex: 1 }}>
                    {topic} (general)
                  </Text>
                  {isSelected ? (
                    <View style={styles.addedButton}>
                      <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
                    </View>
                  ) : (
                    <View style={styles.addButton}>
                      <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              {renderSubtopics(subTopics)}
            </View>
          )}
        </View>
      );
    });
  };

  const renderSubtopics = subTopics => {
    return subTopics.map((subTopic, i) => {
      const isSelected = topicsFocus.includes(subTopic);

      return (
        <TouchableOpacity key={`${subTopic}-${i + 10}`} activeOpacity={0.7} onPress={() => handleTopicSelect(subTopic)}>
          <View style={{ ...styles.subRow }}>
            <Text style={{ ...defaultStyles.largeMedium, color: colors.blueGray, paddingRight: 15, flex: 1 }}>{subTopic}</Text>
            {isSelected ? (
              <View style={styles.addedButton}>
                <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
              </View>
            ) : (
              <View style={styles.addButton}>
                <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="" />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.goalPurp,
            marginTop: 10,
            marginBottom: 15,
          }}
        >
          {/* <Icon name="briefcase" size={40} color={colors.purp} /> */}
          <Ionicons name="ios-chatbubbles" size={40} color={colors.purp} />
        </View>
        <View style={{ width: '100%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text
              style={{
                ...defaultStyles.headerMedium,
              }}
            >
              Select your topics{`\n`}of focus
            </Text>
          </View>

          <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>
            We will use this data to show you interesting posts and help you grow your network
          </Text>
        </View>

        <View style={styles.listView}>{renderList()}</View>
      </ScrollView>
    </View>
  );
};

export default SelectTopicsFocusModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  listView: {
    flex: 1,
    width: '100%',
    paddingTop: 30,
  },
  categorySection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  mainRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    paddingRight: 10,
  },
  subTopicsView: {
    paddingLeft: 15,
  },
  subRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  // add button
  addButton: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.purp,
    opacity: 0.9,
  },
  addedButton: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.purp,
  },
});
