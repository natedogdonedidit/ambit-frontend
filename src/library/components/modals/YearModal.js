import React from 'react';
import { StyleSheet, Modal, View, ScrollView, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { years } from 'library/utils/lists';

const YearModal = ({ yearModalVisible, handleYearSelect }) => {
  const renderDates = () => {
    return years.map((year, i) => (
      <TouchableOpacity key={i} onPress={() => handleYearSelect(year)}>
        <View style={styles.yearView}>
          <Text style={{ ...defaultStyles.largeText }}>{year}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <Modal animationType="slide" visible={yearModalVisible} transparent>
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            handleYearSelect(null);
          }}
        >
          <View style={styles.closeModal} />
        </TouchableWithoutFeedback>
        <View style={styles.modalView}>
          <View style={styles.handleView}>
            <View style={styles.handle} />
          </View>
          <Text style={{ ...defaultStyles.hugeText, ...styles.modalHeader }}>Select a year</Text>
          <ScrollView style={styles.scrollView}>{renderDates()}</ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default YearModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeModal: {
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
