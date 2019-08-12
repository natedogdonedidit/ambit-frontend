import React, { useState, useDebugValue } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { HeaderBackButton, NavigationEvents } from 'react-navigation';

import { UserContextConsumer } from 'library/utils/UserContext';

const LoginScreen = props => {
  // state declaration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // navigation
  const { navigation } = props;

  const onLoginSubmit = async (login, loginCTX) => {
    try {
      // 1. send login request to backend
      const res = await login();

      // 2. store token in storage, save user in CTX
      await loginCTX(res.data.login);

      // 3. clear state
      setEmail('');
      setPassword('');

      // 4. navigate to Main app
      navigation.navigate('Main');
    } catch (e) {
      // Backend GraphQL errors would lead us here
      console.log('ERROR LOGGING IN TO BACKEND:', e.message);
    }
  };

  const renderErrors = error => {
    if (!error) return null;
    return error.graphQLErrors.map(({ message }, i) => (
      <Text key={i} style={styles.error}>
        {message}
      </Text>
    ));
  };

  return (
    <UserContextConsumer>
      {({ loginCTX }) => (
        <Mutation mutation={LOGIN_MUTATION} variables={{ email, password }} errorPolicy="all">
          {(login, { error, loading }) => {
            return (
              <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={val => setEmail(val)}
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
                  <TouchableOpacity onPress={() => onLoginSubmit(login, loginCTX)}>
                    <View style={styles.loginButton}>
                      <Text style={{ color: 'white' }}>Log{loading ? 'ging in...' : 'in'}</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => null}>
                    <View style={styles.linkedinButton}>
                      <Text style={{ color: 'white' }}>Login with LinkedIn</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => null}>
                    <View style={styles.googleButton}>
                      <Text style={{ color: 'white' }}>Login with Google</Text>
                    </View>
                  </TouchableOpacity>
                  <Button
                    title="Create Account"
                    onPress={() => navigation.navigate('CreateAccount')}
                  />

                  {renderErrors(error)}

                  <NavigationEvents
                    onDidFocus={payload => {
                      setEmail('');
                      setPassword('');
                    }}
                    onDidBlur={payload => {
                      setEmail('');
                      setPassword('');
                    }}
                  />
                </View>
              </SafeAreaView>
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
  loginButton: {
    backgroundColor: 'tomato',
    width: 200,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  linkedinButton: {
    backgroundColor: '#3b5998',
    width: 200,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  googleButton: {
    backgroundColor: '#db3236',
    width: 200,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
  },
  error: {
    padding: 5,
    margin: 5,
    color: 'red',
  },
});

LoginScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Login',
    headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Tabs')} />,
  };
};

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export default LoginScreen;
