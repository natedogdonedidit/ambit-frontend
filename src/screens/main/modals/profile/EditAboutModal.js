import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Alert, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

import EDIT_BIO_MUTATION from 'library/mutations/EDIT_BIO_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';

const EditAboutModal = ({ navigation, route }) => {
  const { user } = route.params;

  const [about, setAbout] = useState(user.about);

  const [editAbout, { loading, error, data }] = useMutation(EDIT_BIO_MUTATION, {
    variables: {
      id: user.id,
      data: {
        about,
      },
    },
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.editBio,
        },
      });
    },
    onCompleted: () => {
      navigation.goBack();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your profile. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderWhite handleLeft={navigation.goBack} handleRight={editAbout} textLeft="Cancel" textRight="Save" title="Edit About" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <TextInput
            style={{ ...styles.multilineInput, ...defaultStyles.defaultText }}
            onChangeText={val => setAbout(val)}
            value={about}
            placeholder="Tell us about yourself.."
            multiline
            textAlignVertical="top"
            scrollEnabled={false}
            autoFocus
            maxLength={300}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <Loader active={loading} />}
    </View>
  );
};

export default EditAboutModal;

const styles = StyleSheet.create({
  multilineInput: {
    width: '100%',
    height: 200,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
