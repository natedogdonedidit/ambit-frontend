import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderMessages from 'library/components/headers/HeaderMessages';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import HeaderNotifications from '../../library/components/headers/HeaderNotifications';

const MessagesScreen = ({ navigation }) => {
  // HOOKS
  const currentTime = new Date();

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  if (loadingUser) return <Loader backgroundColor={colors.lightGray} loading={loadingUser} />;
  const { userLoggedIn } = dataUser;

  // const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
  //   // fetchPolicy: 'cache-and-network',
  //   // notifyOnNetworkStatusChange: true,
  //   variables: { id: postToQuery.id },
  // });

  // if (error) return <Error error={error} />;
  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <HeaderMessages navigation={navigation} />
  //       <Loader loading={loading} full={false} backgroundColor={colors.lightGray} />
  //     </View>
  //   );
  // }

  // const chats = data.singlePost.post || null;

  // CUSTOM FUNCTIONS

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNotifications
        user={userLoggedIn}
        handleMiddle={() => null}
        handleRight={() => navigation.navigate('Search')}
        navigation={navigation}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: colors.lightGray,
  },
});

export default MessagesScreen;
