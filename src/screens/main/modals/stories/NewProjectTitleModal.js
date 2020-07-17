import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, TextInput, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery, useMutation } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Loader from 'library/components/UI/Loader';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';

const NewProjectTitleModal = ({ navigation, route }) => {
  const { handleProjectCreate } = route.params;

  const [projectTitle, setProjectTitle] = useState('');

  const handleDone = () => {
    navigation.navigate('NewProjectTopicsModal', { handleProjectCreate, projectTitle });
  };

  return (
    <View style={styles.container}>
      <HeaderBackBlank navigation={navigation} rightComponent={<ButtonHeader onPress={handleDone}>Topics</ButtonHeader>} />
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Text style={{ ...defaultStyles.headerMedium, paddingTop: 20 }}>Story Title:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(val) => setProjectTitle(val)}
          value={projectTitle}
          autoFocus
          autoCompleteType="off"
          maxLength={60}
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
    marginTop: 5,
    ...defaultStyles.largeRegular,
    paddingVertical: 12,
    // paddingHorizontal: 15,
    // borderRadius: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
});

export default NewProjectTitleModal;
