import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Lines = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
      <View style={{ ...styles.row, marginTop: 3 }}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 16,
  },
  line: {
    height: 7,
    width: 3,
    borderRadius: 1.5,
    backgroundColor: colors.blueGray,
  },
});

export default Lines;
