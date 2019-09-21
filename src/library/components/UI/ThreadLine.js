import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

const ThreadLine = ({ broke = false }) => {
  if (broke) {
    return (
      <View style={styles.threadLineView}>
        <View style={styles.leftColumn}>
          <View style={styles.threadLine} />
          <View style={styles.threadLine} />
          <View style={styles.threadLineTall} />
        </View>
        <View style={styles.rightColumn} />
      </View>
    );
  }

  return (
    <View style={styles.threadLineView}>
      <View style={styles.leftColumn}>
        <View style={styles.threadLineFull} />
      </View>
      <View style={styles.rightColumn} />
    </View>
  );
};

export default ThreadLine;

const styles = StyleSheet.create({
  threadLineView: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  threadLine: {
    marginTop: 2,
    height: 5,
    width: 5,
    borderRadius: 3,
    backgroundColor: 'black',
    opacity: 0.2,
  },
  threadLineTall: {
    marginTop: 2,
    height: 14,
    width: 5,
    borderRadius: 3,
    backgroundColor: 'black',
    opacity: 0.2,
  },
  threadLineFull: {
    height: 30,
    width: 5,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: 'black',
    opacity: 0.2,
  },
  leftColumn: {
    alignItems: 'center',
    width: 64,
    height: '100%',
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 15,
  },
});
