import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';

import EDIT_SKILLS_MUTATION from 'library/mutations/EDIT_SKILLS_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';
import Skills from 'library/components/profile/Skills';

const EditSkillsModal = ({ navigation }) => {
  const user = navigation.getParam('user');

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

  const [editSkills, { loading, error, called, data }] = useMutation(EDIT_SKILLS_MUTATION, {
    variables: {
      id: user.id,
      skills,
    },
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.editSkills,
        },
      });
    },
    onCompleted: () => {
      // setModalVisible(false);
      navigation.goBack();
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderWhite
        handleLeft={navigation.goBack}
        handleRight={editSkills}
        textLeft="Cancel"
        textRight="Save"
        title="Edit Skills"
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
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
          <Skills navigation={navigation} height={40} editable skills={skills} setSkills={setSkills} />
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <Loader active={loading} />}
    </SafeAreaView>
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
