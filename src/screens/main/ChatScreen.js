/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import ChatBox from 'library/components/chat/ChatBox';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import { UserContext } from 'library/utils/UserContext';

const ChatScreen = ({ navigation, route }) => {
  // PARAMS
  const { otherUserPassedIn } = route.params;

  // HOOKS
  const { currentUserId } = useContext(UserContext);

  // get the list of chats of the logged in user
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);

  if (errorUser) return <Error error={errorUser} />;
  if (loadingUser) {
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title={otherUserPassedIn.name} />
        <Loader loading={loadingUser} full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }
  const { userLoggedIn } = dataUser;
  const { chats } = userLoggedIn;
  // console.log('userLoggedIn', userLoggedIn);
  // console.log('chats', chats);

  const chat = chats.find(c => {
    // get the other user in the chat
    const otherUser = c.users.find(user => user.id !== currentUserId);
    // console.log('otherUser', otherUser);

    // see if it equals the userPassedIn, if it does return the chat
    return otherUser.id === otherUserPassedIn.id;
  });

  // console.log('chat', chat);

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={otherUserPassedIn.name} />
      <ChatBox navigation={navigation} chatPassedIn={chat} userLoggedIn={userLoggedIn} otherUserPassedIn={otherUserPassedIn} />
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
