import React from 'react';
import { StyleSheet, Modal, View, ScrollView, Text, TouchableWithoutFeedback, TouchableOpacity, Animated } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

const ForYouSettingsPopup = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.transparentSection} />
      </TouchableWithoutFeedback>
      <View style={styles.modalView}>
        <View style={styles.handleView}>
          <View style={styles.handle} />
        </View>
        <Text style={{ ...defaultStyles.largeRegular, ...styles.modalHeader }}>
          This timeline will show you posts that match your Topics and Hats
        </Text>

        <View style={{ paddingHorizontal: 40 }}>
          <ButtonDefault onPress={() => navigation.navigate('MyTopics')}>Edit your topics</ButtonDefault>
        </View>
        <View style={{ paddingHorizontal: 40, paddingTop: 15 }}>
          <ButtonDefault onPress={() => navigation.navigate('MyHats')}>Edit your hats</ButtonDefault>
        </View>
      </View>
    </View>
  );
};

export default ForYouSettingsPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transparentSection: {
    flexGrow: 1,
  },
  modalView: {
    width: '100%',
    // height: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  handleView: {
    alignItems: 'center',
  },
  handle: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.darkGray1,
    marginTop: 8,
  },
  modalHeader: {
    paddingVertical: 20,
    textAlign: 'center',
    color: colors.blueGray,
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  yearView: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
