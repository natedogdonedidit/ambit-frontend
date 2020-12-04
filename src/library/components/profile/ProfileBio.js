import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import TextButton from 'library/components/UI/buttons/TextButton';
import Showcase from 'library/components/profile/Showcase';
import Skills from 'library/components/profile/Skills';
import Experience from 'library/components/profile/Experience';
import Education from 'library/components/profile/Education';
import Loader from 'library/components/UI/Loader';

import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import Topic from 'library/components/post/Topic';

const ProfileBio = ({ navigation, isMyProfile, profileId, username }) => {
  // QUERIES
  const { loading, error, data, refetch } = useQuery(SINGLE_USER_BIO, {
    variables: { where: { username } },
  });

  if (loading) {
    return (
      <View style={{ height: 100, marginTop: 10 }}>
        <Loader loading={loading} size="small" full={false} backgroundColor="transparent" />
      </View>
    );
  }

  const { user } = data;

  const isFreelancer = user.topicsFreelance.length > 0;
  const isMentor = user.topicsMentor.length > 0;
  const isInvestor = user.topicsInvest.length > 0;
  const useOpenToBox = isFreelancer || isMentor || isInvestor;

  const hasExperience = user.experience ? user.experience.length > 0 : false;
  const hasEducation = user.education ? user.education.length > 0 : false;
  const hasSkills = user.skills ? user.skills.length > 0 : false;
  const hasStories = user.stories ? user.stories.length > 0 : false;

  const showAbout = isMyProfile || useOpenToBox || !!user.about;
  const showExperience = isMyProfile || hasExperience;
  const showEducation = isMyProfile || hasEducation;
  const showSkills = isMyProfile || hasSkills;

  const showcaseProjects = hasStories
    ? user.stories.filter((project) => project.items.length > 0 && (project.type === 'SOLO' || project.type === 'PROJECT'))
    : [];

  const showShowcase = isMyProfile || showcaseProjects.length > 0;

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
      {showAbout && (
        <View style={styles.contentSection}>
          <View style={{ ...styles.contentHeader, paddingBottom: 10 }}>
            <Text style={{ ...defaultStyles.hugeMedium }}>About</Text>
            {isMyProfile && (
              <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditAboutModal', { user })}>
                Edit
              </TextButton>
            )}
          </View>
          {!!user.about && <Text style={{ ...defaultStyles.defaultText, paddingBottom: 10 }}>{user.about}</Text>}
          {(useOpenToBox || !!user.location) && (
            <View style={styles.detailsBox}>
              {renderLocation()}
              {/* {renderOpenTo()} */}
            </View>
          )}
        </View>
      )}
      {showShowcase && (
        <View style={{ ...styles.projectsSection }}>
          <View style={{ ...styles.contentHeader, paddingHorizontal: 20 }}>
            <Text style={{ ...defaultStyles.hugeMedium, paddingBottom: 6 }}>Showcase</Text>
            {isMyProfile && (
              <TextButton textStyle={styles.editButton} onPress={() => null}>
                Edit
              </TextButton>
            )}
          </View>
          <Showcase navigation={navigation} projects={user.stories} />
        </View>
      )}
      {isInvestor && (
        <View style={styles.contentSection}>
          <View style={{ ...styles.contentHeader, paddingBottom: 10 }}>
            <Text style={{ ...defaultStyles.hugeMedium }}>
              Investor{`  `}
              <Feather name="trending-up" size={22} color={colors.green} />
            </Text>
            {isMyProfile && (
              <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('MyInvest')}>
                Edit
              </TextButton>
            )}
          </View>
          {!!user.investDesc && <Text style={{ ...defaultStyles.defaultText, paddingBottom: 10 }}>{user.investDesc}</Text>}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {user.topicsInvest.map((top) => {
              return <Topic key={top.id} topicToShow={top.id} touchable={false} />;
            })}
          </View>
        </View>
      )}
      {isFreelancer && (
        <View style={styles.contentSection}>
          <View style={{ ...styles.contentHeader, paddingBottom: 10 }}>
            <Text style={{ ...defaultStyles.hugeMedium }}>
              Freelancer{`  `}
              <Feather name="briefcase" size={22} color={colors.peach} />
            </Text>
            {isMyProfile && (
              <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('MyFreelance')}>
                Edit
              </TextButton>
            )}
          </View>
          {!!user.freelanceDesc && <Text style={{ ...defaultStyles.defaultText, paddingBottom: 10 }}>{user.freelanceDesc}</Text>}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {user.topicsFreelance.map((top) => {
              return <Topic key={top.id} topicToShow={top.id} touchable={false} />;
            })}
          </View>
        </View>
      )}
      {isMentor && (
        <View style={styles.contentSection}>
          <View style={{ ...styles.contentHeader, paddingBottom: 10 }}>
            <Text style={{ ...defaultStyles.hugeMedium }}>
              Open to mentor{`  `}
              <Feather name="users" size={22} color={colors.purp} />
            </Text>
            {isMyProfile && (
              <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('MyMentor')}>
                Edit
              </TextButton>
            )}
          </View>
          {!!user.mentorDesc && <Text style={{ ...defaultStyles.defaultText, paddingBottom: 10 }}>{user.mentorDesc}</Text>}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {user.topicsMentor.map((top) => {
              return <Topic key={top.id} topicToShow={top.id} touchable={false} />;
            })}
          </View>
        </View>
      )}
      {showExperience && (
        <View style={styles.contentSection}>
          <View style={{ ...styles.contentHeader }}>
            <Text style={{ ...defaultStyles.hugeMedium }}>Experience</Text>
            {isMyProfile && (
              <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditExperienceModal', { username })}>
                New
              </TextButton>
            )}
          </View>
          <Experience navigation={navigation} isMyProfile={isMyProfile} experience={user.experience} username={username} />
        </View>
      )}
      {showEducation && (
        <View style={styles.contentSection}>
          <View style={{ ...styles.contentHeader }}>
            <Text style={{ ...defaultStyles.hugeMedium }}>Education</Text>
            {isMyProfile && (
              <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditEducationModal', { username })}>
                New
              </TextButton>
            )}
          </View>
          <Education navigation={navigation} isMyProfile={isMyProfile} education={user.education} username={username} />
        </View>
      )}
      {/* {showSkills && (
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
      )} */}
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
