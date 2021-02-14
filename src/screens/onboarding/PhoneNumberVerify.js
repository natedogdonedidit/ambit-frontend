import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import CHECK_VERIFICATION_CODE from 'library/queries/CHECK_VERIFICATION_CODE';
import { useLazyQuery } from '@apollo/client';

const PhoneNumberVerify = ({ navigation, route }) => {
  const { phoneNumber } = route.params;

  const insets = useSafeAreaInsets();

  // state declaration
  const [code, setCode] = useState('');

  const [keyboardHeight, setKeyboardHeight] = useState(260);

  // get a new verification code texted to user
  const [checkVerificationCode, { loading, error, data }] = useLazyQuery(CHECK_VERIFICATION_CODE, {
    onError: () => Alert.alert('Oops! Something went wrong on our end.'),
    onCompleted: (result) => {
      // console.log('result:', result.checkVerificationCode);

      if (result.checkVerificationCode === 'approved') {
        // save to async storage that this device was verified (so we wont need to repeat the process)

        // navigate to onboarding
        navigation.navigate('CreateAccount', { phoneNumber });
      } else {
        Alert.alert("Oops! That code didn't work. Try sending another code.");
      }
    },
  });

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
    setKeyboardHeight(height);
  };

  const keyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  const handleNext = () => {
    // remove non-numbers from code (double check)
    const codeClean = code.replace(/[^0-9]/g, '');

    // if input is NOT valid - send error message
    if (!codeClean || codeClean.length < 4) {
      Alert.alert('Please enter a 4 digit code');
    } else {
      // console.log(codeClean);

      // send sms
      checkVerificationCode({ variables: { phoneNumber, code: codeClean }, fetchPolicy: 'no-cache' });

      // navigate to verify code screen
      // navigation.navigate('PhoneNumberVerify', { phoneNumber: code });
    }
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
        <TouchableOpacity style={{ position: 'absolute', top: insets.top + 10, left: 6 }} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" size={32} color={colors.purp} style={{}} />
        </TouchableOpacity>

        {/* header / title */}
        <View style={{ paddingBottom: 35 }}>
          <Text style={{ ...defaultStyles.headerLarge, paddingTop: 75, paddingBottom: 15 }}>Verify your{'\n'}number</Text>
          <Text style={{ ...defaultStyles.defaultMediumMute }}>Enter the code we just sent to</Text>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 2 }}>
            <Text style={{ ...defaultStyles.defaultMediumMute }}>+1 {phoneNumber}.</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ ...defaultStyles.defaultSemibold, color: colors.purp }}> Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* this will fill area between header and button */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 35 }}>
          <TextInput
            autoFocus
            style={styles.input}
            placeholder="# # # #"
            value={code}
            onChangeText={(val) => setCode(val)}
            // editable={!loading}
            textContentType="oneTimeCode"
            autoCompleteType="password"
            keyboardType="number-pad"
          />
        </View>

        {/* <View style={{ flex: 1 }} /> */}

        {/* this will sit on top of keyboard */}
        <View style={{ paddingBottom: 25 }}>
          <TouchableOpacity onPress={handleNext} style={{ ...styles.button }} activeOpacity={0.8}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ ...defaultStyles.hugeMediumDisplay, color: 'white', fontSize: 20 }}>Next</Text>
              <Ionicons name="ios-arrow-forward" size={25} color={colors.white} style={{ paddingLeft: 10 }} />
            </View>
          </TouchableOpacity>
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
    paddingHorizontal: 36,
  },
  input: {
    width: 140,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBlack,
    // marginLeft: 12,
    // paddingLeft: 4,
    paddingBottom: 2,
    ...defaultStyles.bigInput,
  },
  error: {
    padding: 5,
    margin: 5,
    color: 'red',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.purp,
    borderRadius: 27,
    height: 54,
    paddingHorizontal: 40,
    ...defaultStyles.shadow3,
  },
});

export default PhoneNumberVerify;
