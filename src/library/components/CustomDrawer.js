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
            <Text style={{ ...defaultStyles.largeBold, paddingLeft: 12, paddingTop: 2, fontSize: 16 }}>{userLoggedIn.name}</Text>
            <Text style={{ ...defaultStyles.largeMute, paddingLeft: 12, paddingTop: 2, fontSize: 16 }}>
              @{userLoggedIn.username}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingLeft: 21, paddingTop: 0 }}>
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
              <Feather name="film" size={21} color={colors.blueGray} />
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
        <View
          style={{
            height: 10,
            borderBottomColor: colors.borderBlack,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 10,
          }}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('MyInvest')}>
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="trending-up" size={22} color={colors.green} />
            </View>
            <Text style={styles.buttonText}>Invest</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('MyFreelance')}>
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="briefcase" size={22} color={colors.peach} />
            </View>
            <Text style={styles.buttonText}>Freelance</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('MyMentor')}>
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="users" size={22} color={colors.purp} />
            </View>
            <Text style={styles.buttonText}>Mentor</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('MyNetwork')}>
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="coffee" size={22} color={colors.orange} />
            </View>
            <Text style={styles.buttonText}>Network</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingTop: 10,
          borderTopColor: colors.borderBlack,
          borderTopWidth: StyleSheet.hairlineWidth,
        }}
      >
        <TouchableOpacity activeOpacity={0.6} onPress={null}>
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="target" size={22} color={colors.blueGray} />
            </View>
            <Text style={styles.buttonText}>How to use Ambit</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Ionicons name="log-out-outline" size={22} color={colors.blueGray} />
            </View>
            <Text style={styles.buttonText}>Sign out</Text>
            <View style={{ position: 'absolute', bottom: 18, right: 10 }}>
              <Text style={{ ...defaultStyles.smallMute, textAlign: 'right', paddingRight: 10 }}>{VERSION}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 21,
    paddingBottom: 20,
    paddingTop: 14,
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
    // paddingLeft: 15,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    ...defaultStyles.largeRegular,
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
