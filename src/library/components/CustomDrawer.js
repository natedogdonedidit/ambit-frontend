import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { CommonActions } from '@react-navigation/native';

import { UserContext } from 'library/utils/UserContext';
import ProfilePic from 'library/components/UI/ProfilePic';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { VERSION } from 'styles/constants';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import FollowStatsDrawer from './profile/FollowStatsDrawer';

const CustomDrawer = ({ navigation }) => {
  // const client = useApolloClient();
  const { logoutCTX } = useContext(UserContext);
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    onError: () => handleLogout(),
  });

  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;

  const handleLogout = async () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );

      // attempt to sign out (remove JWT token to storage)
      await logoutCTX();
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
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.navigate('Profile', { username: userLoggedIn.username })}
          activeOpacity={0.6}
        >
          <ProfilePic user={userLoggedIn} size="drawer" navigation={navigation} enableIntro={false} enableStory={false} />
          <View style={{ justifyContent: 'flex-end' }}>
            <Text style={{ ...defaultStyles.largeBold, paddingLeft: 12, paddingTop: 8, fontSize: 16 }}>{userLoggedIn.name}</Text>
            <Text style={{ ...defaultStyles.largeMute, paddingLeft: 12, paddingTop: 2, fontSize: 16 }}>
              @{userLoggedIn.username}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingLeft: 21, paddingTop: 0, paddingBottom: 10 }}>
          <FollowStatsDrawer username={userLoggedIn.username} navigation={navigation} />
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('Profile', { username: userLoggedIn.username })}>
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="user" size={22} color={colors.blueGray} />
            </View>
            <Text style={styles.buttonText}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            // navigation.navigate('CreateIntroModal', { userLoggedIn });
            navigation.navigate('CameraModal', { isIntro: true });
            navigation.closeDrawer();
          }}
        >
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="play-circle-outline" size={26} color={colors.blueGray} />
            </View>
            <Text style={styles.buttonText}>Your Intro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('MyTopics')}>
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="chatbubbles-outline" size={24} color={colors.blueGray} />
            </View>
            <Text style={styles.buttonText}>Topics</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('MyHats')}>
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="smile" size={22} color={colors.blueGray} />
            </View>
            <Text style={styles.buttonText}>Hats</Text>
          </View>
        </TouchableOpacity>
        <View style={{ position: 'absolute', bottom: 15, right: 10 }}>
          <Text style={{ ...defaultStyles.smallMute, textAlign: 'right', paddingRight: 10 }}>{VERSION}</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.6} onPress={handleLogout} style={styles.buttonBottom}>
        <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="log-out-outline" size={22} color={colors.blueGray} />
        </View>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 4,
  },
  name: {
    padding: 10,
    fontSize: 14,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 21,
    // marginBottom: 15,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
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
    ...defaultStyles.hugeRegular,
    paddingLeft: 18,
    color: colors.blueGray,
  },
  buttonBottom: {
    paddingLeft: 15,
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: colors.borderBlack,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  // buttonBottom: {
  //   flexDirection: 'row',
  //   padding: 15,
  //   paddingLeft: 8,
  //   borderTopColor: colors.borderBlack,
  //   borderTopWidth: StyleSheet.hairlineWidth,
  // },
});

CustomDrawer.navigationOptions = {
  drawerLabel: 'Drawer',
};

export default CustomDrawer;
