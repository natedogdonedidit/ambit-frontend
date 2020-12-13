import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';

const EditNameModal = ({ navigation, route }) => {
  // ROUTE PARAMS
  const { userLoggedIn } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWhite handleLeft={null} handleRight={null} textLeft="Cancel" textRight="" title="Title" />
    </SafeAreaView>
  );
};

export default EditNameModal;
