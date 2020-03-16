import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';

import ProfilePic from 'library/components/UI/ProfilePic';

const ChatListItem = ({ navigation, group, userLoggedIn, currentTime }) => {
  const users = group.users.filter(user => user.id !== userLoggedIn.id);
  const otherUser = users[0];
  // console.log(group);

  const updatedAt = new Date(group.latestMessage.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, updatedAt);

  const unReadMessageGroupIDs = userLoggedIn.unReadMessages.map(unRead => unRead.to.id);
  const hasUnread = unReadMessageGroupIDs.includes(group.id);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate('Chat', { otherUserPassedIn: otherUser })}
    >
      <View style={styles.group}>
        <View style={styles.leftSide}>
          <ProfilePic size={46} navigation={navigation} user={otherUser} />
        </View>
        <View style={styles.rightSide}>
          <View style={styles.topRow}>
            <Text style={{ ...defaultStyles.largeSemibold }}>{otherUser.name}</Text>
            <Text style={defaultStyles.defaultMute}>
              {timeDiff} {period}
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...defaultStyles.largeMute }}>{group.latestMessage.content}</Text>
            </View>
            <View style={{ width: 20, justifyContent: 'center' }}>{hasUnread && <View style={styles.redDot} />}</View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  group: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  leftSide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 76,
    paddingLeft: 4,
  },
  rightSide: {
    flex: 1,
    paddingRight: 15,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 5,
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.peach,
    alignSelf: 'center',
  },
});

export default ChatListItem;
