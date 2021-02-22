import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

/// /////////////////////////////////////
// can be used for POST or UPDATE
/// /////////////////////////////////////

const PostHeader = ({ user, timeDiff, period }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.topRow}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate({
            name: 'Profile',
            key: `Profile:${user.username}`,
            params: { username: user.username },
          })
        }
        hitSlop={{ top: 5, left: 0, bottom: 20, right: 20 }}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <View style={styles.name}>
          <View style={{ flexShrink: 1 }}>
            <Text style={{ ...defaultStyles.largeSemibold, paddingRight: 3 }} numberOfLines={1}>
              {user.name}
              <Text style={{ ...defaultStyles.largeMute }}> @{user.username} </Text>
            </Text>
          </View>
          <View style={{ flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="circle" solid size={2} color={colors.blueGray} style={{ alignSelf: 'center', paddingRight: 5 }} />
            <Text style={{ ...defaultStyles.largeMute }} numberOfLines={1}>
              {timeDiff}
              {period}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* {!!post && !!post.goal && (
        <View>
          <Text style={{ ...defaultStyles.smallMedium, color: colors.blueGray, paddingTop: 8 }}>My goal:</Text>
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 4,
  },
  name: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 24,
    paddingBottom: 1,
  },
});

export default PostHeader;
