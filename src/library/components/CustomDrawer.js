import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from 'library/utils/UserContext';
import ProfilePic from 'library/components/UI/ProfilePic';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { VERSION } from 'styles/constants';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const CustomDrawer = ({ navigation }) => {
  const { logoutCTX } = useContext(UserContext);
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    onError: () => handleLogout(),
  });

  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;

  const handleLogout = async () => {
    try {
      // attempt to sign out (remove JWT token to storage)
      await logoutCTX();
      navigation.closeDrawer();
    } catch (e) {
      // AsyncStorage errors would lead us here
      console.log('ERROR LOGGING OUT:', e.message);
      Alert.alert('Logout failed');
    }
  };

  const { userLoggedIn } = data;
  if (!userLoggedIn) {
    handleLogout();
    return null;
  }

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.navigate('Profile', { username: userLoggedIn.username })}
        >
          <ProfilePic user={userLoggedIn} size="small" navigation={navigation} enableIntro={false} enableStory={false} />
          <Text style={{ ...defaultStyles.hugeLight, paddingLeft: 15 }}>Hi, {userLoggedIn.username}!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile', { username: userLoggedIn.username })}>
          <View style={styles.button}>
            <View style={{ width: 38, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="user" size={22} color={colors.iconGray} solid />
            </View>
            <Text style={styles.buttonText}>My Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('CreateIntroModal', { userLoggedIn });
            navigation.navigate('CameraModal', { isIntro: true });
            navigation.closeDrawer();
          }}
        >
          <View style={styles.button}>
            <View style={{ width: 38, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="bolt" size={22} color={colors.iconGray} solid />
            </View>
            <Text style={styles.buttonText}>My Intro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyTopics')}>
          <View style={styles.button}>
            <View style={{ width: 38, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="comment" size={22} color={colors.iconGray} solid />
            </View>
            <Text style={styles.buttonText}>My Topics</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyHats')}>
          <View style={styles.button}>
            <View style={{ width: 38, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="hat-cowboy-side" size={22} color={colors.iconGray} solid />
            </View>
            <Text style={styles.buttonText}>My Hats</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <View style={styles.buttonBottom}>
            <Text style={styles.buttonText}>Settings</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleLogout()}>
          <View style={styles.buttonBottom}>
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </TouchableOpacity>
        <View style={{ position: 'absolute', bottom: 15, right: 10 }}>
          <Text style={{ ...styles.buttonText, textAlign: 'right', paddingRight: 15 }}>{VERSION}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
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
    paddingLeft: 15,
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    ...defaultStyles.hugeLight,
    paddingLeft: 10,
  },
  buttonBottom: {
    width: '100%',
    padding: 15,
    paddingLeft: 0,
  },
});

CustomDrawer.navigationOptions = {
  drawerLabel: 'Drawer',
};

export default CustomDrawer;
