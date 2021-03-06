import React from 'react';
import { StyleSheet, Modal, View, ScrollView, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { months } from 'library/utils/lists';

const MonthModal = ({ navigation, route }) => {
  const { handleSelect } = route.params;

  const renderDates = () => {
    return months.map((month, i) => (
      <TouchableOpacity
        key={i}
        onPress={() => {
          handleSelect(month);
          navigation.goBack();
        }}
      >
        <View style={styles.yearView}>
          <Text style={{ ...defaultStyles.largeText }}>{month}</Text>
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
        <View style={styles.closeModal} />
      </TouchableWithoutFeedback>
      <View style={styles.modalView}>
        <View style={styles.handleView}>
          <View style={styles.handle} />
        </View>
        <Text style={{ ...defaultStyles.hugeText, ...styles.modalHeader }}>Select a month</Text>
        <ScrollView style={styles.scrollView}>{renderDates()}</ScrollView>
      </View>
    </View>
  );
};

export default MonthModal;

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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
