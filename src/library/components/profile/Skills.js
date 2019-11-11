import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import move from 'lodash-move';
import update from 'immutability-helper';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Skills = ({ navigation, skills, setSkills, height = 44, editable = false }) => {
  const [skillToEdit, setSkillToEdit] = useState(null);

  const skillDelete = () => {
    // remove skill from array
    skills.splice(skillToEdit, 1);
  };

  const skillChangeOrder = direction => {
    // adjust array order
    if (direction === 'up' && skillToEdit !== 0) {
      const fromIndex = skillToEdit;
      const toIndex = skillToEdit - 1;
      const newArray = move([...skills], fromIndex, toIndex);
      setSkills(newArray);
    }
    if (direction === 'down' && skillToEdit !== skills.length - 1) {
      const fromIndex = skillToEdit;
      const toIndex = skillToEdit + 1;
      const newArray = move([...skills], fromIndex, toIndex);
      setSkills(newArray);
    }
  };

  const flipExpert = () => {
    // set as expert or skilled
    const skillToChange = { ...skills[skillToEdit] };
    const newArray = update(skills, {
      [skillToEdit]: { isExpert: { $set: !skillToChange.isExpert } },
    });
    setSkills(newArray);
  };

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
              setSkillToEdit(i);
              navigation.navigate('EditSkillsPopup', { skillDelete, skillChangeOrder, flipExpert });
            }}
          >
            <View style={styles.editButton}>
              <Icon name="dots-horizontal" size={25} color={colors.iconGray} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    ));
  };

  return <View>{renderSkills()}</View>;
};

const styles = StyleSheet.create({
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
