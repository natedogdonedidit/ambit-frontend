import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CURRENT_USER_UNREAD from 'library/queries/CURRENT_USER_UNREAD';
import { useQuery } from '@apollo/client';

const EnvelopeDot = ({ color }) => {
  const { loading, error, data } = useQuery(CURRENT_USER_UNREAD);

  // UPDATE # OF UNSEEN MESSAGES EVERYTIME NEW NOTIFICATIONS DATA COMES IN
  const unReadMessagesCount = useMemo(() => {
    if (data && data.userLoggedIn && data.userLoggedIn.unReadMessagesCount) {
      // console.log('unread messages: ', data.userLoggedIn.unReadMessagesCount);
      return data.userLoggedIn.unReadMessagesCount;
    }

    return 0;
  }, [data]);

  return (
    <View style={{ width: 32, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="envelope" size={22} color={color} solid />
      {unReadMessagesCount > 0 && (
        <View style={styles.dotBorder}>
          <View style={styles.dot}>
            <Text style={{ ...defaultStyles.smallMedium, color: colors.white, textAlign: 'center' }}>
              {Math.min(unReadMessagesCount, 99)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dotBorder: {
    padding: 2,
    backgroundColor: 'white',
    position: 'absolute',
    top: -7,
    left: 18,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 18,
    minWidth: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: colors.peach,
  },
});

export default EnvelopeDot;
