/* eslint-disable no-underscore-dangle */
import React, { useState, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import ALL_CHATS_QUERY from 'library/queries/ALL_CHATS_QUERY';
import FULL_CHAT_QUERY from 'library/queries/FULL_CHAT_QUERY';
import CREATE_MESSAGE_MUTATION from 'library/mutations/CREATE_MESSAGE_MUTATION';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import { UserContext } from 'library/utils/UserContext';

const ChatScreen = ({ navigation }) => {
  // PARAMS
  const chatPassedIn = navigation.getParam('chatPassedIn', null);

  // STATE
  const [sending, setSending] = useState(false);

  // HOOKS
  const currentTime = new Date();
  const { currentUserId } = useContext(UserContext);

  // MUTATIONS
  const [createMessage, { loading: loadingCreate }] = useMutation(CREATE_MESSAGE_MUTATION, {
    refetchQueries: () => [{ query: ALL_CHATS_QUERY }],
    onCompleted: () => {},
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to send this message. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // QUERIES
  const { loading: loadingChat, error, data, refetch, networkStatus } = useQuery(FULL_CHAT_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: { id: chatPassedIn.id },
  });
  // console.log(networkStatus);
  // networkStatus states:
  // 1: loading
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;

  // CONSTANTS
  const usersPassedIn = chatPassedIn.users.filter(user => user.id !== currentUserId);
  const userPassedIn = usersPassedIn[0];

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title={userPassedIn.name} />
        <Loader loading={loading} full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }

  const { fullChat } = data;
  const { messages, users } = fullChat;
  // console.log(fullChat);

  const currentUser = users.filter(user => user.id === currentUserId);
  const currentUserFormated = {
    _id: currentUser[0].id,
    name: currentUser[0].name,
    avatar: currentUser[0].profilePic,
  };
  // console.log('currentUserFormated', currentUserFormated);

  const messagesFormated = messages.map(message => {
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
  });
  // console.log('messagesFormated', messagesFormated);

  // CUSTOM FUNCTIONS
  const onSend = async payload => {
    const newMessage = payload[0];
    // setSending(true);

    await createMessage({
      variables: {
        message: {
          content: newMessage.text,
          chat: { connect: { id: chatPassedIn.id } },
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
      <HeaderBack navigation={navigation} title={userPassedIn.name} />
      <GiftedChat
        messages={messagesFormated}
        onSend={payload => onSend(payload)}
        user={currentUserFormated}
        // inverted={false}
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

export default ChatScreen;
