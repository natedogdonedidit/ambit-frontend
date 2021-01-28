import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NOTIFICATIONS_QUERY from 'library/queries/NOTIFICATIONS_QUERY';
import { useQuery } from '@apollo/client';
import { UserContext } from 'library/utils/UserContext';

const BellDot = ({ color }) => {
  const { currentUserId } = useContext(UserContext);

  // NOTIFICATIONS QUERY
  const { data } = useQuery(NOTIFICATIONS_QUERY, {
    variables: {
      where: { targetId: { equals: currentUserId } },
      first: 20,
      orderBy: [{ createdAt: 'desc' }],
    },
    pollInterval: 120000, // 120 seconds
    // pollInterval: 30000, // 30 seconds
  });

  // UPDATE # OF UNSEEN NOTIFICATIONS EVERYTIME NEW NOTIFICATIONS DATA COMES IN
  const unReadNotifications = useMemo(() => {
    if (data && data.notifications) {
      const numberUnread = [...data.notifications].reduce((num, notification) => {
        if (!notification.seen) return num + 1;
        return num;
      }, 0);

      return numberUnread;
    }

    return 0;
  }, [data]);

  return (
    <View style={{ width: 32, justifyContent: 'center', alignItems: 'center' }}>
      <Icon name="bell" size={22} color={color} solid />
      {unReadNotifications > 0 && (
        <View style={styles.dotBorder}>
          <View style={styles.dot}>
            <Text style={{ ...defaultStyles.smallMedium, color: colors.white, textAlign: 'center' }}>
              {Math.min(unReadNotifications, 99)}
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
    left: 17,
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

export default BellDot;
