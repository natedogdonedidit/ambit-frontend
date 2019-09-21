import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import CREATE_EXPERIENCE_MUTATION from 'library/mutations/CREATE_EXPERIENCE_MUTATION';
import EDIT_EXPERIENCE_MUTATION from 'library/mutations/EDIT_EXPERIENCE_MUTATION';
import DELETE_EXPERIENCE_MUTATION from 'library/mutations/DELETE_EXPERIENCE_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';
import GrayButton from 'library/components/UI/GrayButton';
import Loader from 'library/components/UI/Loader';
import YearModal from 'library/components/modals/YearModal';
import MonthModal from 'library/components/modals/MonthModal';
import PopupBackground from 'library/components/modals/PopupBackground';

const EditExperienceModal = ({ modalVisible, setModalVisible, activeExperience, setActiveExperience, owner }) => {
  // state will be filled with activeExperience after the modal is opened
  const [name, setName] = useState(null);
  const [subText, setSubText] = useState(null);
  const [location, setLocation] = useState(null);
  const [startDateMonth, setStartDateMonth] = useState(null);
  const [startDateYear, setStartDateYear] = useState(null);
  const [endDateMonth, setEndDateMonth] = useState(null);
  const [endDateYear, setEndDateYear] = useState(null);
  const [currentRole, setCurrentRole] = useState(false);

  const [startDateActive, setStartDateActive] = useState(false);
  const [endDateActive, setEndDateActive] = useState(false);
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);

  // VARIABLES
  const isNew = activeExperience.name === '';

  // EFFECTS

  useEffect(() => {
    // if modal opened, fill state with the experience to edit (or the blank experience)
    if (modalVisible && activeExperience) {
      setName(activeExperience.name);
      setSubText(activeExperience.subText);
      setLocation(activeExperience.location);
      setStartDateYear(activeExperience.startDateYear);
      setStartDateMonth(activeExperience.startDateMonth);
      setEndDateYear(activeExperience.endDateYear);
      setEndDateMonth(activeExperience.endDateMonth);
      setCurrentRole(activeExperience.currentRole);
    }
  }, [modalVisible]);

  // MUTATIONS
  const [createExperience, payloadCreate] = useMutation(CREATE_EXPERIENCE_MUTATION, {
    variables: {
      owner,
      experience: {
        name,
        subText,
        location,
        startDateMonth,
        startDateYear,
        endDateMonth,
        endDateYear,
        currentRole,
      },
    },
    // refetchQueries: () => [{ query: SINGLE_USER_BIO, variables: { id: owner } }],
    // wait for the response from the mutation, write User data (returned from mutation)
    // into cache SINGLE_USER_BIO
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.createExperience,
        },
      });
    },
    onCompleted: () => {
      closeModal();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to create this experience. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });
  const loadingCreate = payloadCreate.loading;

  const [editExperience, payloadEdit] = useMutation(EDIT_EXPERIENCE_MUTATION, {
    variables: {
      owner,
      id: activeExperience.id,
      experience: {
        name,
        subText,
        location,
        startDateMonth,
        startDateYear,
        endDateMonth,
        endDateYear,
        currentRole,
      },
    },
    // refetchQueries: () => [{ query: SINGLE_USER_BIO, variables: { id: owner } }],
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.editExperience,
        },
      });
    },
    onCompleted: () => {
      closeModal();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit this experience. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });
  const loadingEdit = payloadEdit.loading;

  const [deleteExperience, payloadDelete] = useMutation(DELETE_EXPERIENCE_MUTATION, {
    variables: {
      owner,
      id: activeExperience.id,
    },
    // refetchQueries: () => [{ query: SINGLE_USER_BIO, variables: { id: owner } }],
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.deleteExperience,
        },
      });
    },
    onCompleted: () => {
      closeModal();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this experience. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });
  const loadingDelete = payloadDelete.loading;

  const loading = loadingCreate || loadingEdit || loadingDelete;

  // CUSTOM FUNCTIONS
  const handleYearSelect = yearSelected => {
    if (!yearSelected) {
      setYearModalVisible(false);
      setStartDateActive(false);
      setEndDateActive(false);
      return;
    }
    if (startDateActive) {
      setStartDateYear(yearSelected);
      setYearModalVisible(false);
      setStartDateActive(false);
      setEndDateActive(false);
      return;
    }
    if (endDateActive) {
      setEndDateYear(yearSelected);
      setYearModalVisible(false);
      setStartDateActive(false);
      setEndDateActive(false);
    }
  };

  const handleMonthSelect = monthSelected => {
    if (!monthSelected) {
      setMonthModalVisible(false);
      setStartDateActive(false);
      setEndDateActive(false);
      return;
    }
    if (startDateActive) {
      setStartDateMonth(monthSelected);
      setMonthModalVisible(false);
      setStartDateActive(false);
      setEndDateActive(false);
      return;
    }
    if (endDateActive) {
      setEndDateMonth(monthSelected);
      setMonthModalVisible(false);
      setStartDateActive(false);
      setEndDateActive(false);
    }
  };

  const closeModal = () => {
    setName(null);
    setSubText(null);
    setLocation(null);
    setStartDateYear(null);
    setStartDateMonth(null);
    setEndDateYear(null);
    setEndDateMonth(null);
    setCurrentRole(null);
    setActiveExperience({});
    setModalVisible(false);
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleDelete = () => {
    deleteExperience();
    // closeModal();
  };

  const validateInputs = () => {
    if (!name) return 'Company';
    if (!subText) return 'Job Title';
    if (!startDateYear) return 'Start Date Year';
    // end date only required if its not your current role
    if (!endDateYear && !currentRole) return 'End Date Year';
    return null;
  };

  const handleSave = () => {
    const message = validateInputs();

    // if missing a required field, Alert user
    if (message) {
      return Alert.alert('Please fill in required field:', `${message}`, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }

    // if validation passed, create experience mutation
    if (isNew) {
      createExperience();
    } else {
      editExperience();
    }
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <YearModal yearModalVisible={yearModalVisible} handleYearSelect={handleYearSelect} />
      <MonthModal monthModalVisible={monthModalVisible} handleMonthSelect={handleMonthSelect} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <TextButton textStyle={styles.closeButtonText} onPress={() => handleCancel()}>
              Cancel
            </TextButton>
            <Text style={{ ...defaultStyles.headerTitle, ...styles.headerTitle }}>
              {isNew ? 'New Experience' : 'Edit Experience'}
            </Text>
            <TextButton textStyle={styles.saveButtonText} onPress={() => handleSave()}>
              Save
            </TextButton>
          </View>
          <ScrollView style={styles.content}>
            <View style={styles.inputTitle}>
              <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>Company</Text>
            </View>
            <TextInput
              style={{ ...styles.input, ...defaultStyles.defaultText }}
              onChangeText={val => setName(val)}
              value={name}
              placeholder="Add company name"
            />
            <View style={styles.inputTitle}>
              <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>Job Title</Text>
            </View>
            <TextInput
              style={{ ...styles.input, ...defaultStyles.defaultText }}
              onChangeText={val => setSubText(val)}
              value={subText}
              placeholder="Add job title"
            />
            <View style={styles.inputTitle}>
              <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>Location</Text>
            </View>
            <TextInput
              style={{ ...styles.input, ...defaultStyles.defaultText }}
              onChangeText={val => setLocation(val)}
              value={location}
              placeholder="Add location"
            />
            <View style={styles.inputTitle}>
              <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>Start Date</Text>
            </View>
            <View style={styles.dateView}>
              <View style={styles.dateInput}>
                <TouchableOpacity
                  onPress={() => {
                    setStartDateActive(true);
                    setMonthModalVisible(true);
                  }}
                >
                  <Text style={[{ width: 80 }, startDateMonth ? defaultStyles.defaultText : defaultStyles.defaultMute]}>
                    {startDateMonth || `Month`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ ...styles.dateInput, marginLeft: 15 }}>
                <TouchableOpacity
                  onPress={() => {
                    setStartDateActive(true);
                    setYearModalVisible(true);
                  }}
                >
                  <Text style={[{ width: 80 }, startDateYear ? defaultStyles.defaultText : defaultStyles.defaultMute]}>
                    {startDateYear || `Year`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {!currentRole && (
              <View>
                <View style={styles.inputTitle}>
                  <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>End Date</Text>
                </View>
                <View style={styles.dateView}>
                  <View style={styles.dateInput}>
                    <TouchableOpacity
                      onPress={() => {
                        setEndDateActive(true);
                        setMonthModalVisible(true);
                      }}
                    >
                      <Text style={[{ width: 80 }, endDateMonth ? defaultStyles.defaultText : defaultStyles.defaultMute]}>
                        {endDateMonth || `Month`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ ...styles.dateInput, marginLeft: 15 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setEndDateActive(true);
                        setYearModalVisible(true);
                      }}
                    >
                      <Text style={[{ width: 80 }, endDateYear ? defaultStyles.defaultText : defaultStyles.defaultMute]}>
                        {endDateYear || `Year`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.switchRow}>
              <Text style={{ ...defaultStyles.defaultText }}>This is my current role</Text>
              <View style={styles.switch}>
                <Switch value={currentRole} onValueChange={val => setCurrentRole(val)} />
              </View>
            </View>

            {!isNew && (
              <GrayButton
                onPress={() => handleDelete()}
                buttonStyle={{ backgroundColor: colors.peach, marginTop: 30, marginBottom: 15 }}
                textStyle={{ color: 'white', fontWeight: '400' }}
              >
                Delete experience
              </GrayButton>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
      {loading && <Loader active={loading} />}
      <PopupBackground dim={yearModalVisible || monthModalVisible} />
    </Modal>
  );
};

export default EditExperienceModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: colors.borderBlack,
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
    paddingVertical: 20,
  },
  inputTitle: {
    paddingTop: 10,
  },
  input: {
    paddingVertical: 10,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: 0.2,
    marginBottom: 10,
  },
  dateView: {
    flexDirection: 'row',
  },
  dateInput: {
    flexGrow: 1,
    paddingVertical: 10,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: 0.2,
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  switch: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
});
