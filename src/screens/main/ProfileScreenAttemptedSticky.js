import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  Alert,
  StatusBar,
  Animated,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';
import WhiteButton from 'library/components/UI/WhiteButton';
import ProfileTabs from 'library/components/ProfileTabs';
import EditBioModal from 'library/components/modals/EditBioModal';
import EditSkillsModal from 'library/components/modals/EditSkillsModal';
import EditExperienceModal from 'library/components/modals/EditExperienceModal';
import EditEducationModal from 'library/components/modals/EditEducationModal';
import Loader from 'library/components/UI/Loader';
import ProfileBio from 'library/components/ProfileBio';
import ProfilePosts from 'library/components/ProfilePosts';
import ProfileNetwork from 'library/components/ProfileNetwork';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';
const bannerExample = 'http://backgrounddownload.com/wp-content/uploads/2018/09/background-polygons-6.jpg';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ProfileScreen = ({ navigation }) => {
  // VARIABLES
  const blankExperience = {
    name: '',
    subText: '',
    location: '',
    startDateMonth: '',
    startDateYear: null,
    endDateMonth: '',
    endDateYear: null,
    currentRole: false,
  };

  // STATE
  const [tabState, setTabState] = useState(0);
  const [modalVisibleBio, setModalVisibleBio] = useState(false);
  const [modalVisibleSkills, setModalVisibleSkills] = useState(false);
  const [modalVisibleExperience, setModalVisibleExperience] = useState(false);
  const [modalVisibleEducation, setModalVisibleEducation] = useState(false);
  const [activeExperience, setActiveExperience] = useState({});
  const [activeEducation, setActiveEducation] = useState({});

  const [scrollY] = useState(new Animated.Value(0)); // change initial value

  // CONTEXT & USER CHECK
  const { currentUserId } = useContext(UserContext);
  const profileId = navigation.getParam('profileId', 'NO-ID');
  const isMyProfile = currentUserId === profileId;
  // const isMyProfile = false;

  // QUERIES
  const { loading, error, data } = useQuery(SINGLE_USER_BIO, {
    variables: { id: profileId },
  });

  if (loading) return <Loader active={loading} />;
  if (error) {
    console.log('ERROR LOADING USER:', error.message);
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>{error.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { user } = data;

  // CUSTOM FUNCTIONS
  const handleSelectExperience = id => {
    const experienceToEdit = id === 'new' ? blankExperience : user.experience.find(exp => exp.id === id);

    if (!experienceToEdit) {
      Alert.alert('Oh no!', 'We could not retrieve this experience. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      return;
    }

    setActiveExperience(experienceToEdit || blankExperience);
    setModalVisibleExperience(true);
  };

  const handleSelectEducation = id => {
    const educationToEdit = id === 'new' ? blankExperience : user.education.find(edu => edu.id === id);

    if (!educationToEdit) {
      Alert.alert('Oh no!', 'We could not retrieve this education. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      return;
    }

    setActiveEducation(educationToEdit || blankExperience);
    setModalVisibleEducation(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <Animated.ScrollView
        style={[
          {
            width: '100%',
            flex: 1,
            backgroundColor: 'white',
          },
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, HEADER_SCROLL_DISTANCE],
                  outputRange: [0, -HEADER_SCROLL_DISTANCE],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
        stickyHeaderIndices={[1]}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          y: -HEADER_MAX_HEIGHT,
        }}
      >
        <View style={{ width: '100%' }}>
          <View style={styles.profileBox}>
            <View style={{ ...styles.profilePicView }}>
              <Image
                style={{ ...styles.profilePic }}
                resizeMode="cover"
                source={{
                  uri: user.profilePic || profilePicExample,
                }}
              />
            </View>
            <Text style={{ ...defaultStyles.hugeText, ...styles.name }}>{user.name}</Text>
            <Text style={{ ...defaultStyles.defaultRegular, ...styles.job }}>
              {user.jobTitle || 'Job title'} | {user.location || 'Location'}
            </Text>
            <View style={styles.twoButtons}>
              {isMyProfile ? (
                <WhiteButton onPress={() => setModalVisibleBio(true)}>Edit Profile</WhiteButton>
              ) : (
                <>
                  <WhiteButton onPress={() => null}>Follow</WhiteButton>
                  <WhiteButton onPress={() => null}>Connect</WhiteButton>
                </>
              )}
            </View>
          </View>
        </View>

        <ProfileTabs tabState={tabState} setTabState={setTabState} />
        {tabState === 0 && (
          <ProfileBio
            isMyProfile={isMyProfile}
            user={user}
            handleSelectExperience={handleSelectExperience}
            handleSelectEducation={handleSelectEducation}
            setModalVisibleSkills={setModalVisibleSkills}
          />
        )}
        {tabState === 1 && <ProfilePosts />}
        {tabState === 2 && <ProfileNetwork />}
        <View style={{ width: '100%', height: 500, backgroundColor: 'blue' }} />
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.header,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, HEADER_SCROLL_DISTANCE],
                  outputRange: [0, -HEADER_SCROLL_DISTANCE],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      />
      <EditBioModal modalVisible={modalVisibleBio} setModalVisible={setModalVisibleBio} user={user} />
      <EditExperienceModal
        modalVisible={modalVisibleExperience}
        setModalVisible={setModalVisibleExperience}
        activeExperience={activeExperience}
        setActiveExperience={setActiveExperience}
        owner={currentUserId}
      />
      <EditEducationModal
        modalVisible={modalVisibleEducation}
        setModalVisible={setModalVisibleEducation}
        activeEducation={activeEducation}
        setActiveEducation={setActiveEducation}
        owner={currentUserId}
      />
      <EditSkillsModal modalVisible={modalVisibleSkills} setModalVisible={setModalVisibleSkills} user={user} />
      {/* <ImageBackground
        style={styles.banner}
        resizeMode="cover"
        imageStyle={{ opacity: 0.8 }}
        source={{
          uri: user.profileBanner || bannerExample,
        }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',

    backgroundColor: 'blue',
    opacity: 0.3,
  },
  // banner: {
  //   width: '100%',
  //   height: HEADER_MAX_HEIGHT,
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  // },
  profileBox: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profilePicView: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    marginBottom: 15,
    backgroundColor: 'white',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: 'white',
    marginBottom: 5,
    fontSize: 18,
  },
  job: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 20,
  },
  twoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
