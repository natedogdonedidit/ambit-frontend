import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useApolloClient, useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';

import ProfilePic from 'library/components/UI/ProfilePic';
import MESSAGES_CONNECTION from 'library/queries/MESSAGES_CONNECTION';

const ChatListItem = ({ navigation, convo, userLoggedIn, currentTime }) => {
  // const client = useApolloClient();

  // pre-fetch conversation when messages tab is clicked
  // useEffect(() => {
  //   console.log('fetching messages for this chat', convo.id);
  //   client.query({
  //     query: MESSAGES_CONNECTION,
  //     variables: {
  //       where: { to: { id: { equals: convo.id } } },
  //       first: 10,
  //       orderBy: [{ createdAt: 'desc' }],
  //     },
  //   });
  // }, []);

  const { error: errorMessages, data, fetchMore, networkStatus, loading } = useQuery(MESSAGES_CONNECTION, {
    variables: {
      where: { to: { id: { equals: convo.id } } },
      // first: 10,
      orderBy: [{ createdAt: 'desc' }],
    },
    notifyOnNetworkStatusChange: true,
  });

  // grab users from convo
  const users = convo.users.filter((user) => user.id !== userLoggedIn.id);
  const otherUser = users[0];

  const renderRightSide = () => {
    if (loading || errorMessages || !data) {
      return (
        <View style={styles.rightSide}>
          <View style={styles.topRow}>
            <Text style={{ ...defaultStyles.largeSemibold }}>{otherUser.name}</Text>
            <Text style={defaultStyles.defaultMute}>{`${` `}`}</Text>
          </View>
          <View style={styles.bottomRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...defaultStyles.largeMute }}>{`${` `}`}</Text>
            </View>
          </View>
        </View>
      );
    }

    // grab latest message from MESSAGES_CONNECTION - this will allow it to update when new subscription message comes in
    const { messages } = data;

    const latestMessage = messages[0] || {};
    const updatedAt = new Date(latestMessage.createdAt);
    const { timeDiff, period } = timeDifference(currentTime, updatedAt);

    let hasUnread = false;

    // if latest message is not from me
    if (latestMessage && latestMessage.from.id !== userLoggedIn.id) {
      hasUnread = latestMessage.unread || false;
    }

    return (
      <View style={styles.rightSide}>
        <View style={styles.topRow}>
          <Text style={{ ...defaultStyles.largeSemibold }}>{otherUser.name}</Text>
          <Text style={defaultStyles.defaultMute}>
            {timeDiff} {period}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...defaultStyles.largeMute }}>{latestMessage.content}</Text>
          </View>
          <View style={{ width: 20, justifyContent: 'center' }}>{hasUnread && <View style={styles.redDot} />}</View>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate('Chat', { otherUserPassedIn: otherUser })}
    >
      <View style={styles.convo}>
        <View style={styles.leftSide}>
          <ProfilePic size="medium" navigation={navigation} user={otherUser} />
        </View>
        {renderRightSide()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  convo: {
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
