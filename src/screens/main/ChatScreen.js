/* eslint-disable no-underscore-dangle */
import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import CURRENT_USER_MESSAGES from 'library/queries/CURRENT_USER_MESSAGES';
import ChatBox from 'library/components/chat/ChatBox';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import { UserContext } from 'library/utils/UserContext';

const ChatScreen = ({ navigation, route }) => {
  // PARAMS
  const { otherUserPassedIn } = route.params;

  // HOOKS
  const { currentUserId } = useContext(UserContext);

  // get the list of convos of the logged in user (includes hidden convos)
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_MESSAGES);

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
  const { convos } = userLoggedIn;

  // get Convo based on otherUserPassedIn
  const convo = convos.find((c) => {
    // get the other user in the chat
    const otherUser = c.users.find((user) => user.id !== currentUserId);

    // see if it equals the userPassedIn, if it does return the group
    return otherUser.id === otherUserPassedIn.id;
  });

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title={otherUserPassedIn.name} />
      <ChatBox
        navigation={navigation}
        convo={convo} // will be null if no convo exists
        userLoggedIn={userLoggedIn}
        otherUserPassedIn={otherUserPassedIn}
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
