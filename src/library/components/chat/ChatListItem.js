import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';

import ProfilePic from 'library/components/UI/ProfilePic';

const ChatListItem = ({ navigation, chat, userLoggedIn, currentTime }) => {
  const users = chat.users.filter(user => user.id !== userLoggedIn.id);
  const otherUser = users[0];
  // console.log(chat);

  const updatedAt = new Date(chat.latestMessage.createdAt);
  const { timeDiff, period } = timeDifference(currentTime, updatedAt);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate('Chat', { otherUserPassedIn: otherUser })}
    >
      <View style={styles.chat}>
        <View style={styles.leftSide}>
          <ProfilePic navigation={navigation} user={otherUser} />
        </View>
        <View style={styles.rightSide}>
          <View style={styles.topRow}>
            <Text style={{ ...defaultStyles.largeSemibold }}>{otherUser.name}</Text>
            <Text style={defaultStyles.defaultMute}>
              {timeDiff} {period}
            </Text>
          </View>

          <Text style={{ ...defaultStyles.defaultText }}>{chat.latestMessage.content}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  chat: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  leftSide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
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
    paddingBottom: 5,
  },
});

export default ChatListItem;
