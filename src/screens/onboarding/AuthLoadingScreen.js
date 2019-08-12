import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Query } from 'react-apollo';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

// there might be a better way to navigate from here...getting error
// "Cannot update during existing state transition...blah blah"

const AuthLoadingScreen = props => {
  const { navigation } = props;

  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <View style={styles.container}>
              <Text>Loading User...</Text>
            </View>
          );
        }

        if (error) {
          console.log('ERROR LOADING USER:', error.message);
        }

        if (data) {
          const currentUser = data.userLoggedIn;

          // if we returned an actual user that means a token was in storage...navigate to Main app
          if (currentUser && currentUser.id) {
            navigation.navigate('Main', { currentUser });
          }

          // if currentUser is null that means a token was not in storage...navigate to Auth Navigator
          if (currentUser === null) {
            navigation.navigate('Benefits1');
          }
        }

        return (
          <View style={styles.container}>
            <Text>Loading Userrr...</Text>
          </View>
        );
      }}
    </Query>
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
