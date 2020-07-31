import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { NavigationEvents } from 'react-navigation';
// import { HeaderBackButton } from 'react-navigation-stack';
import { useLazyQuery } from '@apollo/client';

import { UserContext } from 'library/utils/UserContext';
import LOGIN_QUERY from 'library/queries/LOGIN_QUERY';

const LoginScreen = (props) => {
  // state declaration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginCTX } = useContext(UserContext);

  const { navigation } = props;

  // MUTATIONS
  const [login, { loading, data, error }] = useLazyQuery(LOGIN_QUERY, {
    variables: {
      email,
      password,
    },
    // wait for the response from the mutation, write User data (returned from mutation)
    // into cache CURRENT_USER_QUERY
    // update: (proxy, { data: dataReturned }) => {
    //   proxy.writeQuery({
    //     query: CURRENT_USER_QUERY,
    //     data: {
    //       userLoggedIn: dataReturned.login.user,
    //     },
    //   });
    // },
  });

  useEffect(() => {
    if (data && data.login && data.login.token && data.login.user)
      // 2. store token & ID to storage, save user in CTX
      loginCTX(data.login);
  }, [data]);

  const onLoginSubmit = async () => {
    try {
      // 1. send login request to backend
      console.log('sending login to backend');
      login();
    } catch (e) {
      // Backend GraphQL errors would lead us here
      console.log('ERROR LOGGING IN TO BACKEND:', e.message);
    }
  };

  const renderErrors = () => {
    if (!error) return null;
    return error.graphQLErrors.map(({ message }, i) => (
      <Text key={i} style={styles.error}>
        {message}
      </Text>
    ));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(val) => setEmail(val)}
          editable={!loading}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry
          editable={!loading}
        />
        <TouchableOpacity onPress={() => onLoginSubmit()}>
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
        <Button title="Create Account" onPress={() => navigation.navigate('CreateAccount')} />

        {renderErrors()}

        {/* <NavigationEvents
          onDidFocus={() => {
            setEmail('');
            setPassword('');
          }}
          onDidBlur={() => {
            setEmail('');
            setPassword('');
          }}
        /> */}
      </View>
    </SafeAreaView>
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

// LoginScreen.navigationOptions = ({ navigation }) => {
//   return {
//     title: 'Login',
//     headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Tabs')} />,
//   };
// };

export default LoginScreen;
