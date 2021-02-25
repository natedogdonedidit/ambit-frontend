import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={{ ...defaultStyles.hugeMediumDisplay, fontSize: 50, paddingTop: 100, paddingBottom: 10 }}>🚀</Text>
        <Text style={{ ...defaultStyles.ambitLogo, fontSize: 46, paddingBottom: 45 }}>ambit</Text>
        <View style={{ flex: 1 }} />

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('PhoneNumber', { isPasswordReset: false })}
            style={{ ...styles.button }}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ ...defaultStyles.hugeMediumDisplay, color: 'white', fontSize: 20 }}>Create account</Text>
              <Ionicons name="ios-arrow-forward" size={25} color={colors.white} style={{ paddingLeft: 10 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.8}>
            <Text style={{ ...defaultStyles.defaultMute, marginTop: 50, textAlign: 'center' }}>
              Already have an account?{'  '}
              <Text style={{ ...defaultStyles.defaultSemibold, color: colors.purp }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 25,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 27,
    height: 54,
    paddingHorizontal: 34,
    // width: '100%',
    ...defaultStyles.shadow3,
    marginTop: 35,
  },
});

export default WelcomeScreen;
