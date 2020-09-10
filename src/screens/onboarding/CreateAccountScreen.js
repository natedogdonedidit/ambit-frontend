import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useMutation } from '@apollo/client';

import { UserContext } from 'library/utils/UserContext';
import SIGNUP_MUTATION from 'library/mutations/SIGNUP_MUTATION';

const CreateAccountScreen = (props) => {
  // state declaration
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginCTX } = useContext(UserContext);

  // navigation
  // const { navigation } = props;

  // MUTATIONS
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name,
      username,
      password,
    },
    // wait for the response from the mutation, write User data (returned from mutation)
    // into cache CURRENT_USER_QUERY
    // update: (proxy, { data: dataReturned }) => {
    //   proxy.writeQuery({
    //     query: CURRENT_USER_QUERY,
    //     data: {
    //       userLoggedIn: dataReturned.signup.user,
    //     },
    //   });
    // },
  });

  const onSignupSubmit = async () => {
    try {
      // 1. send signup request to backend
      const res = await signup();

      // 2. store token in storage, save user in CTX
      await loginCTX(res.data.signup);

      // 3. clear state
      setName('');
      setUsername('');
      setPassword('');

      // 4. navigate to Onboarding (changing to Main for now)
      // navigation.navigate('Main');
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
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={(val) => setName(val)} editable={!loading} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(val) => {
          const noSymbol = val.replace(/[^a-zA-Z0-9_]/g, '');
          setUsername(noSymbol);
        }}
        autoCapitalize="none"
        editable={!loading}
        keyboardType="name-phone-pad" // no underscore, should fix eventually
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(val) => setPassword(val)}
        secureTextEntry
        editable={!loading}
      />
      <TouchableOpacity onPress={() => onSignupSubmit(signup, loginCTX)}>
        <View style={styles.signupButton}>
          <Text style={{ color: 'white' }}>Sign{loading ? 'ing Up...' : ' Up'}</Text>
        </View>
      </TouchableOpacity>

      {renderErrors(error)}
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
