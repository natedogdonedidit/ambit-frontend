import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';

import { UserContext } from 'library/utils/UserContext';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const CustomDrawer = props => {
  const { logoutCTX } = useContext(UserContext);
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;

  const { userLoggedIn } = data;

  const { navigation } = props;

  const handleLogout = async () => {
    try {
      // attempt to sign out (remove JWT token to storage)
      await logoutCTX();
      // should make sure user is cleared from Cache CURRENT_USER_QUERY
      navigation.navigate('Auth');
    } catch (e) {
      // AsyncStorage errors would lead us here
      console.log('ERROR LOGGING OUT:', e.message);
      Alert.alert('Logout failed');
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{userLoggedIn ? userLoggedIn.name : 'Name'}</Text>
        </View>
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: userLoggedIn.id })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>My Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLogout()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Settings</Text>
            </View>
          </TouchableOpacity>
        </>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    padding: 10,
    fontSize: 14,
  },
  header: {
    width: '100%',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  headerText: {
    color: 'tomato',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
  },
  buttonText: {
    color: 'purple',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

CustomDrawer.navigationOptions = {
  drawerLabel: 'Drawer',
};

export default CustomDrawer;
