import React, { useEffect, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import { UserContext } from 'library/utils/UserContext';
import { getToken } from 'library/utils/authUtil';

const AuthLoadingScreen = props => {
  const { navigation } = props;
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  const { setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();

      if (!token) {
        setCurrentUser(null);
        navigation.navigate('Benefits1');
      }

      if (token && data && !loading && !error) {
        setCurrentUser(data.userLoggedIn);
        navigation.navigate('Main');
      }
    };

    fetchToken();
  });

  if (error) {
    console.log('ERROR LOADING USER:', error.message);
    return `Error! ${error}`;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Loading User...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#9CD6A4',
    padding: 20,
  },
});

AuthLoadingScreen.navigationOptions = {
  title: 'Auth Loading Screen',
};

export default AuthLoadingScreen;
