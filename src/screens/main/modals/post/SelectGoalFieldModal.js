import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, View, ScrollView, StatusBar, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList, freelanceList, investmentMarkets } from 'library/utils/lists';

// import HeaderWhite from 'library/components/headers/HeaderWhite';
// import GoalSelect from 'library/components/UI/GoalSelect';

const SelectGoalFieldModal = ({ navigation }) => {
  const goal = navigation.getParam('goal', {
    modalType: 'topic',
    logo: 'comments',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    heading: 'Select a topic',
  }); // if no goal is passed in, we're just selecting a topic
  const setGoal = navigation.getParam('setGoal');
  const setTopic = navigation.getParam('setTopic');
  const setSubField = navigation.getParam('setSubField');

  const [selectedCategories, setSelectedCategories] = useState('');
  const [activeTopic, setActiveTopic] = useState('');

  const handleTopicSelect = topicText => {
    if (!goal.name) {
      // if no goal was passed in, we're just setting the topic
      setActiveTopic(topicText);
      setTopic(topicText);
      const timeout = setTimeout(() => navigation.navigate('NewPostModal'), 300);
    } else {
      setActiveTopic(topicText);
      setGoal(goal);
      setSubField(topicText);
      if (goal.modalType === 'topic') setTopic(topicText);

      const timeout = setTimeout(() => navigation.navigate('NewPostModal'), 300);
    }
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

  const renderList = () => {
    if (goal.modalType === 'topic') {
      return topicsList.map(({ topic, subTopics }) => {
        const isSelected = topic === activeTopic;

        return (
          <TouchableOpacity key={topic} activeOpacity={0.8} onPress={() => handleTopicSelect(topic)}>
            <View style={{ ...styles.itemRow }}>
              <Text style={{ ...defaultStyles.largeRegular, color: goal.primaryColor, flex: 1 }}>{topic}</Text>
              <View style={{ height: 48, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
                <Icon
                  name={isSelected ? 'check-circle' : 'circle'}
                  size={20}
                  color={isSelected ? goal.primaryColor : colors.iconGray}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }

    if (goal.modalType === 'invest') {
      return investmentMarkets.map(listItem => {
        const isSelected = listItem === activeTopic;

        return (
          <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => handleTopicSelect(listItem)}>
            <View style={{ ...styles.itemRow }}>
              <Text style={{ ...defaultStyles.largeRegular, color: goal.primaryColor, flex: 1 }}>{listItem}</Text>
              <View style={{ height: 48, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
                <Icon
                  name={isSelected ? 'check-circle' : 'circle'}
                  size={20}
                  color={isSelected ? goal.primaryColor : colors.iconGray}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }
  };

  // for freelance  & agency stuff
  const renderFreelanceCat = () => {
    return freelanceList.map((item, i) => {
      const isSelected = selectedCategories.includes(item.category);

      return (
        <View key={item.category}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategorySelect(item.category)}>
            <View style={styles.categoryRow}>
              <View style={{ width: 40, alignItems: 'center', paddingRight: 10 }}>
                <Icon name={item.logo} size={20} color={goal.primaryColor} style={{ paddingRight: 15 }} />
              </View>

              <Text style={{ ...defaultStyles.largeRegular, flex: 1 }}>{item.category}</Text>
            </View>
          </TouchableOpacity>
          <View>{isSelected && renderFreelanceItem(item)}</View>
        </View>
      );
    });
  };

  const renderFreelanceItem = item => {
    return item.list.map(listItem => {
      const isSelected = listItem === activeTopic;

      return (
        <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => handleTopicSelect(listItem)}>
          <View style={{ ...styles.itemRow }}>
            <Text style={{ ...defaultStyles.largeRegular, color: goal.primaryColor, paddingLeft: 40, flex: 1 }}>{listItem}</Text>
            <View style={{ height: 48, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
              <Icon
                name={isSelected ? 'check-circle' : 'circle'}
                size={20}
                color={isSelected ? goal.primaryColor : colors.iconGray}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View
          style={{
            height: 46,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon name="chevron-left" size={22} color={colors.iosBlue} />
            <Text style={{ ...defaultStyles.largeMedium, color: colors.iosBlue, paddingLeft: 5 }}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1, paddingHorizontal: 15, paddingBottom: 20 }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: goal.secondaryColor,
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            <Icon name={goal.logo} solid size={40} color={goal.primaryColor} />
          </View>
          <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  ...defaultStyles.headerMedium,
                }}
              >
                {goal.heading}
              </Text>
              {/* <Icon name="question-circle" size={22} color={colors.iconDark} /> */}
            </View>

            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8, paddingBottom: 24 }}>
              {goal.name
                ? 'This info will be used to connect you with the right people'
                : "Your post will also appear on this topic's timeline"}
            </Text>
          </View>

          <View>{goal.modalType === 'specialist' ? renderFreelanceCat() : renderList()}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectGoalFieldModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flex: 1,
    width: '100%',
  },
  // items
  itemRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    paddingHorizontal: 15,
  },

  // categories
  categoryRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    paddingHorizontal: 10,
  },
});
