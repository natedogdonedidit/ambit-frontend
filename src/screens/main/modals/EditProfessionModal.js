import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import { professionList, industryList } from 'library/utils/lists';

const EditProfessionModal = ({ navigation }) => {
  const user = navigation.getParam('user');
  const profession = navigation.getParam('profession');
  const industry = navigation.getParam('industry');
  const jobTitle = navigation.getParam('jobTitle');
  const setProfession = navigation.getParam('setProfession');
  const setIndustry = navigation.getParam('setIndustry');
  const setJobTitle = navigation.getParam('setJobTitle');

  const [professionInput, setProfessionInput] = useState(profession);
  const [industryInput, setIndustryInput] = useState(industry);
  const [jobTitleInput, setJobTitleInput] = useState(jobTitle);
  const [activeList, setActiveList] = useState([]);
  const [whichList, setWhichList] = useState('');

  const changeProfession = () => {
    setActiveList(professionList);
    setWhichList('profession');
  };

  const selectProfession = newProfession => {
    setProfessionInput(newProfession);
    setActiveList([]);
    setWhichList('');
  };

  const changeIndustry = () => {
    setActiveList(industryList);
    setWhichList('industry');
  };

  const selectIndustry = newIndustry => {
    setIndustryInput(newIndustry);
    setActiveList([]);
    setWhichList('');
  };

  const handleCancel = () => {
    // set these back to whats in the database
    setProfession(user.profession);
    setIndustry(user.industry);
    navigation.goBack();
  };

  const handleDone = () => {
    setProfession(professionInput);
    setIndustry(industryInput);
    setJobTitle(jobTitleInput);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <HeaderWhite
          handleLeft={handleCancel}
          handleRight={handleDone}
          textLeft="Cancel"
          textRight="Done"
          title="Edit Profession"
        />

        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.rowTitle}>
              <Text style={{ ...defaultStyles.defaultBold }}>Job Title</Text>
            </View>
            <TextInput
              style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
              onChangeText={val => setJobTitleInput(val)}
              value={jobTitleInput}
              placeholder="What's your job title"
            />
          </View>
          <View style={styles.row}>
            <View style={styles.rowTitle}>
              <Text style={{ ...defaultStyles.defaultBold }}>Profession</Text>
            </View>
            <View style={styles.rowInput}>
              <TouchableOpacity onPress={() => changeProfession()} style={styles.touchableRow}>
                {professionInput ? (
                  <Text style={{ ...defaultStyles.defaultText }}>{professionInput}</Text>
                ) : (
                  <Text style={{ ...defaultStyles.defaultMute }}>Select your profession</Text>
                )}
                <Icon name="angle-down" size={15} color={colors.darkGray} style={{}} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.rowTitle}>
              <Text style={{ ...defaultStyles.defaultBold }}>Industry</Text>
            </View>
            <View style={{ ...styles.rowInput, borderBottomWidth: 0 }}>
              <TouchableOpacity onPress={() => changeIndustry()} style={styles.touchableRow}>
                {industryInput ? (
                  <Text style={{ ...defaultStyles.defaultText }}>{industryInput}</Text>
                ) : (
                  <Text style={{ ...defaultStyles.defaultMute }}>Select your industry</Text>
                )}
                <Icon name="angle-down" size={15} color={colors.darkGray} style={{}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.grayBox} />

        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <FlatList
            style={styles.listView}
            data={activeList}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  if (whichList === 'profession') {
                    selectProfession(item);
                  } else if (whichList === 'industry') {
                    selectIndustry(item);
                  }
                }}
              >
                <View style={styles.listRow}>
                  <Text style={{ ...defaultStyles.defaultText }}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default EditProfessionModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
  },
  modalHeader: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
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
  section: {
    paddingHorizontal: 10,
    paddingTop: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
  },
  row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  rowTitle: {
    width: 100,
  },
  rowInput: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  rowInputNoBorder: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
  },
  touchableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listView: {
    flex: 1,
    width: '100%',
  },
  listRow: {
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  grayBox: {
    width: '100%',
    height: 10,
    backgroundColor: colors.lightGray,
  },
});
