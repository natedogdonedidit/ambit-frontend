import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Skills = ({ skills, height = 44, editable = false, popupVisible, setPopupVisible, setPopupSkill }) => {
  const renderSkills = () => {
    if (!skills) return null;
    return skills.map((skill, i) => (
      <View key={i} style={i === skills.length - 1 ? { ...styles.skillNoBorder, height } : { ...styles.skill, height }}>
        <Text style={{ ...styles.skillText, ...defaultStyles.defaultText }}>{skill.skill}</Text>
        {skill.isExpert ? (
          <View style={styles.expertView}>
            <Text style={{ ...defaultStyles.defaultText, ...styles.expertText }}>Expert</Text>
          </View>
        ) : (
          <View style={styles.skilledView}>
            <Text style={{ ...defaultStyles.defaultText, ...styles.skilledText }}>Skilled</Text>
          </View>
        )}
        {editable && (
          <TouchableOpacity
            onPress={() => {
              setPopupSkill(i);
              setPopupVisible(true);
            }}
          >
            <View style={styles.editButton}>
              <Icon name="dots-horizontal" size={25} color={colors.darkGray} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    ));
  };

  return <View style={styles.skills}>{renderSkills()}</View>;
};

const styles = StyleSheet.create({
  skills: {},
  skill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  skillNoBorder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillText: {
    flexGrow: 1,
  },
  expertView: {
    height: 22,
    width: 64,
    borderRadius: 5,
    backgroundColor: '#FF656522',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expertText: {
    color: colors.peach,
    fontWeight: '400',
  },
  skilledView: {
    height: 22,
    width: 64,
    borderRadius: 5,
    backgroundColor: '#588E5F22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skilledText: {
    color: colors.green,
    fontWeight: '400',
  },
  editButton: {
    paddingLeft: 15,
    opacity: 0.6,
  },
});

export default Skills;
