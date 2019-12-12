import React, { useState } from 'react';
import { StyleSheet, Modal, View, ScrollView, StatusBar, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList, freelanceList, investmentMarkets } from 'library/utils/lists';
import { getPrimaryColor, getBackgroundColor, getIcon } from 'library/utils';

import HeaderWhite from 'library/components/headers/HeaderWhite';
// import GoalSelect from 'library/components/UI/GoalSelect';

const SelectGoalModal = ({ navigation }) => {
  const goal = navigation.getParam('goal');

  const topicSelected = navigation.getParam('topic');
  const setTopic = navigation.getParam('setTopic');

  const subTopicSelected = navigation.getParam('subTopic');
  const setSubTopic = navigation.getParam('setSubTopic');

  const [selectedCategory, setSelectedCategory] = useState('');

  const pickHeadingText = () => {
    switch (goal) {
      case '':
        return null;
      case 'Find investors':
        return 'What market is your investment opportunity?';
      case 'Find freelancers':
        return 'Select a freelance category';
      case 'Find agencies':
        return 'Select an agency category';
      case 'Find business partners':
        return 'Which industry are you looking for business partners in?';
      case 'Find a mentor':
        return 'Which industry are you looking for mentors in?';
      case 'Network':
        return 'Which industry are you looking to network in?';
      case 'Get coffee':
        return 'Which industry are you looking to network in?';
      case 'Get advice':
        return 'Which topic do you need advice about?';
      case 'Get feedback':
        return 'Which topic best fits your project?';
      default:
        return null;
    }
  };

  const headerText = pickHeadingText(goal);

  const handleTopicSelect = topicText => {
    setTopic(topicText);
    navigation.goBack();
  };

  const renderList = () => {
    if (
      goal === 'Find business partners' ||
      goal === 'Find a mentor' ||
      goal === 'Network' ||
      goal === 'Get coffee' ||
      goal === 'Get advice' ||
      goal === 'Get feedback'
    ) {
      return topicsList.map(({ topic, subTopics }) => {
        const isSelected = topic === topicSelected;

        return (
          <TouchableOpacity key={topic} activeOpacity={0.8} onPress={() => handleTopicSelect(topic)}>
            <View style={{ ...styles.itemRow, borderColor: getPrimaryColor(goal) }}>
              <Text style={{ ...defaultStyles.largeRegular, color: getPrimaryColor(goal) }}>{topic}</Text>
              {isSelected && (
                <View style={{ height: 40, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
                  <Icon name="check" size={20} color={getPrimaryColor(goal)} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      });
    }

    if (goal === 'Find investors') {
      return investmentMarkets.map(listItem => {
        const isSelected = listItem === topicSelected;

        return (
          <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => handleTopicSelect(listItem)}>
            <View style={{ ...styles.itemRow, borderColor: getPrimaryColor(goal) }}>
              <Text style={{ ...defaultStyles.largeRegular, color: getPrimaryColor(goal) }}>{listItem}</Text>
              {isSelected && (
                <View style={{ height: 40, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
                  <Icon name="check" size={20} color={getPrimaryColor(goal)} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      });
    }
  };

  // for freelance  & agency stuff
  const renderFreelanceCat = () => {
    return freelanceList.map(item => {
      const isSelected = item.category === selectedCategory;

      return (
        <TouchableOpacity
          key={item.category}
          onPress={() => setSelectedCategory(selectedCategory === item.category ? '' : item.category)}
        >
          <View style={styles.categoryRow}>
            <Icon name={item.logo} size={20} color={colors.peach} style={{ paddingRight: 15 }} />
            <Text style={{ ...defaultStyles.largeRegular, flex: 1 }}>{item.category}</Text>
          </View>
          {isSelected && renderFreelanceItem(item)}
        </TouchableOpacity>
      );
    });
  };

  const renderFreelanceItem = item => {
    return item.list.map(listItem => {
      const isSelected = listItem === topicSelected;

      return (
        <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => handleTopicSelect(listItem)}>
          <View style={{ ...styles.itemRow, borderColor: getPrimaryColor(goal) }}>
            <Text style={{ ...defaultStyles.largeRegular, color: getPrimaryColor(goal) }}>{listItem}</Text>
            {isSelected && (
              <View style={{ height: 40, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
                <Icon name="check" size={20} color={colors.peach} />
              </View>
            )}
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
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          >
            <Icon name="chevron-left" size={22} color={colors.iconDark} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: getBackgroundColor(goal),
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            {getIcon(goal, 40)}
          </View>
          <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  ...defaultStyles.headerMedium,
                }}
              >
                {headerText}
              </Text>
              {/* <Icon name="question-circle" size={22} color={colors.iconDark} /> */}
            </View>

            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8, paddingBottom: 34 }}>
              This will be used to connect you with the right people
            </Text>
          </View>

          <View>{goal === 'Find freelancers' || goal === 'Find agencies' ? renderFreelanceCat() : renderList()}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectGoalModal;

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
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 15,
  },

  // categories
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
});
