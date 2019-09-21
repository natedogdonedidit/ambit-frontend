import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { useMutation } from '@apollo/react-hooks';

import { UserContext } from 'library/utils/UserContext';
import SIGNUP_MUTATION from 'library/mutations/SIGNUP_MUTATION';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const CreateAccountScreen = props => {
  // state declaration
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginCTX } = useContext(UserContext);

  // navigation
  const { navigation } = props;

  // MUTATIONS
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      firstName,
      lastName,
      email,
      password,
    },
    // wait for the response from the mutation, write User data (returned from mutation)
    // into cache CURRENT_USER_QUERY
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
          userLoggedIn: dataReturned.signup.user,
        },
      });
    },
    onCompleted: () => {},
    onError: err => {
      console.log(err);
      // Alert.alert('Oh no!', 'An error occured when trying to login. Try again later!', [
      //   { text: 'OK', onPress: () => console.log('OK Pressed') },
      // ]);
    },
  });

  const onSignupSubmit = async () => {
    try {
      // 1. send signup request to backend
      const res = await signup();

      // 2. store token in storage, save user in CTX
      await loginCTX(res.data.signup);

      // 3. clear state
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

      // 4. navigate to Onboarding (changing to Main for now)
      navigation.navigate('Main');
    } catch (e) {
      // Backend GraphQL errors would lead us here
      console.log('ERROR SIGNING UP IN BACKEND:', e.message);
    }
  };

  const renderErrors = () => {
    if (!error) return null;
    return error.graphQLErrors.map(({ message }, i) => <Text key={i}>{message}</Text>);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={val => setFirstName(val)}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={val => setLastName(val)}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={val => setEmail(val)}
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={val => setPassword(val)}
        secureTextEntry
        editable={!loading}
      />
      <TouchableOpacity onPress={() => onSignupSubmit(signup, loginCTX)}>
        <View style={styles.signupButton}>
          <Text style={{ color: 'white' }}>Sign{loading ? 'ing Up...' : ' Up'}</Text>
        </View>
      </TouchableOpacity>

      {renderErrors(error)}

      <NavigationEvents
        onDidFocus={() => {
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
        }}
        onDidBlur={() => {
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    width: 200,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    margin: 10,
    paddingBottom: 4,
  },
  signupButton: {
    backgroundColor: 'tomato',
    width: 200,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

CreateAccountScreen.navigationOptions = {
  title: 'Create Account',
};

export default CreateAccountScreen;
