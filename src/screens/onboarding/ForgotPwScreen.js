import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useApolloClient } from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { UserContext } from 'library/utils/UserContext';
import CHANGE_PASSWORD_MUTATION from 'library/mutations/CHANGE_PASSWORD_MUTATION';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/buttons/TextButton';

function hasLowerCase(str) {
  return /[a-z]/.test(str);
}

function hasUpperCase(str) {
  return /[A-Z]/.test(str);
}

function hasNumber(str) {
  return /[0-9]/.test(str);
}

const ForgotPwScreen = ({ navigation, route }) => {
  const { phoneNumber, username } = route.params;
  const client = useApolloClient();
  const insets = useSafeAreaInsets();

  // state declaration
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(260);

  // MUTATIONS
  const [changePassword, { loading, error }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    variables: {
      username,
      password,
    },
    onError: (e) => {
      console.log(e);
      Alert.alert('Oops! Password could not be reset. Something went wrong on our end.');
    },
    onCompleted: async (data) => {
      Alert.alert('Password successfully reset. Please login.');
      // 4. navigate to Onboarding (changing to Main for now)
      navigation.navigate('Login');
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
          <Text style={{ ...defaultStyles.headerLarge, paddingTop: 75, paddingBottom: 15 }}>Enter new password</Text>
          <Text style={{ ...defaultStyles.defaultMediumMute }}>for username: {username}</Text>
        </View>

        {/* this will fill area between header and button */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 35 }}>
          <TextInput
            style={styles.input}
            autoFocus
            placeholder="New Password"
            value={password}
            onChangeText={(val) => {
              if (errorMessage) setErrorMessage('');
              setPassword(val);
            }}
            textContentType="newPassword"
            autoCompleteType="password"
            passwordRules="minlength: 6; required: lower; required: upper; required: digit;"
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* <View style={{ flex: 1 }} /> */}

        {/* this will sit on top of keyboard */}
        <View style={{ paddingBottom: 25 }}>
          <TouchableOpacity onPress={changePassword} style={{ ...styles.button }} activeOpacity={0.8}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ ...defaultStyles.hugeMediumDisplay, color: 'white', fontSize: 20 }}>Submit</Text>
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
    width: '100%',
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

export default ForgotPwScreen;
