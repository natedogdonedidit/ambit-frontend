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

  // GET THE FULL CONVERSATION
  const { error: errorMessages, data, fetchMore, networkStatus, loading } = useQuery(MESSAGES_CONNECTION, {
    variables: {
      where: { to: { id: { equals: convo.id } } },
      // first: 10,
      orderBy: [{ createdAt: 'desc' }],
    },
    // fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  // grab OTHER users from convo
  const users = convo.users.filter((user) => user.id !== userLoggedIn.id);
  const otherUser = users[0];

  const renderRightSide = () => {
    if (loading || errorMessages || !data) {
      // console.log(loading, errorMessages, !data);
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

    let { content } = latestMessage;

    // if it is a share, set content to 'Shared a [thing]'
    if (latestMessage.isShare) {
      // separate TYPE from text
      const textSplit = content.split(':');
      let type = textSplit[0].toLowerCase();
      if (type === 'storyitem') type = 'story';

      content = `Shared a ${type}`;
    }

    return (
      <View style={styles.rightSide}>
        <View style={styles.topRow}>
          <Text style={{ ...defaultStyles.largeSemibold }}>{otherUser.name}</Text>
          <Text style={defaultStyles.smallMute}>
            {timeDiff}
            {period}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...defaultStyles.largeMute }}>{content}</Text>
          </View>
          {/* <View style={{ width: 20, justifyContent: 'center' }}>{hasUnread && <View style={styles.redDot} />}</View> */}
        </View>
        {hasUnread && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 10,
            }}
          >
            <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: colors.red }} />
          </View>
        )}
      </View>
    );
  };

  if (!otherUser) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate({ name: 'Chat', key: `Chat:${otherUser.id}`, params: { otherUserPassedIn: otherUser } })}
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
    paddingRight: 10,
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
    paddingRight: 8,
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
