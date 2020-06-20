import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import GoalsList from 'library/components/lists/GoalsList';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const SelectGoalModal = ({ navigation, route }) => {
  const { setGoal, setTopics, setSubField } = route.params;

  const handleGoalSelect = (goal) => {
    navigation.navigate('SelectGoalFieldModal', { goal, setGoal, setTopics, setSubField });
  };

  const handleCustomGoalSelect = () => {
    navigation.navigate('CustomGoalModal', { setGoal, setTopics });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <HeaderBackBlank
          navigation={navigation}
          rightComponent={<Icon name="question-circle" size={22} color={colors.iconDark} />}
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={{ width: '100%', paddingHorizontal: 5 }}>
            <View style={styles.mainTitle}>
              <Text style={defaultStyles.headerLarge}>Select a goal</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={defaultStyles.defaultMute}>Goals tell other people what you're working on.</Text>
              <Text style={{ ...defaultStyles.defaultMute, paddingTop: 1 }}>Then Ambit will suggest people to help!</Text>
            </View>
          </View>
          <GoalsList handleGoalSelect={handleGoalSelect} handleCustomGoalSelect={handleCustomGoalSelect} includeCustom />
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectGoalModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    // flex: 1,
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  mainTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  subTitle: {
    width: '100%',
    paddingBottom: 20,
  },
});
