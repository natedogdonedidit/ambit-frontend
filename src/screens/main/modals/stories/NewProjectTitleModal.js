import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

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
      <HeaderBackBlank navigation={navigation} rightComponent={<ButtonHeader onPress={handleDone}>Topic</ButtonHeader>} />
      <View style={{ flex: 1, paddingHorizontal: 25 }}>
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
    ...defaultStyles.hugeRegular,
    paddingTop: 15,
    paddingBottom: 8,
    // paddingHorizontal: 15,
    // borderRadius: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
});

export default NewProjectTitleModal;
