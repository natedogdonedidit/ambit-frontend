import React from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
// import { Query } from 'react-apollo';

// import CURRENT_USER_QUERY from '../queries/CURRENT_USER_QUERY';

// import LogoutButton from './LogoutButton';

const CustomDrawer = props => {
  // console.log(props);

  const { navigation } = props;
  // const { isLoggedIn, currentUser } = props.screenProps;

  // set name
  // let name = 'Foodmap';
  // if (isLoggedIn && currentUser) name = currentUser.name;

  return (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Name</Text>
        </View>
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
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
