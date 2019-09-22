import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import TextButton from 'library/components/UI/TextButton';
import Projects from 'library/components/Projects';
import Skills from 'library/components/Skills';
import Experience from 'library/components/Experience';
import Education from 'library/components/Education';

const ProfileBio = ({ isMyProfile, user, handleSelectExperience = null, handleSelectEducation, setModalVisibleSkills }) => {
  return (
    <View style={styles.content}>
      <View style={styles.contentSection}>
        <View style={{ ...styles.contentHeader }}>
          <Text style={{ ...defaultStyles.hugeMedium }}>About</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => null}>
              Edit
            </TextButton>
          )}
        </View>
        <Text style={{ ...defaultStyles.defaultText }}>{user.bio}</Text>
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
            <TextButton textStyle={styles.editButton} onPress={() => handleSelectExperience('new')}>
              New
            </TextButton>
          )}
        </View>
        <Experience isMyProfile={isMyProfile} experience={user.experience} handleSelectExperience={handleSelectExperience} />
      </View>
      <View style={styles.contentSection}>
        <View style={{ ...styles.contentHeader }}>
          <Text style={{ ...defaultStyles.hugeMedium }}>Education</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => handleSelectEducation('new')}>
              New
            </TextButton>
          )}
        </View>
        <Education isMyProfile={isMyProfile} education={user.education} handleSelectEducation={handleSelectEducation} />
      </View>
      <View style={styles.contentSection}>
        <View style={[{ ...styles.contentHeader }, !!user.skills && { paddingBottom: 15 }]}>
          <Text style={{ ...defaultStyles.hugeMedium }}>Skills</Text>
          {isMyProfile && (
            <TextButton textStyle={styles.editButton} onPress={() => setModalVisibleSkills(true)}>
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
    padding: 10,
    backgroundColor: colors.lightGray,
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderRadius: 5,
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
