import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { goalsList } from 'library/utils/lists';

const SelectGoalModalSearch = ({ navigation }) => {
  const handleGoalSelect = navigation.getParam('handleGoalSelect');

  const onGoalSelect = goal => {
    handleGoalSelect(goal);
    navigation.goBack();
  };

  const renderList = () => {
    return goalsList.map(goal => {
      return (
        <TouchableOpacity key={goal.name} activeOpacity={0.8} onPress={() => onGoalSelect(goal.name)}>
          <View style={{ ...styles.itemRow }}>
            <View style={{ width: 50, alignItems: 'center', paddingRight: 20 }}>
              <Icon name={goal.logo} solid size={22} color={goal.primaryColor} style={{}} />
            </View>

            <Text style={{ ...defaultStyles.largeRegular, flex: 1 }}>{goal.name}</Text>
            <Ionicons name="ios-arrow-forward" size={22} color={colors.iconGray} style={{}} />
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
          <TouchableOpacity activeOpacity={0.9} onPress={() => null} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
            <Icon name="question-circle" size={22} color={colors.iconDark} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1, paddingBottom: 20, paddingTop: 10, paddingHorizontal: 10 }}>
          <View style={{ width: '100%', paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  ...defaultStyles.headerLarge,
                }}
              >
                Select a goal
              </Text>
            </View>

            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>Goals tell other people what you're working on.</Text>
            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 1, paddingBottom: 20 }}>
              Then Ambit will suggest people to help!
            </Text>
          </View>
          {renderList()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectGoalModalSearch;

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
  sectionHeader: {
    paddingLeft: 35,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 15,
  },
});
