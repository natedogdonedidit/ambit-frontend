import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Loader from 'library/components/UI/Loader';
import HeaderBack from 'library/components/headers/HeaderBack';

const NewProjectTitleModal = ({ navigation, route }) => {
  const { handleProjectCreate } = route.params;

  const [projectTitle, setProjectTitle] = useState('');

  return (
    <View style={styles.container}>
      <HeaderBack
        navigation={navigation}
        title="New Project"
        handleBack={navigation.goBack}
        textRight="Next"
        handleRight={() => navigation.navigate('NewProjectTopicsModal', { handleProjectCreate, projectTitle })}
      />
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Text style={{ ...defaultStyles.headerLarge, paddingTop: 100 }}>Project Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={val => setProjectTitle(val)}
          value={projectTitle}
          autoFocus
          autoCompleteType="off"
          maxLength={320}
          inputAccessoryViewID="1"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    marginTop: 15,
    ...defaultStyles.largeRegular,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
});

export default NewProjectTitleModal;
