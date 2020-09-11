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

const ChatBox = ({ navigation, convo = { id: null }, userLoggedIn, otherUserPassedIn }) => {
  // MUTATIONS
  const [createOneMessage, { loading: loadingCreate }] = useMutation(CREATE_MESSAGE_MUTATION, {
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
    variables: {
      where: { to: { id: { equals: convo.id } } },
      // first: 10,
      orderBy: [{ createdAt: 'desc' }],
    },
    notifyOnNetworkStatusChange: true,
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
  // useEffect(() => {
  //   if (convo.id) {
  //     const unReadInThisConvo = [...userLoggedIn.unReadMessages].filter((message) => message.to.id === convo.id);
  //     const numToRemove = unReadInThisConvo.length;
  //     if (numToRemove > 0 && !clearingUnreadMessages) {
  //       // clearUnReadMessages({ variables: { groupID: convo.id } });
  //     }
  //   }
  // }, [convo.id, userLoggedIn.unReadMessages]);

  // console.log(networkStatus);
  // networkStatus states:
  // 1: loading
  // 2: variables changed
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  if (errorMessages) return <Error error={errorMessages} />;

  // PREPARE DATE FOR GIFTED CHAT
  const convoExists = convo.id !== null;
  const currentUserFormated = {
    _id: userLoggedIn.id,
    name: userLoggedIn.name,
    avatar: userLoggedIn.profilePic,
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

    // await createOneMessage({
    //   variables: {
    //     data: {
    //       content: newMessage.text,
    //       to: { create: { users: { connect: [{ id: userLoggedIn.id }, { id: otherUserPassedIn.id }] } } },
    //       from: { connect: { id: newMessage.user._id } },
    //     },
    //   },
    // });
    await createOneMessage({
      variables: {
        content: newMessage.text,
        to: otherUserPassedIn.id,
        from: userLoggedIn.id,
        isNew: true,
      },
    });
  };

  // console.log(!convoExists, );
  if (loadingMessages && !data) {
    return (
      <View style={styles.container}>
        <Loader loading={loadingMessages} size="small" full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }

  if (!convoExists || !data) {
    return (
      <GiftedChat
        messages={[]}
        onSend={(payload) => onSendCreate(payload)}
        user={currentUserFormated}
        renderBubble={renderBubble}
      />
    );
  }

  // IF CONVO WAS LOADED SUCCESSFULLY
  const { messages } = data; // will return null if no chat exists
  // console.log('messages', messages);

  const messageNodes = convoExists ? messages : [];
  const messagesFormated = convoExists
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

    // await createOneMessage({
    //   variables: {
    //     data: {
    //       content: newMessage.text,
    //       to: { connect: { id: convo.id } },
    //       from: { connect: { id: newMessage.user._id } },
    //     },
    //   },
    await createOneMessage({
      variables: {
        content: newMessage.text,
        to: convo.id,
        from: userLoggedIn.id,
        isNew: false,
      },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   createOneMessage: {
      //     __typename: 'Message',
      //     id: newMessage._id,
      //     createdAt: new Date(),
      //     from: {
      //       __typename: 'User',
      //       id: newMessage.user._id,
      //       name: newMessage.user.name,
      //       profilePic: newMessage.user.avatar,
      //     },
      //     to: {
      //       ...convo,
      //     },
      //     hidden: [],
      //     seen: [],
      //     content: newMessage.text,
      //   },
      // },
      // update: (proxy, { data: dataReturned }) => {
      //   const newMsg = dataReturned.createOneMessage;

      //   const previousData = proxy.readQuery({
      //     query: MESSAGES_CONNECTION,
      //     variables: { groupID: newMsg.to.id },
      //   });

      //   const newEdges = [{ node: newMsg, __typename: 'MessageEdge' }, ...previousData.messages.edges];

      //   proxy.writeQuery({
      //     query: MESSAGES_CONNECTION,
      //     variables: { groupID: newMsg.to.id },
      //     data: {
      //       messages: { ...previousData.messages, edges: newEdges },
      //     },
      //   });
      // },
    });
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messagesFormated}
        onSend={(payload) => onSend(payload)}
        user={currentUserFormated}
        renderBubble={renderBubble}
        // loadEarlier
        // isLoadingEarlier={fetchingMore}
        // onLoadEarlier={() => {
        //   console.log('load more messages now');
        //   if (ok) {
        //     const lastMessage = messageNodes[messageNodes.length - 1];
        //     fetchMore({
        //       query: MESSAGES_CONNECTION,
        //       variables: {
        //         where: { to: { id: { equals: convo.id } } },
        //         first: 10,
        //         after: { id: lastMessage.id },
        //         orderBy: [{ createdAt: 'desc' }],
        //       },
        //     });
        //   }
        // }}
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
