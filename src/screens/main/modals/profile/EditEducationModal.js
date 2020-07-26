import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Switch,
  KeyboardAvoidingView,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { UserContext } from 'library/utils/UserContext';

import CREATE_EDUCATION_MUTATION from 'library/mutations/CREATE_EDUCATION_MUTATION';
import EDIT_EDUCATION_MUTATION from 'library/mutations/EDIT_EDUCATION_MUTATION';
import DELETE_EDUCATION_MUTATION from 'library/mutations/DELETE_EDUCATION_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GrayButton from 'library/components/UI/buttons/GrayButton';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';

const BLANK_EXPERIENCE = {
  id: null,
  name: '',
  subText: '',
  location: '',
  startDateMonth: '',
  startDateYear: null,
  endDateMonth: '',
  endDateYear: null,
  currentRole: false,
};

const EditEducationModal = ({ navigation, route }) => {
  // params passed in
  const { isNew = false, education = BLANK_EXPERIENCE } = route.params;

  // context
  const { currentUserId } = useContext(UserContext);

  // state
  const [name, setName] = useState(education.name);
  const [subText, setSubText] = useState(education.subText);
  const [location, setLocation] = useState(education.location);
  const [startDateMonth, setStartDateMonth] = useState(education.startDateMonth);
  const [startDateYear, setStartDateYear] = useState(education.startDateYear);
  const [endDateMonth, setEndDateMonth] = useState(education.endDateMonth);
  const [endDateYear, setEndDateYear] = useState(education.endDateYear);
  const [currentRole, setCurrentRole] = useState(education.currentRole);

  // MUTATIONS
  const [createEducation, payloadCreate] = useMutation(CREATE_EDUCATION_MUTATION, {
    variables: {
      owner: currentUserId,
      education: {
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
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.createEducation,
        },
      });
    },
    onCompleted: () => {
      navigation.goBack();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to create this education. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });
  const loadingCreate = payloadCreate.loading;

  const [editEducation, payloadEdit] = useMutation(EDIT_EDUCATION_MUTATION, {
    variables: {
      owner: currentUserId,
      id: education.id,
      education: {
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
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.editEducation,
        },
      });
    },
    onCompleted: () => {
      navigation.goBack();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit this education. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });
  const loadingEdit = payloadEdit.loading;

  const [deleteEducation, payloadDelete] = useMutation(DELETE_EDUCATION_MUTATION, {
    variables: {
      owner: currentUserId,
      id: education.id,
    },
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.deleteEducation,
        },
      });
    },
    onCompleted: () => {
      navigation.goBack();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this education. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });
  const loadingDelete = payloadDelete.loading;

  const loading = loadingCreate || loadingEdit || loadingDelete;

  // CUSTOM FUNCTIONS
  const handleDelete = () => {
    deleteEducation();
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
      createEducation();
    } else {
      editEducation();
    }
  };

  const handleLocationSelect = locObject => {
    if (locObject) {
      setLocation(locObject.location);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderWhite
        handleLeft={navigation.goBack}
        handleRight={handleSave}
        textLeft="Cancel"
        textRight="Save"
        title={isNew ? 'New Education' : 'Edit Education'}
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
          <View style={styles.inputTitle}>
            <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>School</Text>
          </View>
          <TextInput
            style={{ ...styles.input, ...defaultStyles.defaultText }}
            onChangeText={val => setName(val)}
            value={name}
            placeholder="Add school name"
          />
          <View style={styles.inputTitle}>
            <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>Degree</Text>
          </View>
          <TextInput
            style={{ ...styles.input, ...defaultStyles.defaultText }}
            onChangeText={val => setSubText(val)}
            value={subText}
            placeholder="Add degree"
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('EditLocationModalRight', { initialLocation: location, handleLocationSelect })}
          >
            <View>
              <View style={styles.inputTitle}>
                <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>Location</Text>
              </View>
              <View style={styles.input}>
                <Text style={location ? defaultStyles.defaultText : defaultStyles.defaultPlaceholder}>
                  {location || 'Add location'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.inputTitle}>
            <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>Start Date</Text>
          </View>
          <View style={styles.dateView}>
            <View style={styles.dateInput}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('MonthModal', { handleSelect: setStartDateMonth });
                }}
              >
                <Text style={[{ width: 80 }, startDateMonth ? defaultStyles.defaultText : defaultStyles.defaultPlaceholder]}>
                  {startDateMonth || `Month`}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ ...styles.dateInput, marginLeft: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('YearModal', { handleSelect: setStartDateYear });
                }}
              >
                <Text style={[{ width: 80 }, startDateYear ? defaultStyles.defaultText : defaultStyles.defaultPlaceholder]}>
                  {startDateYear || `Year`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {!currentRole && (
            <View>
              <View style={styles.inputTitle}>
                <Text style={{ ...defaultStyles.largeMedium, color: colors.peach }}>Graduation Date</Text>
              </View>
              <View style={styles.dateView}>
                <View style={styles.dateInput}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MonthModal', { handleSelect: setEndDateMonth });
                    }}
                  >
                    <Text style={[{ width: 80 }, endDateMonth ? defaultStyles.defaultText : defaultStyles.defaultPlaceholder]}>
                      {endDateMonth || `Month`}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ ...styles.dateInput, marginLeft: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('YearModal', { handleSelect: setEndDateYear });
                    }}
                  >
                    <Text style={[{ width: 80 }, endDateYear ? defaultStyles.defaultText : defaultStyles.defaultPlaceholder]}>
                      {endDateYear || `Year`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <View style={styles.switchRow}>
            <Text style={{ ...defaultStyles.defaultText }}>I am currently enrolled</Text>
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
              Delete education
            </GrayButton>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <Loader active={loading} />}
    </View>
  );
};

export default EditEducationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {},
  inputTitle: {
    paddingTop: 10,
  },
  input: {
    paddingVertical: 10,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
  dateView: {
    flexDirection: 'row',
  },
  dateInput: {
    flexGrow: 1,
    paddingVertical: 10,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
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
