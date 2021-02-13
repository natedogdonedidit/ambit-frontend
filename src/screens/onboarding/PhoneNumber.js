import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useLazyQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GET_VERIFICATION_CODE from 'library/queries/GET_VERIFICATION_CODE';

const PhoneNumber = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  // state declaration
  const [number, setNumber] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // get a new verification code texted to user
  const [getVerificationCode, { loading, error, data }] = useLazyQuery(GET_VERIFICATION_CODE, {
    onError: () => Alert.alert('Oops! Something went wrong on our end.'),
    onCompleted: (result) => {
      console.log('result:', result.getVerificationCode);
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
    // remove non-numbers from number (double check)
    const phoneNumberClean = number.replace(/[^0-9]/g, '');

    // if input is NOT valid - send error message
    if (!phoneNumberClean || phoneNumberClean.length < 10) {
      Alert.alert('Please enter a valid phone number');
    } else {
      console.log(phoneNumberClean);
      // send sms
      getVerificationCode({ variables: { phoneNumber: phoneNumberClean }, fetchPolicy: 'no-cache' });

      // navigate to verify code screen
      navigation.navigate('PhoneNumberVerify', { phoneNumber: phoneNumberClean });
    }
  };

  const onChangeText = (val) => {
    // remove non-numbers
    const phoneNumberClean = val.replace(/[^0-9]/g, '');
    setNumber(phoneNumberClean);
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
      <SafeAreaView style={{ ...styles.container }}>
        <TouchableOpacity style={{ position: 'absolute', top: insets.top + 10, left: 6 }} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" size={32} color={colors.purp} style={{}} />
        </TouchableOpacity>

        {/* header / title */}
        <View style={{ paddingBottom: 35 }}>
          <Text style={{ ...defaultStyles.headerLarge, paddingTop: 75, paddingBottom: 15 }}>What's your{'\n'}number?</Text>
          <Text style={{ ...defaultStyles.defaultMediumMute }}>
            We protect our community by making sure everyone on Ambit is real.
          </Text>
        </View>

        {/* this will fill area between header and button */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 35 }}>
          <Text style={{ ...defaultStyles.bigInput, paddingBottom: 2 }}>🇺🇸 +1</Text>
          <TextInput
            autoFocus
            style={styles.input}
            placeholder="Phone number"
            value={number}
            onChangeText={onChangeText}
            // editable={!loading}
            textContentType="telephoneNumber"
            autoCompleteType="tel"
            keyboardType="number-pad"
          />
        </View>

        {/* <View style={{ flex: 1 }} /> */}

        {/* this will sit on top of keyboard */}
        <View style={{ paddingBottom: 25 }}>
          <TouchableOpacity onPress={handleNext} style={{ ...styles.button }} activeOpacity={0.8}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ ...defaultStyles.hugeMediumDisplay, color: 'white', fontSize: 20 }}>Send code</Text>
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
    width: 210,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBlack,
    marginLeft: 12,
    paddingLeft: 4,
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

export default PhoneNumber;
