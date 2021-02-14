import React, { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CURRENT_USER_UNREAD from 'library/queries/CURRENT_USER_UNREAD';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

const MessagesDot = ({ color }) => {
  const navigation = useNavigation();

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
    <TouchableOpacity onPress={() => navigation.navigate('Convos')} hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}>
      <View style={{ position: 'relative', paddingLeft: 8, paddingRight: 1 }}>
        <View style={styles.iconCircle}>
          <Ionicons name="ios-chatbubble-ellipses" size={20} color={colors.black} style={{ paddingLeft: 1 }} />
        </View>
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dotBorder: {
    padding: 2,
    backgroundColor: 'white',
    position: 'absolute',
    top: -7,
    right: -8,
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
  iconCircle: {
    height: 34,
    width: 34,
    borderRadius: 17,
    backgroundColor: colors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessagesDot;
