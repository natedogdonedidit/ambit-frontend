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
import { useSafeArea } from 'react-native-safe-area-context';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';
import WhiteButton from 'library/components/UI/WhiteButton';
import TextButton from 'library/components/UI/TextButton';
import ProfileTabs from 'library/components/ProfileTabs';
import EditBioModal from 'library/components/modals/EditBioModal';
import EditSkillsModal from 'library/components/modals/EditSkillsModal';
import EditExperienceModal from 'library/components/modals/EditExperienceModal';
import EditEducationModal from 'library/components/modals/EditEducationModal';
import Loader from 'library/components/UI/Loader';
import ProfileBio from 'library/components/ProfileBio';
import ProfilePosts from 'library/components/ProfilePosts';
import ProfileNetwork from 'library/components/ProfileNetwork';
import LargeProfilePic from 'library/components/UI/LargeProfilePic';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';
const bannerExample = 'http://backgrounddownload.com/wp-content/uploads/2018/09/background-polygons-6.jpg';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ADDED_ANIMATION_DISTANCE = 100;

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
  // const isMyProfile = currentUserId === profileId;
  const isMyProfile = false;

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

  const insets = useSafeArea();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="dark-content" />
      <View style={{ height: HEADER_MIN_HEIGHT, width: '100%' }} />
      <Animated.ScrollView
        style={[
          {
            width: '100%',
            flex: 1,
            backgroundColor: 'white',
          },
        ]}
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
        scrollEventThrottle={1}
        stickyHeaderIndices={[1]}
      >
        <View style={styles.profileBox}>
          <Text style={{ ...defaultStyles.hugeMedium, ...styles.name }}>{user.name}</Text>
          <Text style={{ ...defaultStyles.defaultText, ...styles.job }}>
            {user.jobTitle || 'Job title'} | {user.location || 'Location'}
          </Text>
          <View style={styles.stats}>
            <Text style={{ ...defaultStyles.smallMedium, marginRight: 5 }}>372</Text>
            <Text style={{ ...defaultStyles.smallLight, marginRight: 20 }}>Followers</Text>
            <Text style={{ ...defaultStyles.smallMedium, marginRight: 5 }}>32</Text>
            <Text style={{ ...defaultStyles.smallLight, marginRight: 20 }}>Connections</Text>
            <Text style={{ ...defaultStyles.smallMedium, marginRight: 5 }}>402</Text>
            <Text style={{ ...defaultStyles.smallLight, marginRight: 20 }}>Posts</Text>
          </View>
          {true && (
            <View style={styles.whiteButtons}>
              <WhiteButton active onPress={() => null}>
                Follow
              </WhiteButton>
              <WhiteButton buttonStyle={{ marginLeft: 10 }} onPress={() => null}>
                Connect
              </WhiteButton>
              <WhiteButton buttonStyle={{ marginLeft: 10 }} onPress={() => null}>
                Meet
              </WhiteButton>
            </View>
          )}

          {isMyProfile && (
            <View style={styles.editProfileButton}>
              <TextButton onPress={() => setModalVisibleBio(true)}>Edit</TextButton>
            </View>
          )}
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
        {/* <View style={{ width: '100%', height: 500, backgroundColor: 'blue' }} /> */}
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.slidingBannerView,
          {
            height: HEADER_MAX_HEIGHT + insets.top,
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
      >
        <Animated.Image
          style={{
            height: HEADER_MAX_HEIGHT + insets.top,
            width: '100%',
            opacity: scrollY.interpolate({
              inputRange: [HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + ADDED_ANIMATION_DISTANCE],
              outputRange: [1, 0.4],
              extrapolate: 'clamp',
            }),
          }}
          resizeMode="cover"
          source={{
            uri: user.profileBanner || bannerExample,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            width: '100%',
            opacity: scrollY.interpolate({
              inputRange: [HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + ADDED_ANIMATION_DISTANCE],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          }}
        >
          <Text style={{ ...defaultStyles.largeSemibold, color: 'white', padding: 10 }}>{user.name}</Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          left: 20,
          top: HEADER_MAX_HEIGHT + insets.top - 18,
          opacity: scrollY.interpolate({
            inputRange: [HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + ADDED_ANIMATION_DISTANCE],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, HEADER_MAX_HEIGHT],
                outputRange: [0, -HEADER_MAX_HEIGHT],
                extrapolate: 'clamp',
              }),
            },
            {
              scale: scrollY.interpolate({
                inputRange: [HEADER_MAX_HEIGHT - 10, HEADER_MAX_HEIGHT + 50],
                outputRange: [1, 0.1],
                extrapolate: 'clamp',
              }),
            },
          ],
          ...defaultStyles.shadow3,
        }}
      >
        <LargeProfilePic pic={user.profilePic} intro={user.intro} />
      </Animated.View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slidingBannerView: {
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  profileBox: {
    width: '100%',
    paddingTop: HEADER_SCROLL_DISTANCE + 70,
    paddingHorizontal: 20,
  },
  profilePicView: {},
  name: {
    marginBottom: 3,
  },
  job: {
    marginBottom: 15,
  },
  whiteButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  editProfileButton: {
    position: 'absolute',
    top: HEADER_SCROLL_DISTANCE + 10,
    right: 20,
  },
});

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
