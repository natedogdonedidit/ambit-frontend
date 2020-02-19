/* eslint-disable no-underscore-dangle */
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import FULL_CHAT_QUERY from 'library/queries/FULL_CHAT_QUERY';
import CREATE_MESSAGE_MUTATION from 'library/mutations/CREATE_MESSAGE_MUTATION';
import MESSAGE_ADDED_SUBSCRIPTION from 'library/subscriptions/MESSAGE_ADDED_SUBSCRIPTION';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import { UserContext } from 'library/utils/UserContext';

const ChatBox = ({ navigation, userLoggedIn, chatPassedIn = null, otherUserPassedIn }) => {
  // HOOKS
  // const currentTime = new Date();
  // const { currentUserId } = useContext(UserContext);

  // MUTATIONS
  const [createMessage, { loading: loadingCreate }] = useMutation(CREATE_MESSAGE_MUTATION, {
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => {},
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to send this message. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // QUERIES
  const { loading: loadingChat, error, data, refetch, networkStatus: networkStatusFullChat, subscribeToMore } = useQuery(
    FULL_CHAT_QUERY,
    {
      notifyOnNetworkStatusChange: true,
      variables: { id: chatPassedIn ? chatPassedIn.id : null },
    }
  );

  // console.log(networkStatus);
  // networkStatus states:
  // 1: loading
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  const more = () =>
    subscribeToMore({
      document: MESSAGE_ADDED_SUBSCRIPTION,
      variables: { chatID: chatPassedIn ? chatPassedIn.id : '' },
      updateQuery: (previousData, { subscriptionData }) => {
        // console.log('subscriptionData', subscriptionData);
        if (!subscriptionData.data) return previousData;
        const newMessage = subscriptionData.data.messageAdded;
        // console.log('newMessage', newMessage);
        // if (mutation !== 'CREATE_MESSAGE_MUTATION') return previousData;
        const newMessagesList = [newMessage, ...previousData.fullChat.messages];
        return {
          fullChat: { ...previousData.fullChat, messages: newMessagesList },
        };
      },
    });

  useEffect(() => {
    if (chatPassedIn) {
      if (chatPassedIn.id) {
        // console.log('subscibing to', chatPassedIn.id);
        more();
      }
    }
  }, []);

  const refetching = networkStatusFullChat === 4;
  const loading = networkStatusFullChat === 1;

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <View style={styles.container}>
        <Loader loading={loading} full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }

  // PREPARE DATE FOR GIFTED CHAT
  const { fullChat } = data; // will return null if no chat exists
  const chatExists = fullChat !== null;
  const messages = chatExists ? fullChat.messages : [];
  const messagesFormated = chatExists
    ? messages.map(message => {
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

  const currentUserFormated = {
    _id: userLoggedIn.id,
    name: userLoggedIn.name,
    avatar: userLoggedIn.profilePic,
  };
  // console.log('currentUserFormated', currentUserFormated);

  // CUSTOM FUNCTIONS
  const onSend = async payload => {
    const newMessage = payload[0];
    // setSending(true);

    // if chat already exists: connect to it
    // if chat DOES NOT exist: create a new one
    const chatObject = chatExists
      ? { connect: { id: chatPassedIn.id } }
      : { create: { users: { connect: [{ id: userLoggedIn.id }, { id: otherUserPassedIn.id }] } } };

    // if chat exists use optimistic response
    if (chatExists) {
      await createMessage({
        variables: {
          message: {
            content: newMessage.text,
            chat: chatObject,
            from: { connect: { id: newMessage.user._id } },
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createMessage: {
            __typename: 'Chat',
            ...fullChat,
            messages: [
              {
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
                content: newMessage.text,
              },
              ...fullChat.messages, // older messages
            ],
          },
        },
        update: (proxy, { data: dataReturned }) => {
          proxy.writeQuery({
            query: FULL_CHAT_QUERY,
            data: {
              fullChat: dataReturned.createMessage,
            },
          });
        },
      });
    } else {
      // do not use optimistic response
      await createMessage({
        variables: {
          message: {
            content: newMessage.text,
            chat: chatObject,
            from: { connect: { id: newMessage.user._id } },
          },
        },
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   createMessage: {
        //     __typename: 'Chat',
        //     ...fullChat,
        //     users: [

        //     ],
        //     messages: [
        //       {
        //         __typename: 'Message',
        //         id: newMessage._id,
        //         createdAt: new Date(),
        //         from: {
        //           __typename: 'User',
        //           id: newMessage.user._id,
        //           name: newMessage.user.name,
        //           firstName: '',
        //           lastName: '',
        //           profilePic: newMessage.user.avatar,
        //         },
        //         content: newMessage.text,
        //       },
        //       // ...fullChat.messages, // older messages
        //     ],
        //   },
        // },
        update: (proxy, { data: dataReturned }) => {
          proxy.writeQuery({
            query: FULL_CHAT_QUERY,
            data: {
              fullChat: dataReturned.createMessage,
            },
          });
        },
      });
    }

    // setSending(false);
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: colors.systemGray6,
            // marginBottom: 6,
          },
          right: {
            // marginBottom: 6,
          },
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* <HeaderBack navigation={navigation} title={otherUserPassedIn.name} /> */}
      <GiftedChat
        messages={messagesFormated}
        onSend={payload => onSend(payload)}
        user={currentUserFormated}
        // textInputProps={{}}
        renderBubble={renderBubble}
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
