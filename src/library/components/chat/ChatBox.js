/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import colors from 'styles/colors';
import CREATE_MESSAGE_MUTATION from 'library/mutations/CREATE_MESSAGE_MUTATION';
import CREATE_MESSAGE_MISSING_CONVO_MUTATION from 'library/mutations/CREATE_MESSAGE_MISSING_CONVO_MUTATION';
import MESSAGES_CONNECTION from 'library/queries/MESSAGES_CONNECTION';
import CURRENT_USER_MESSAGES from 'library/queries/CURRENT_USER_MESSAGES';
import CLEAR_UNREAD_MESSAGES_MUTATION from 'library/mutations/CLEAR_UNREAD_MESSAGES_MUTATION';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import SharedPost from 'library/components/chat/SharedPost';
import SharedStory from 'library/components/chat/SharedStory';

const ChatBox = ({ navigation, convo = { id: null }, userLoggedIn, otherUserPassedIn }) => {
  // const client = useApolloClient();

  // GET ALL MESSAGES - THIS SHOULD HAVE ALREADY PRELOADED ON CONVOSSCREEN
  const { error: errorMessages, data, fetchMore, networkStatus, refetch: refetchChat } = useQuery(MESSAGES_CONNECTION, {
    variables: {
      where: { to: { id: { equals: convo.id } } },
      first: 20,
      orderBy: [{ createdAt: 'desc' }],
    },
    // pollInterval: 10000, // 10 seconds
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

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

  const [createOneMessageMissingConvo, { loading: loadingCreate2 }] = useMutation(CREATE_MESSAGE_MISSING_CONVO_MUTATION, {
    refetchQueries: () => [{ query: CURRENT_USER_MESSAGES }],
    onCompleted: () => {},
    onError: (error) => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to send this message. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // console.log(networkStatus);
  const loadingMessages = networkStatus === 1 || networkStatus === 2;
  const fetchingMore = networkStatus === 3;
  const refetchingChat = networkStatus === 4;
  const ok = networkStatus === 7;

  // console.log('refetchingChat', refetchingChat);

  const [updateManyMessage, { loading: clearingUnreadMessages }] = useMutation(CLEAR_UNREAD_MESSAGES_MUTATION, {
    variables: {
      where: {
        AND: [
          { to: { id: { equals: convo.id } } },
          { unread: { equals: true } },
          { from: { id: { not: { equals: userLoggedIn.id } } } },
        ],
      },
      data: {
        unread: false,
      },
    },
    refetchQueries: () => [{ query: CURRENT_USER_MESSAGES }],
    onError: (e) => {
      console.log(e);
    },
    // onCompleted: () => {
    //   // grab latest data from cache
    //   const messagesDataInCache = client.readQuery({
    //     query: MESSAGES_CONNECTION,
    //     variables: {
    //       where: { to: { id: { equals: convo.id } } },
    //     },
    //   });

    //   const messagesDataInCacheUpdated = [...messagesDataInCache.messages].map((m) => {
    //     return {
    //       ...m,
    //       unread: false,
    //     };
    //   });

    //   // update cache to set all unread to false in this convo
    //   if (messagesDataInCache && messagesDataInCache.messages && messagesDataInCache.messages.length > 0) {
    //     client.writeQuery({
    //       query: MESSAGES_CONNECTION,
    //       data: {
    //         messages: [...messagesDataInCacheUpdated],
    //       },
    //     });
    //   }
    // },
  });

  // THIS EFFECT CLEARS THE UNREAD MESSAGES WHENEVER THE PAGE IS FOCUSED
  useEffect(() => {
    navigation.addListener('focus', () => {
      if (convo && convo.id && data && data.messages && data.messages.length > 0 && !clearingUnreadMessages) {
        // clear unread messages
        updateManyMessage();
      }
    });
  }, []);

  // THIS EFFECT CLEARS THE UNREAD MESSAGES WHENEVER NEW DATA COMES IN
  useEffect(() => {
    if (convo && convo.id && data && data.messages && data.messages.length > 0 && !clearingUnreadMessages) {
      // clear unread messages
      updateManyMessage();
    }
  }, [data]);

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
    // if it is a share
    if (props && props.currentMessage && props.currentMessage.isShare) {
      const { currentMessage } = props;

      const { text } = currentMessage;

      // separate TYPE and ID from text
      const textSplit = text.split(':');
      const type = textSplit[0];
      const id = textSplit[1];

      // if is a post
      if (type === 'Post') {
        return <SharedPost navigation={navigation} message={currentMessage} />;
      }
      if (type === 'Story' || type === 'StoryItem') {
        return <SharedStory navigation={navigation} storyId={id} />;
      }

      // if is a story or storyitem
    }

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

    await createOneMessageMissingConvo({
      variables: {
        content: newMessage.text,
        to: otherUserPassedIn.id,
        from: userLoggedIn.id,
      },
    });
    refetchChat();
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
          image: message.image,
          video: message.video,
          isShare: message.isShare,
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

    await createOneMessage({
      variables: {
        content: newMessage.text,
        to: convo.id,
        from: userLoggedIn.id,
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
    refetchChat();
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
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 50 }}>
        <Loader size="small" backgroundColor="transparent" active={loadingCreate || loadingCreate2 || refetchingChat} />
      </View>
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
