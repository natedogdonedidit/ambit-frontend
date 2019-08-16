import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';
import { professionList, industryList } from 'library/utils/lists';

const EditProfessionModal = ({
  jobTitle,
  setJobTitle,
  profession,
  setProfession,
  industry,
  setIndustry,
  proModalVisible,
  setProModalVisible,
}) => {
  const [activeList, setActiveList] = useState([]);
  const [whichList, setWhichList] = useState('');

  // const displayList = list => {
  //   return list.map(() => <View style={styles.listRow} />);
  // };

  const changeProfession = () => {
    setActiveList(professionList);
    setWhichList('profession');
  };

  const selectProfession = newProfession => {
    setProfession(newProfession);
    setActiveList([]);
    setWhichList('');
  };

  const changeIndustry = () => {
    setActiveList(industryList);
    setWhichList('industry');
  };

  const selectIndustry = newIndustry => {
    setIndustry(newIndustry);
    setActiveList([]);
    setWhichList('');
  };

  return (
    <Modal animationType="slide" visible={proModalVisible}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <TextButton
              textStyle={styles.closeButtonText}
              onPress={() => setProModalVisible(false)}
            >
              Close
            </TextButton>
            <Text style={{ ...defaultStyles.headerTitle, ...styles.headerTitle }}>
              Edit Profession
            </Text>
            <TextButton textStyle={styles.saveButtonText} onPress={() => null}>
              Save
            </TextButton>
          </View>
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Job Title</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={val => setJobTitle(val)}
                value={jobTitle}
                placeholder="What's your job title"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Profession</Text>
              </View>
              <View style={styles.rowInput}>
                <TouchableOpacity onPress={() => changeProfession()} style={styles.touchableRow}>
                  {profession ? (
                    <Text style={{ ...defaultStyles.defaultText }}>{profession}</Text>
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
              <View style={styles.rowInput}>
                <TouchableOpacity onPress={() => changeIndustry()} style={styles.touchableRow}>
                  {industry ? (
                    <Text style={{ ...defaultStyles.defaultText }}>{industry}</Text>
                  ) : (
                    <Text style={{ ...defaultStyles.defaultMute }}>Select your industry</Text>
                  )}
                  <Icon name="angle-down" size={15} color={colors.darkGray} style={{}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

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
        </View>
      </SafeAreaView>
    </Modal>
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
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 0.2,
    borderTopColor: colors.darkGray,
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
    borderBottomWidth: 0.2,
    borderBottomColor: colors.darkGray,
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
    padding: 15,
  },
  listRow: {
    justifyContent: 'center',
    width: '100%',
    height: 40,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.darkGray,
  },
});
