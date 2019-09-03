import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const HeaderSelectGoal = ({ setGoalModalVisible }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => setGoalModalVisible(false)} style={{ width: 60 }}>
        {/* <Icon name="chevron-left" size={20} color="white" /> */}
        <Text style={{ ...defaultStyles.largeThin, color: 'white' }}>Cancel</Text>
      </TouchableOpacity>

      <Text style={{ ...defaultStyles.hugeBold, ...styles.title }}>Select a Goal</Text>

      <View style={{ width: 60 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    color: 'white',
  },
});

export default HeaderSelectGoal;
