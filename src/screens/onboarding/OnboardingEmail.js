import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GET_VERIFICATION_CODE from 'library/queries/GET_VERIFICATION_CODE';
import UPDATE_USER_MUTATION from 'library/mutations/UPDATE_USER_MUTATION';
import TextButton from 'library/components/UI/buttons/TextButton';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

const OnboardingEmail = ({ navigation, route }) => {
  const { username } = route.params;
  const insets = useSafeAreaInsets();

  // state declaration
  const [email, setEmail] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // MUTATION
  const [updateOneUser, { loading: loadingEdit, error, data }] = useMutation(UPDATE_USER_MUTATION);

  // get keyboard height
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
  }, []);

  const keyboardWillShow = (e) => {
    // console.log(e.endCoordinates.height);
    // const height = Math.max(e.endCoordinates.height, 260); // min of 260
    const { height } = e.endCoordinates;
    setKeyboardHeight(height - insets.bottom);
  };

  const keyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  const handleNext = async () => {
    const validEmail = true;

    if (validEmail) {
      navigation.navigate('OnboardingLocation', { username });

      // CHAD - comment this back in when you want to set the email address
      try {
        updateOneUser({
          variables: {
            where: { username },
            data: {
              email,
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('invalid email');
    }
  };

  const onChangeText = (val) => {
    // remove non-numbers
    setEmail(val);
  };

  // const renderErrors = () => {
  //   if (!error) return null;
  //   return error.graphQLErrors.map(({ message }, i) => (
  //     <Text key={i} style={styles.error}>
  //       {message}
  //     </Text>
  //   ));
  // };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ ...styles.container, paddingBottom: keyboardHeight }}>
        <View style={styles.header}>
          <Text style={{ ...defaultStyles.ambitLogoSmall }}>ambit</Text>
        </View>
        {/* <TouchableOpacity style={{ position: 'absolute', top: insets.top + 10, left: 6 }} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" size={32} color={colors.purp} style={{}} />
        </TouchableOpacity> */}

        {/* header / title */}
        <View style={{ paddingHorizontal: 30, paddingBottom: 50 }}>
          <Text style={{ ...defaultStyles.headerLarge, paddingBottom: 15 }}>What's your email?</Text>
          <Text style={{ ...defaultStyles.defaultMediumMute }}>We use this to recover your account if you can't log in.</Text>
        </View>

        <View style={{ paddingHorizontal: 30, paddingBottom: 30, justifyContent: 'center' }}>
          <TextInput
            autoFocus
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={onChangeText}
            autoCapitalize="none"
            // editable={!loading}
            textContentType="emailAddress"
            autoCompleteType="email"
            keyboardType="email-address"
          />
        </View>

        {/* this will fill area between input and buttons */}
        <View style={{ flex: 1 }} />

        {/* this will sit on top of keyboard */}
        <View style={styles.aboveKeyboard}>
          <TextButton onPress={() => navigation.navigate('OnboardingLocation', { username })}>Skip</TextButton>
          {/* <View /> */}
          <ButtonDefault buttonStyle={{ paddingHorizontal: 14 }} onPress={handleNext}>
            Next
          </ButtonDefault>
        </View>

        {/* {renderErrors()} */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 6,
    paddingBottom: 40,
    alignItems: 'center',
  },
  input: {
    // width: 210,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBlack,
    // marginLeft: 12,
    // paddingLeft: 4,
    paddingBottom: 2,
    ...defaultStyles.bigInput,
  },
  aboveKeyboard: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingRight: 8,
    paddingLeft: 14,
  },
  error: {
    padding: 5,
    margin: 5,
    color: 'red',
  },
});

export default OnboardingEmail;
