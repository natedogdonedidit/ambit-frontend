import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { sortExperiences } from 'library/utils';

const Experience = ({ isMyProfile, experience, handleSelectExperience }) => {
  const renderExperiences = () => {
    if (!experience)
      return (
        <View>
          <Text style={{ ...defaultStyles.defaultMute }}>No work experience...yet!</Text>
        </View>
      );

    const experienceSorted = experience.sort(sortExperiences);

    return experienceSorted.map((exp, i) => (
      <View key={i} style={i === experience.length - 1 ? { ...styles.experienceNoBorder } : { ...styles.experience }}>
        <View style={styles.iconView}>
          {/* <Image source={require('../../images/briefcase.png')} resizeMode="contain" style={{ width: 30, height: 30 }} /> */}
          <IconF name="building" size={22} solid color={colors.darkGray} />
        </View>
        <View style={styles.infoView}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ ...defaultStyles.defaultMedium, ...styles.nameText }}>
            {exp.name}
          </Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ ...defaultStyles.defaultText, ...styles.subText }}>
            {exp.subText}
          </Text>
          <Text style={{ ...defaultStyles.defaultText, ...styles.dateText }}>
            {exp.startDateMonth} {exp.startDateYear} - {exp.currentRole ? 'Present' : `${exp.endDateMonth} ${exp.endDateYear}`}
          </Text>
          <View style={styles.locationView}>
            <Icon name="map-marker" size={15} color={colors.darkGray} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={{ ...defaultStyles.smallMute, ...styles.locationText }}>
              {exp.location}
            </Text>
          </View>
        </View>
        {isMyProfile && (
          <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => handleSelectExperience(exp.id)}>
              <View style={styles.editButton}>
                <Icon name="dots-horizontal" size={25} color={colors.darkGray} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ));
  };

  return <View style={styles.experiences}>{renderExperiences()}</View>;
};

const styles = StyleSheet.create({
  experiences: {},
  experience: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    paddingVertical: 15,
  },
  experienceNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 5,
  },
  iconView: {
    width: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  infoView: {
    flex: 1,
    alignItems: 'flex-start',
  },
  nameText: {
    marginBottom: 6,
    color: colors.peach,
  },
  subText: {
    marginBottom: 4,
  },
  dateText: {
    marginBottom: 8,
  },
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    paddingLeft: 5,
  },
  editButtonView: {
    height: '100%',
  },
  editButton: {
    justifyContent: 'center',
    paddingLeft: 15,
    opacity: 0.6,
  },
});

export default Experience;
