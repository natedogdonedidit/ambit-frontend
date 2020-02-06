import React, { useState, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import HeaderMatches from 'library/components/headers/HeaderMatches';
import Error from 'library/components/UI/Error';
import Loader from 'library/components/UI/Loader';
import ConnectionsList from 'library/components/lists/ConnectionsList';

const ConnectionsScreen = ({ navigation }) => {
  // OTHER HOOKS
  const insets = useSafeArea();

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  if (loadingUser) return <Loader backgroundColor={colors.lightGray} loading={loadingUser} />;
  const { userLoggedIn } = dataUser;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <HeaderMatches
        user={userLoggedIn}
        handleMiddle={() => null}
        handleRight={() => navigation.navigate('Search')}
        navigation={navigation}
      />
      <View style={{ flex: 1, top: -StyleSheet.hairlineWidth }}>
        <ConnectionsList navigation={navigation} />
      </View>

      {/* Gives a solid background to the StatusBar */}
      <View
        style={{
          ...styles.statusBar,
          height: insets.top,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    overflow: 'hidden',
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: 'white',
  },
});

export default ConnectionsScreen;
