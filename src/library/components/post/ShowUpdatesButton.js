import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ShowUpdatesButton = ({ navigation, post }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
      style={{ flexDirection: 'row', backgroundColor: 'white' }}
    >
      <View style={styles.leftColumn}>
        <View style={styles.threadLineTop} />
        <View style={styles.threadLineDot} />
        <View style={styles.threadLineDot} />
        <View style={styles.threadLineDot} />
        <View style={styles.threadLineBottom} />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
        style={{ justifyContent: 'center', paddingBottom: 15 }}
      >
        <Text style={{ ...defaultStyles.largeRegular, color: colors.iosBlue }}>Show previous updates</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  threadLineTop: {
    width: 2,
    height: 10,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: colors.iconGray,
    opacity: 0.6,
  },
  threadLineDot: {
    width: 2,
    height: 2,
    marginTop: 3,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: colors.iconGray,
    opacity: 0.6,
  },
  threadLineBottom: {
    width: 2,
    height: 25,
    marginTop: 3,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    backgroundColor: colors.iconGray,
    opacity: 0.6,
  },
  leftColumn: {
    alignItems: 'center',
    paddingLeft: 4,
    width: 76,
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-start',
    paddingBottom: 8,
  },
});

export default ShowUpdatesButton;
