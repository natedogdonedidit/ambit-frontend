import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { NavigationEvents } from 'react-navigation';

import { UserContextConsumer } from 'library/utils/UserContext';

const CreateAccountScreen = props => {
  // state declaration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // navigation
  const { navigation } = props;

  const onSignupSubmit = async (signup, loginCTX) => {
    try {
      // 1. send signup request to backend
      const res = await signup();

      // 2. store token in storage, save user in CTX
      await loginCTX(res.data.signup);

      // 3. clear state
      setName('');
      setEmail('');
      setPassword('');

      // 4. navigate to Onboarding (changing to Main for now)
      navigation.navigate('Main');
    } catch (e) {
      // Backend GraphQL errors would lead us here
      console.log('ERROR SIGNING UP IN BACKEND:', e.message);
    }
  };

  const renderErrors = error => {
    if (!error) return null;
    return error.graphQLErrors.map(({ message }, i) => <Text key={i}>{message}</Text>);
  };

  return (
    <UserContextConsumer>
      {({ loginCTX }) => (
        <Mutation mutation={SIGNUP_MUTATION} variables={{ name, email, password }} errorPolicy="all">
          {(signup, { error, loading }) => {
            return (
              <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={val => setName(val)}
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
                  onDidFocus={payload => {
                    setName('');
                    setEmail('');
                    setPassword('');
                  }}
                  onDidBlur={payload => {
                    setName('');
                    setEmail('');
                    setPassword('');
                  }}
                />
              </View>
            );
          }}
        </Mutation>
      )}
    </UserContextConsumer>
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

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export default CreateAccountScreen;
