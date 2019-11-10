import React, { useState } from 'react';
import { StyleSheet, Modal, View, ScrollView, StatusBar, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { industryList, freelanceList, investmentMarkets } from 'library/utils/lists';
import { getPrimaryColor, getBackgroundColor, getIcon } from 'library/utils';

import HeaderWhite from 'library/components/headers/HeaderWhite';
// import GoalSelect from 'library/components/UI/GoalSelect';

const SelectGoalModal = ({ navigation }) => {
  const goal = navigation.getParam('goal');
  const field = navigation.getParam('field');
  const setField = navigation.getParam('setField');
  const [selectedCategory, setSelectedCategory] = useState('');

  const pickHeadingText = (goal = '') => {
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
      case 'Get advice':
        return null;
      case 'Get feedback':
        return null;
      default:
        return null;
    }
  };

  const headerText = pickHeadingText(goal);

  const handleFieldSelect = fieldText => {
    setField(fieldText);
    navigation.goBack();
  };

  const renderList = () => {
    if (goal === 'Find business partners' || goal === 'Find a mentor' || goal === 'Network') {
      return industryList.map(listItem => {
        const isSelected = listItem === field;

        return (
          <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => handleFieldSelect(listItem)}>
            <View style={{ ...styles.itemRow, borderColor: getPrimaryColor(goal) }}>
              <Text style={{ ...defaultStyles.largeLight, color: getPrimaryColor(goal) }}>{listItem}</Text>
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
        const isSelected = listItem === field;

        return (
          <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => handleFieldSelect(listItem)}>
            <View style={{ ...styles.itemRow, borderColor: getPrimaryColor(goal) }}>
              <Text style={{ ...defaultStyles.largeLight, color: getPrimaryColor(goal) }}>{listItem}</Text>
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
            <Text style={{ ...defaultStyles.largeLight, flex: 1 }}>{item.category}</Text>
          </View>
          {isSelected && renderFreelanceItem(item)}
        </TouchableOpacity>
      );
    });
  };

  const renderFreelanceItem = item => {
    return item.list.map(listItem => {
      const isSelected = listItem === field;

      return (
        <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => handleFieldSelect(listItem)}>
          <View style={{ ...styles.itemRow, borderColor: getPrimaryColor(goal) }}>
            <Text style={{ ...defaultStyles.largeLight, color: getPrimaryColor(goal) }}>{listItem}</Text>
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
        <HeaderWhite handleLeft={navigation.goBack} handleRight={null} textLeft="Back" textRight="" title="" />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ width: '100%', paddingHorizontal: 40, paddingTop: 30, paddingBottom: 20, alignItems: 'center' }}>
            {getIcon(goal, 40)}
            <Text
              style={{
                ...defaultStyles.hugeSemibold,
                textAlign: 'center',
                paddingTop: 20,
              }}
            >
              {headerText}
            </Text>
          </View>

          <View style={{ paddingHorizontal: 15 }}>
            {goal === 'Find freelancers' || goal === 'Find agencies' ? renderFreelanceCat() : renderList()}
          </View>
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

  // container: {
  //   backgroundColor: 'white',
  //   justifyContent: 'space-between',
  //   height: '100%',
  // },
  // content: {
  //   backgroundColor: 'white',
  //   padding: 15,
  //   paddingTop: 20,
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  // },
  // titleView: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingBottom: 20,
  //   marginBottom: 10,
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  //   borderBottomColor: colors.borderBlack,
  // },
  sectionHeader: {
    paddingLeft: 35,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 15,
  },
  // goals: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   marginBottom: 25,
  // },
  // goal: {
  //   marginRight: 10,
  //   marginTop: 10,
  // },

  // categories
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  circleNumber: {
    height: '100%',
    justifyContent: 'center',
  },
  // items
  // itemRow: {
  //   width: '100%',
  //   height: 40,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 10,
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderColor: colors.borderBlack,
  //   marginBottom: 15,
  // },
});
