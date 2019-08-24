import React, { useState, useContext } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Alert, StatusBar } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';
import WhiteButton from 'library/components/UI/WhiteButton';
import TextButton from 'library/components/UI/TextButton';
import ProfileTabs from 'library/components/ProfileTabs';
import EditBioModal from 'library/components/EditBioModal';
import EditSkillsModal from 'library/components/EditSkillsModal';
import EditExperienceModal from 'library/components/EditExperienceModal';
import EditEducationModal from 'library/components/EditEducationModal';
import Projects from 'library/components/Projects';
import Skills from 'library/components/Skills';
import Experience from 'library/components/Experience';
import Education from 'library/components/Education';
import Loader from 'library/components/UI/Loader';
import { SafeAreaView } from 'react-navigation';

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

  // CONTEXT & USER CHECK
  const { currentUserId } = useContext(UserContext);
  const profileId = navigation.getParam('profileId', 'NO-ID');
  const isMyProfile = currentUserId === profileId;

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
      <StatusBar backgroundColor="black" barStyle="light-content" />
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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileBox}>
          <View style={styles.profilePicView}>
            <Image
              style={styles.profilePic}
              resizeMode="cover"
              source={{
                uri:
                  user.profilePic || 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg',
              }}
            />
          </View>
          <Text style={{ ...defaultStyles.h2, ...styles.name }}>{user.name}</Text>
          <Text style={{ ...defaultStyles.h3, ...styles.job }}>
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
          <Text style={{ ...defaultStyles.smallBold, ...styles.websiteFont }}>{user.website || 'wwww.mywebsite.com'}</Text>
        </View>
        <ProfileTabs tabState={tabState} setTabState={setTabState} />
        <View style={styles.content}>
          <View style={styles.contentSection}>
            <Text style={{ ...defaultStyles.defaultText }}>{user.bio}</Text>
          </View>
          <View style={{ ...styles.projectsSection }}>
            <View style={{ ...styles.contentHeader, paddingHorizontal: 20 }}>
              <Text style={{ ...defaultStyles.largeMedium }}>My Projects</Text>
              {isMyProfile && (
                <TextButton textStyle={styles.editButton} onPress={() => null}>
                  New
                </TextButton>
              )}
            </View>
            <Projects projects={user.projects} />
          </View>
          <View style={styles.contentSection}>
            <View style={{ ...styles.contentHeader, paddingBottom: 5 }}>
              <Text style={{ ...defaultStyles.largeMedium }}>Experience</Text>
              {isMyProfile && (
                <TextButton textStyle={styles.editButton} onPress={() => handleSelectExperience('new')}>
                  New
                </TextButton>
              )}
            </View>
            <Experience isMyProfile experience={user.experience} handleSelectExperience={handleSelectExperience} />
          </View>
          <View style={styles.contentSection}>
            <View style={{ ...styles.contentHeader, paddingBottom: 5 }}>
              <Text style={{ ...defaultStyles.largeMedium }}>Education</Text>
              {isMyProfile && (
                <TextButton textStyle={styles.editButton} onPress={() => handleSelectEducation('new')}>
                  New
                </TextButton>
              )}
            </View>
            <Education isMyProfile education={user.education} handleSelectEducation={handleSelectEducation} />
          </View>
          <View style={styles.contentSection}>
            <View style={{ ...styles.contentHeader, paddingBottom: 15 }}>
              <Text style={{ ...defaultStyles.largeMedium }}>Skills</Text>
              {isMyProfile && (
                <TextButton textStyle={styles.editButton} onPress={() => setModalVisibleSkills(true)}>
                  Edit
                </TextButton>
              )}
            </View>
            <Skills skills={user.skills} height={32} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {},
  profileBox: {
    backgroundColor: colors.purp,
    paddingTop: 50,
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
    marginBottom: 10,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: 'white',
    marginBottom: 5,
  },
  job: {
    color: 'white',
    fontWeight: '100',
    marginBottom: 15,
  },
  twoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  websiteFont: {
    color: 'white',
    marginBottom: 15,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: 36,
  },
  editButton: {
    fontSize: 14,
  },
  content: {
    padding: 6,
    backgroundColor: colors.lightGray,
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 6,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  projectsSection: {
    paddingTop: 12,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 6,
  },
});

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
