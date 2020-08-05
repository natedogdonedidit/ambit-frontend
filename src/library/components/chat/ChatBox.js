/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import colors from 'styles/colors';
import CREATE_MESSAGE_MUTATION from 'library/mutations/CREATE_MESSAGE_MUTATION';
import MESSAGES_CONNECTION from 'library/queries/MESSAGES_CONNECTION';
import CURRENT_USER_MESSAGES from 'library/queries/CURRENT_USER_MESSAGES';
import CLEAR_UNREAD_MESSAGES_MUTATION from 'library/mutations/CLEAR_UNREAD_MESSAGES_MUTATION';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';

const ChatBox = ({ navigation, userMessages, groupPassedIn = { id: null }, otherUserPassedIn }) => {
  // MUTATIONS
  const [createMessage, { loading: loadingCreate }] = useMutation(CREATE_MESSAGE_MUTATION, {
    refetchQueries: () => [{ query: CURRENT_USER_MESSAGES }],
    onCompleted: () => {},
    onError: (error) => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to send this message. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  const { error: errorMessages, data, fetchMore, networkStatus } = useQuery(MESSAGES_CONNECTION, {
    notifyOnNetworkStatusChange: true,
    variables: { groupID: groupPassedIn.id },
  });
  // console.log(networkStatus);
  const loadingMessages = networkStatus === 1 || networkStatus === 2;
  const fetchingMore = networkStatus === 3;
  const ok = networkStatus === 7;

  const [clearUnReadMessages, { loading: clearingUnreadMessages }] = useMutation(CLEAR_UNREAD_MESSAGES_MUTATION, {
    onError: (e) => {
      console.log(e);
    },
  });

  // THIS EFFECT CLEARS THE UNREAD MESSAGES AFTER MESSAGES CONNECTION IS LOADED
  useEffect(() => {
    if (groupPassedIn.id) {
      const unReadInThisGroup = [...userMessages.unReadMessages].filter((message) => message.to.id === groupPassedIn.id);
      const numToRemove = unReadInThisGroup.length;
      if (numToRemove > 0 && !clearingUnreadMessages) {
        clearUnReadMessages({ variables: { groupID: groupPassedIn.id } });
      }
    }
  }, [groupPassedIn.id, userMessages.unReadMessages]);

  // console.log(networkStatus);
  // networkStatus states:
  // 1: loading
  // 2: variables changed
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  if (errorMessages) return <Error error={errorMessages} />;

  // PREPARE DATE FOR GIFTED CHAT
  const groupExists = groupPassedIn.id !== null;
  const currentUserFormated = {
    _id: userMessages.id,
    name: userMessages.name,
    avatar: userMessages.profilePic,
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: colors.systemGray6,
          },
          right: {},
        }}
      />
    );
  };

  const onSendCreate = async (payload) => {
    const newMessage = payload[0];

    await createMessage({
      variables: {
        message: {
          content: newMessage.text,
          to: { create: { users: { connect: [{ id: userMessages.id }, { id: otherUserPassedIn.id }] } } },
          from: { connect: { id: newMessage.user._id } },
        },
      },
    });
  };

  // console.log(!groupExists, );
  if (loadingMessages && !data) {
    return (
      <View style={styles.container}>
        <Loader loading={loadingMessages} size="small" full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }

  if (!groupExists || !data) {
    return (
      <GiftedChat
        messages={[]}
        onSend={(payload) => onSendCreate(payload)}
        user={currentUserFormated}
        renderBubble={renderBubble}
      />
    );
  }

  // IF GROUP WAS LOADED SUCCESSFULLY
  const { messages } = data; // will return null if no chat exists
  // console.log('messages', messages);

  const messageEdges = groupExists ? messages.edges : [];
  const messageNodes = messageEdges.map((edge) => edge.node);
  const messagesFormated = groupExists
    ? messageNodes.map((message) => {
        return {
          _id: message.id,
          text: message.content,
          createdAt: message.createdAt,
          user: {
            _id: message.from.id,
            name: message.from.name,
            avatar: message.from.profilePic,
          },
        };
      })
    : [];
  // console.log('messagesFormated', messagesFormated);

  // CUSTOM FUNCTIONS
  const onSend = async (payload) => {
    const newMessage = payload[0];

    await createMessage({
      variables: {
        message: {
          content: newMessage.text,
          to: { connect: { id: groupPassedIn.id } },
          from: { connect: { id: newMessage.user._id } },
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createMessage: {
          __typename: 'Message',
          id: newMessage._id,
          createdAt: new Date(),
          from: {
            __typename: 'User',
            id: newMessage.user._id,
            name: newMessage.user.name,
            firstName: '',
            lastName: '',
            profilePic: newMessage.user.avatar,
          },
          to: {
            ...groupPassedIn,
          },
          hidden: [],
          seen: [],
          content: newMessage.text,
        },
      },
      update: (proxy, { data: dataReturned }) => {
        const newMsg = dataReturned.createMessage;

        const previousData = proxy.readQuery({
          query: MESSAGES_CONNECTION,
          variables: { groupID: newMsg.to.id },
        });

        const newEdges = [{ node: newMsg, __typename: 'MessageEdge' }, ...previousData.messages.edges];

        proxy.writeQuery({
          query: MESSAGES_CONNECTION,
          variables: { groupID: newMsg.to.id },
          data: {
            messages: { ...previousData.messages, edges: newEdges },
          },
        });
      },
    });
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messagesFormated}
        onSend={(payload) => onSend(payload)}
        user={currentUserFormated}
        renderBubble={renderBubble}
        loadEarlier={messages.pageInfo.hasNextPage}
        isLoadingEarlier={fetchingMore}
        onLoadEarlier={() => {
          if (messages.pageInfo.hasNextPage && ok) {
            fetchMore({
              query: MESSAGES_CONNECTION,
              variables: {
                groupID: groupPassedIn ? groupPassedIn.id : null,
                cursor: messages.pageInfo.endCursor,
                first: 30,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.messages.edges;
                const { pageInfo } = fetchMoreResult.messages;

                return newEdges.length
                  ? {
                      messages: {
                        __typename: previousResult.messages.__typename,
                        edges: [...previousResult.messages.edges, ...newEdges],
                        pageInfo,
                      },
                    }
                  : previousResult;
              },
            });
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default ChatBox;
