import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useApolloClient } from '@apollo/client';

import { UserContext } from 'library/utils/UserContext';
import LOGIN_MUTATION from 'library/mutations/LOGIN_MUTATION';
import { signOut } from 'library/utils/authUtil';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/buttons/TextButton';

const LoginScreen = ({ navigation }) => {
  const client = useApolloClient();

  // state declaration
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginCTX } = useContext(UserContext);

  // MUTATIONS
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      username,
      password,
    },
    onCompleted: async (data) => {
      // 2. store token & ID to storage, save user in CTX
      await loginCTX(data.login);
      setUsername('');
      setPassword('');
      navigation.navigate('MainStack');
    },
  });

  // had to do this to make sure token was cleared from storage upon signout
  useEffect(() => {
    signOut();
    client.clearStore();
  }, []);

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
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={{ ...defaultStyles.ambitLogo, fontSize: 36, paddingTop: 45, paddingBottom: 35 }}>ambit</Text>
        <TextInput
          style={styles.input}
          placeholder="Email or username"
          value={username}
          onChangeText={(val) => setUsername(val)}
          editable={!loading}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          textContentType="password"
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity onPress={onLoginSubmit} style={{ ...styles.button }} activeOpacity={0.8}>
          <Text style={{ ...defaultStyles.hugeMedium, color: 'white' }}>Sign{loading ? 'ing in...' : ' in'}</Text>
        </TouchableOpacity>

        <TextButton buttonStyle={{ marginTop: 44 }}>Forgot password</TextButton>
        {renderErrors()}
        <View style={{ flex: 1 }} />

        <TextButton onPress={() => navigation.navigate('CreateAccount')}>Don't have an account? Create here</TextButton>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 42,
    paddingBottom: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBlack,
    marginVertical: 13,
    paddingBottom: 4,
    ...defaultStyles.hugeRegular,
    fontSize: 18,
  },
  error: {
    padding: 5,
    margin: 5,
    color: 'red',
    marginTop: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 27,
    height: 54,
    paddingHorizontal: 30,
    width: '100%',
    ...defaultStyles.shadow3,
    marginTop: 35,
  },
});

export default LoginScreen;
