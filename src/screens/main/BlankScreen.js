import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Blank = ({ navigation }) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default Blank;
