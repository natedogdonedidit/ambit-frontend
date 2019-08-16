import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';

import { UserContext } from 'library/utils/UserContext';

const CustomDrawer = props => {
  const { logoutCTX, currentUser } = useContext(UserContext);

  const { navigation } = props;

  const handleLogout = async () => {
    try {
      // attempt to sign out (remove JWT token to storage)
      await logoutCTX();
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
          <Text style={styles.headerText}>{currentUser ? currentUser.name : 'Name'}</Text>
        </View>
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile', { profileId: currentUser.id })}
          >
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
