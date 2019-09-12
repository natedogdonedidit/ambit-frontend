import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import TextButton from 'library/components/UI/TextButton';

const HeaderEditBio = ({ handleLeft, handleRight, textLeft, textRight, title }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TextButton textStyle={styles.closeButtonText} onPress={() => handleLeft()}>
        {textLeft}
      </TextButton>
      <Text style={{ ...defaultStyles.headerTitle, ...styles.headerTitle }}>{title}</Text>
      <TextButton textStyle={styles.saveButtonText} onPress={() => handleRight()}>
        {textRight}
      </TextButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  closeButtonText: {
    width: 60,
    textAlign: 'left',
  },
  saveButtonText: {
    width: 60,
    textAlign: 'right',
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: 'center',
  },
});

export default HeaderEditBio;