import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Blank = () => {
  const navigation = useNavigation();

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default Blank;
