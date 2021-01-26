import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import { UserContext } from 'library/utils/UserContext';

const MatchesDot = ({ color }) => {
  const { hasNewMatches } = useContext(UserContext);

  return (
    <View style={{ width: 32, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="user-friends" size={22} color={color} solid />
      {hasNewMatches && (
        <View style={styles.dotBorder}>
          <View style={styles.dot} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dotBorder: {
    // padding: 2,
    // backgroundColor: 'white',
    position: 'absolute',
    bottom: -10,
    left: 13,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 8,
    minWidth: 8,
    paddingHorizontal: 4,
    borderRadius: 4,
    backgroundColor: colors.peach,
  },
});

export default MatchesDot;
