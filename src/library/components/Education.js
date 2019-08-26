import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { sortExperiences } from 'library/utils';

const Education = ({ isMyProfile, education, handleSelectEducation }) => {
  const renderEducation = () => {
    if (!education)
      return (
        <View>
          <Text style={{ ...defaultStyles.defaultMute }}>No education...yet!</Text>
        </View>
      );

    const educationSorted = education.sort(sortExperiences);

    return educationSorted.map((exp, i) => (
      <View key={i} style={i === education.length - 1 ? { ...styles.experienceNoBorder } : { ...styles.experience }}>
        <View style={styles.iconView}>
          <IconF name="graduation-cap" size={20} color={colors.darkGray} />
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
            <Text style={{ ...defaultStyles.smallMute, ...styles.locationText }}>{exp.location}</Text>
          </View>
        </View>
        {isMyProfile && (
          <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => handleSelectEducation(exp.id)}>
              <View style={styles.editButton}>
                <Icon name="dots-horizontal" size={25} color={colors.darkGray} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ));
  };

  return <View style={styles.experiences}>{renderEducation()}</View>;
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

export default Education;
