import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import TextButton from 'library/components/UI/buttons/TextButton';
import Projects from 'library/components/profile/Projects';
import Skills from 'library/components/profile/Skills';
import Experience from 'library/components/profile/Experience';
import Education from 'library/components/profile/Education';

const ProfileBio = ({
  navigation,
  isMyProfile,
  user,
  // handleSelectExperience = null,
  // handleSelectEducation,
  // setModalVisibleSkills,
}) => {
  return (
    <View style={styles.content}>
      <View style={styles.contentSection}>
        <View style={{ ...styles.contentHeader }}>
          <Text style={{ ...defaultStyles.hugeMedium, paddingBottom: 10 }}>About</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditAboutModal', { user })}>
              Edit
            </TextButton>
          )}
        </View>
        <Text style={{ ...defaultStyles.defaultText }}>{user.about}</Text>
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
        <View style={[{ ...styles.contentHeader }, !!user.skills && { paddingBottom: 15 }]}>
          <Text style={{ ...defaultStyles.hugeMedium }}>Skills</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditSkillsModal', { user })}>
              Edit
            </TextButton>
          )}
        </View>
        <Skills skills={user.skills} height={32} />
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
});

export default ProfileBio;
