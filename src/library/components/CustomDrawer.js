import React, { useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { useQuery } from '@apollo/react-hooks';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from 'library/utils/UserContext';
import ProfilePic from 'library/components/UI/ProfilePic';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const CustomDrawer = ({ navigation }) => {
  const { logoutCTX } = useContext(UserContext);
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;

  const { userLoggedIn } = data;

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
          <ProfilePic user={userLoggedIn} size={30} navigation={navigation} disableVideo />
          <Text style={{ ...defaultStyles.hugeLight, paddingLeft: 15 }}>Hi, {userLoggedIn.firstName}!</Text>
        </View>
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: userLoggedIn.id })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>My Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CreateIntroModal')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Record Intro</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
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
    ...defaultStyles.largeLight,
  },
});

CustomDrawer.navigationOptions = {
  drawerLabel: 'Drawer',
};

export default CustomDrawer;
