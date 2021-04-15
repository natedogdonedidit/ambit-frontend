import React, { useMemo, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import POST_RETWEETS_QUERY from 'library/queries/POST_RETWEETS_QUERY';
import CURRENT_USER_FOLLOWING from 'library/queries/CURRENT_USER_FOLLOWING';

const GoalHeader = ({ goalStatus, hasUpdates = false }) => {
  if (goalStatus === 'Inactive') {
    return (
      <View style={styles.container}>
        {/* <Ionicons name="repeat-outline" size={12} color={colors.blueGray} /> */}
        <Text style={{ ...defaultStyles.smallMute, paddingLeft: 0, fontSize: 11 }}>💤</Text>
        <Text style={{ ...defaultStyles.smallSemibold, color: colors.blueGray, paddingLeft: 5 }}>Inactive Goal</Text>
      </View>
    );
  }

  if (goalStatus === 'Complete') {
    return (
      <View style={styles.container}>
        {/* <Ionicons name="repeat-outline" size={12} color={colors.blueGray} /> */}
        <Text style={{ ...defaultStyles.smallMute, paddingLeft: 0, fontSize: 11 }}>✅</Text>
        <Text style={{ ...defaultStyles.smallSemibold, color: colors.blueGray, paddingLeft: 5 }}>Completed Goal</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Ionicons name="repeat-outline" size={12} color={colors.blueGray} /> */}
      <Text style={{ ...defaultStyles.smallMute, paddingLeft: 0 }}>🚀</Text>
      <Text style={{ ...defaultStyles.smallSemibold, color: colors.blueGray, paddingLeft: 5 }}>
        {hasUpdates ? 'Goal Update' : 'New Goal'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 52,
    paddingBottom: 7,
  },
});

export default GoalHeader;
