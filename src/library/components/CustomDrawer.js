import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { CommonActions, useNavigation, DrawerActions } from '@react-navigation/native';

import { UserContext } from 'library/utils/UserContext';
import ProfilePic from 'library/components/UI/ProfilePic';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { VERSION } from 'styles/constants';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';
import FollowStatsDrawer from './profile/FollowStatsDrawer';

const CustomDrawer = () => {
  // const client = useApolloClient();
  const navigation = useNavigation();
  const { logoutCTX, activeTab } = useContext(UserContext);

  // count the number of topics that you follow to display #
  const { data: dataTopics } = useQuery(CURRENT_USER_TOPICS);
  const numInvest = useMemo(() => {
    if (
      dataTopics &&
      dataTopics.userLoggedIn &&
      dataTopics.userLoggedIn.topicsFocus &&
      Array.isArray(dataTopics.userLoggedIn.topicsFocus)
    ) {
      return dataTopics.userLoggedIn.topicsFocus.length;
    }

    return 0;
  }, [dataTopics]);
  const numFreelance = useMemo(() => {
    if (
      dataTopics &&
      dataTopics.userLoggedIn &&
      dataTopics.userLoggedIn.topicsFreelance &&
      Array.isArray(dataTopics.userLoggedIn.topicsFreelance)
    ) {
      return dataTopics.userLoggedIn.topicsFreelance.length;
    }

    return 0;
  }, [dataTopics]);
  const numMentor = useMemo(() => {
    if (
      dataTopics &&
      dataTopics.userLoggedIn &&
      dataTopics.userLoggedIn.topicsMentor &&
      Array.isArray(dataTopics.userLoggedIn.topicsMentor)
    ) {
      return dataTopics.userLoggedIn.topicsMentor.length;
    }

    return 0;
  }, [dataTopics]);
  const numNetwork = useMemo(() => {
    if (
      dataTopics &&
      dataTopics.userLoggedIn &&
      dataTopics.userLoggedIn.topicsInterest &&
      Array.isArray(dataTopics.userLoggedIn.topicsInterest)
    ) {
      return dataTopics.userLoggedIn.topicsInterest.length;
    }

    return 0;
  }, [dataTopics]);

  // get the current user
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
          onPress={() => {
            navigation.navigate(activeTab || 'HomeStack', { screen: 'Profile', params: { username: userLoggedIn.username } });
          }}
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
          <FollowStatsDrawer username={userLoggedIn.username} activeTab={activeTab} />
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate(activeTab || 'HomeStack', { screen: 'Profile', params: { username: userLoggedIn.username } });
          }}
        >
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
            navigation.navigate('StoryCameraModal', { isIntro: true });
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="film" size={21} color={colors.blueGray} />
            </View>
            <Text style={styles.buttonText}>Your Intro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate('TopicsModal')}>
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
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            navigation.navigate('MyInvest');
          }}
        >
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="trending-up" size={22} color={colors.green} />
            </View>
            <Text style={styles.buttonText}>Invest</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ ...defaultStyles.largeMedium, color: colors.green }}>{numInvest}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            navigation.navigate('MyFreelance');
          }}
        >
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="briefcase" size={22} color={colors.peach} />
            </View>
            <Text style={styles.buttonText}>Freelance</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>{numFreelance}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            navigation.navigate('MyMentor');
          }}
        >
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="users" size={22} color={colors.purp} />
            </View>
            <Text style={styles.buttonText}>Mentor</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ ...defaultStyles.largeMedium, color: colors.purp }}>{numMentor}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            navigation.navigate('MyNetwork');
          }}
        >
          <View style={styles.button}>
            <View style={{ width: 28, justifyContent: 'center', alignItems: 'center' }}>
              <Feather name="coffee" size={22} color={colors.orange} />
            </View>
            <Text style={styles.buttonText}>Network</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ ...defaultStyles.largeMedium, color: colors.orange }}>{numNetwork}</Text>
            </View>
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
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingBottom: 20,
    paddingTop: 14,
  },
  button: {
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
});

export default CustomDrawer;
