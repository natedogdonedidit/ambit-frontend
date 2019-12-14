import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { sortExperiences } from 'library/utils';
import Location from 'library/components/UI/icons/Location';

const Experience = ({ isMyProfile, experience, navigation }) => {
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
          <IconF name="building" size={22} solid color={colors.iconGray} />
        </View>
        <View style={styles.infoView}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ ...defaultStyles.defaultMedium, ...styles.nameText }}>
            {exp.name}
          </Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ ...defaultStyles.defaultText, ...styles.subText }}>
            {exp.subText}
          </Text>
          <Text style={{ ...defaultStyles.defaultText, ...styles.dateText }}>
            {exp.startDateMonth ? `${exp.startDateMonth} ${exp.startDateYear}` : exp.startDateYear} -{' '}
            {exp.currentRole ? 'Present' : `${exp.endDateMonth}${exp.endDateMonth && ' '}${exp.endDateYear}`}
          </Text>
          <Location location={exp.location} />
        </View>
        {isMyProfile && (
          <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => navigation.navigate('EditExperienceModal', { experience: exp })}
            >
              <View style={styles.editButton}>
                <Icon name="dots-horizontal" size={25} color={colors.iconGray} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    ));
  };

  return <View>{renderExperiences()}</View>;
};

const styles = StyleSheet.create({
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
    width: 45,
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

  editButton: {
    justifyContent: 'center',
    paddingLeft: 15,
    opacity: 0.6,
  },
});

export default Experience;
