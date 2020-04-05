import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import TextButton from 'library/components/UI/buttons/TextButton';
import Projects from 'library/components/profile/Projects';
import Skills from 'library/components/profile/Skills';
import Experience from 'library/components/profile/Experience';
import Education from 'library/components/profile/Education';
import Loader from 'library/components/UI/Loader';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

const ProfileBio = ({ navigation, isMyProfile, profileId }) => {
  // QUERIES
  const { loading, error, data, refetch } = useQuery(SINGLE_USER_BIO, {
    variables: { id: profileId },
  });

  if (loading) {
    return (
      <View style={{ height: 100, marginTop: 10 }}>
        <Loader loading={loading} full={false} />
      </View>
    );
  }

  const { user } = data;

  const isFreelancer = user.topicsFreelance.length > 0;
  const isMentor = user.topicsMentor.length > 0;
  const isInvestor = user.topicsInvest.length > 0;
  const useOpenToBox = isFreelancer || isMentor || isInvestor;

  const renderOpenTo = () => {
    if (!useOpenToBox) return null;

    return (
      <Text>
        <Text style={defaultStyles.defaultMute}>💼{`  `}Open to</Text>
        {isFreelancer && <Text style={{ ...defaultStyles.defaultSemibold, color: colors.purple }}> freelance</Text>}
        {isFreelancer && isInvestor && <Text style={{ ...defaultStyles.defaultText }}>,</Text>}
        {isInvestor && <Text style={{ ...defaultStyles.defaultSemibold, color: colors.green }}> invest</Text>}
        {(isFreelancer || isInvestor) && isMentor && <Text style={{ ...defaultStyles.defaultText }}>,</Text>}
        {isMentor && <Text style={{ ...defaultStyles.defaultSemibold, color: colors.salmon }}> mentor</Text>}
      </Text>
    );
  };

  const renderLocation = () => {
    if (!user.location) return null;
    return (
      <Text style={{ ...defaultStyles.defaultText }}>
        📍<Text style={{ ...defaultStyles.defaultMute }}>{`  ${user.location}`}</Text>
      </Text>
    );
  };

  return (
    <View style={styles.content}>
      <View style={styles.contentSection}>
        <View style={{ ...styles.contentHeader, paddingBottom: 10 }}>
          <Text style={{ ...defaultStyles.hugeMedium }}>About</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditAboutModal', { user })}>
              Edit
            </TextButton>
          )}
        </View>
        {user.about && <Text style={{ ...defaultStyles.defaultText, paddingBottom: 10 }}>{user.about}</Text>}
        {(useOpenToBox || !!user.location) && (
          <View style={styles.detailsBox}>
            {renderLocation()}
            {renderOpenTo()}
          </View>
        )}
      </View>
      <View style={{ ...styles.projectsSection }}>
        <View style={{ ...styles.contentHeader, paddingHorizontal: 20 }}>
          <Text style={{ ...defaultStyles.hugeMedium, paddingBottom: 10 }}>Projects</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => null}>
              New
            </TextButton>
          )}
        </View>
        <Projects projects={user.projects} />
      </View>
      <View style={styles.contentSection}>
        <View style={{ ...styles.contentHeader }}>
          <Text style={{ ...defaultStyles.hugeMedium }}>Experience</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditExperienceModal', { isNew: true })}>
              New
            </TextButton>
          )}
        </View>
        <Experience navigation={navigation} isMyProfile={isMyProfile} experience={user.experience} />
      </View>
      <View style={styles.contentSection}>
        <View style={{ ...styles.contentHeader }}>
          <Text style={{ ...defaultStyles.hugeMedium }}>Education</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditEducationModal', { isNew: true })}>
              New
            </TextButton>
          )}
        </View>
        <Education navigation={navigation} isMyProfile={isMyProfile} education={user.education} />
      </View>
      <View style={styles.contentSection}>
        <View style={[{ ...styles.contentHeader, paddingBottom: 15 }]}>
          <Text style={{ ...defaultStyles.hugeMedium }}>Skills</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditSkillsModal', { user })}>
              Edit
            </TextButton>
          )}
        </View>
        {user.skills.length > 0 && <Skills skills={user.skills} height={32} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editButton: {
    fontSize: 14,
  },
  content: {
    paddingVertical: 10, // change to padding, if want gray showing on sides
    backgroundColor: colors.lightGray,
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    // borderRadius: 5,
    marginBottom: 10,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  projectsSection: {
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  detailsBox: {
    marginTop: 10,
    marginBottom: 5,
  },
});

export default ProfileBio;
