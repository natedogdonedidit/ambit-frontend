import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useApolloClient } from '@apollo/client';
import { signOut } from 'library/utils/authUtil';

import { UserContext } from 'library/utils/UserContext';
import SIGNUP_MUTATION from 'library/mutations/SIGNUP_MUTATION';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/buttons/TextButton';

const CreateAccountScreen = ({ navigation }) => {
  const client = useApolloClient();

  // state declaration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginCTX } = useContext(UserContext);

  // had to do this to make sure token was cleared from storage upon signout
  useEffect(() => {
    signOut();
    client.clearStore();
  }, []);

  // MUTATIONS
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name,
      email,
      username,
      password,
    },
    onCompleted: async (data) => {
      // 2. store token in storage, save user in CTX
      await loginCTX(data.signup);

      // 3. clear state
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');

      // 4. navigate to Onboarding (changing to Main for now)
      navigation.navigate('OnboardingProfile', { username: data.signup.user.username });
    },
  });

  const onSignupSubmit = async () => {
    try {
      // 1. send signup request to backend
      await signup();
    } catch (e) {
      // Backend GraphQL errors would lead us here
      console.log('ERROR SIGNING UP IN BACKEND:', e.message);
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
          placeholder="Name"
          value={name}
          onChangeText={(val) => setName(val)}
          editable={!loading}
          textContentType="name"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
          }}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          editable={!loading}
        />
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
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(val) => setPassword(val)}
          textContentType="newPassword"
          secureTextEntry
          editable={!loading}
        />

        <TouchableOpacity onPress={onSignupSubmit} style={{ ...styles.button }} activeOpacity={0.8}>
          <Text style={{ ...defaultStyles.hugeMedium, color: 'white' }}>{loading ? 'Creating Account' : 'Create Account'}</Text>
        </TouchableOpacity>

        <Text style={{ ...defaultStyles.smallMute, marginTop: 36, textAlign: 'center' }}>
          By registering, you confirm that you accept our{' '}
          <Text style={{ ...defaultStyles.smallMedium, color: colors.purp }}>Terms of Service</Text> and{' '}
          <Text style={{ ...defaultStyles.smallMedium, color: colors.purp }}>Privacy Policy</Text>
        </Text>
        {renderErrors()}
        <View style={{ flex: 1 }} />

        <TextButton onPress={() => navigation.navigate('Login')}>Already have an account? Login here</TextButton>
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

export default CreateAccountScreen;
