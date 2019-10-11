import React from 'react';
import { StyleSheet, Modal, View, ScrollView, Text, TouchableWithoutFeedback, TouchableOpacity, Animated } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { years } from 'library/utils/lists';

const YearModal = ({ navigation }) => {
  console.log(navigation);
  const handleSelect = navigation.getParam('handleSelect');

  const didFocusSubscription = navigation.addListener('didFocus', payload => {
    console.log('didFocus', payload);
  });

  const didBlurSubscription = navigation.addListener('didBlur', payload => {
    console.log('didBlur', payload);
  });

  const renderDates = () => {
    return years.map((year, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => {
          handleSelect(year);
          navigation.goBack();
        }}
      >
        <View style={styles.yearView}>
          <Text style={{ ...defaultStyles.largeText }}>{year}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

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
        <Text style={{ ...defaultStyles.hugeText, ...styles.modalHeader }}>Select a year</Text>
        <ScrollView style={styles.scrollView}>{renderDates()}</ScrollView>
      </View>
    </View>
  );
};

export default YearModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.3)',
  },
  transparentSection: {
    flexGrow: 1,
  },
  modalView: {
    width: '100%',
    height: 400,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  handleView: {
    alignItems: 'center',
  },
  handle: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.darkGray,
    marginTop: 8,
  },
  modalHeader: {
    color: colors.peach,
    paddingVertical: 20,
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 50,
  },
  yearView: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: 0.2,
  },
});
