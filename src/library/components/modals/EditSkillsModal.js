import React, { useState } from 'react';
import { StyleSheet, Modal, SafeAreaView, View, ScrollView, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';
import move from 'lodash-move';
import update from 'immutability-helper';

import EDIT_SKILLS_MUTATION from 'library/mutations/EDIT_SKILLS_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import PopupSkills from 'library/components/modals/PopupSkills';
import PopupBackground from 'library/components/modals/PopupBackground';
import Loader from 'library/components/UI/Loader';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';
import Skills from 'library/components/Skills';

const EditSkillsModal = ({ modalVisible, setModalVisible, user }) => {
  // remove id and __typename from skills
  const oldSkills = user.skills
    ? user.skills.map(skill => {
        delete skill.id;
        delete skill.__typename;
        return skill;
      })
    : null;

  const [skills, setSkills] = useState([...(oldSkills || [])]);
  const [newSkill, setNewSkill] = useState('');
  const [popupSkill, setPopupSkill] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const [editSkills, { loading, error, called, data }] = useMutation(EDIT_SKILLS_MUTATION, {
    variables: {
      id: user.id,
      skills,
    },
    // refetchQueries: () => [{ query: SINGLE_USER_BIO, variables: { id: user.id } }],
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.editSkills,
        },
      });
    },
    onCompleted: () => {
      setModalVisible(false);
    },
    onError: () =>
      Alert.alert(
        'Oh no!',
        'An error occured when trying to edit your skills. Try again later!',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      ),
  });

  // add a new skill to state
  const submitNewSkill = () => {
    setSkills([...skills, { skill: newSkill, isExpert: false }]);
    setNewSkill('');
  };

  const skillDelete = () => {
    // remove skill from array
    skills.splice(popupSkill, 1);
    setPopupVisible(false);
  };

  const skillChangeOrder = direction => {
    // adjust array order
    if (direction === 'up' && popupSkill !== 0) {
      const fromIndex = popupSkill;
      const toIndex = popupSkill - 1;
      const newArray = move([...skills], fromIndex, toIndex);
      setSkills(newArray);
    }
    if (direction === 'down' && popupSkill !== skills.length - 1) {
      const fromIndex = popupSkill;
      const toIndex = popupSkill + 1;
      const newArray = move([...skills], fromIndex, toIndex);
      setSkills(newArray);
    }
    setPopupVisible(false);
  };

  const flipExpert = () => {
    // set as expert or skilled
    const skillToChange = { ...skills[popupSkill] };
    const newArray = update(skills, {
      [popupSkill]: { isExpert: { $set: !skillToChange.isExpert } },
    });
    setSkills(newArray);
    setPopupVisible(false);
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <PopupBackground dim={popupVisible} />
      <PopupSkills
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        skillDelete={skillDelete}
        skillChangeOrder={skillChangeOrder}
        flipExpert={flipExpert}
        popupSkill={popupSkill}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <TextButton textStyle={styles.closeButtonText} onPress={() => setModalVisible(false)}>
              Cancel
            </TextButton>
            <Text style={{ ...defaultStyles.headerTitle, ...styles.headerTitle }}>Edit Skills</Text>
            <TextButton textStyle={styles.saveButtonText} onPress={() => editSkills()}>
              Save
            </TextButton>
          </View>
          <ScrollView style={styles.content}>
            {/* <View style={styles.contentHeader}>
              <Text style={{ ...defaultStyles.largeBold }}>Skills</Text>
            </View> */}
            <View style={styles.newSkillRow}>
              <TextInput
                style={styles.skillInput}
                onChangeText={val => setNewSkill(val)}
                value={newSkill}
                placeholder="Add a new skill"
                maxLength={30}
              />
              <TextButton textStyle={styles.addButton} onPress={() => submitNewSkill()}>
                Add
              </TextButton>
            </View>
            <Skills
              height={40}
              editable
              skills={skills}
              popupVisible={popupVisible}
              setPopupVisible={setPopupVisible}
              setPopupSkill={setPopupSkill}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      {loading && <Loader active={loading} />}
    </Modal>
  );
};

export default EditSkillsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: colors.darkGray,
    borderBottomWidth: 0.2,
  },
  closeButtonText: {
    width: 60,
    textAlign: 'left',
  },
  saveButtonText: {
    width: 60,
    textAlign: 'right',
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  newSkillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  skillInput: {
    flexGrow: 1,
    paddingHorizontal: 15,
    backgroundColor: colors.lightGray,
    height: 40,
    borderRadius: 10,
  },
  addButton: {
    fontSize: 14,
    paddingLeft: 20,
  },
});
