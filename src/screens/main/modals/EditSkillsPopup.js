import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GrayButton from 'library/components/UI/GrayButton';

const EditSkillsPopup = ({ navigation }) => {
  const skillDelete = navigation.getParam('skillDelete');
  const skillChangeOrder = navigation.getParam('skillChangeOrder');
  const flipExpert = navigation.getParam('flipExpert');

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
        <TouchableOpacity
          onPress={() => {
            flipExpert();
            navigation.goBack();
          }}
        >
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Icon name="star" size={20} color={colors.darkGray} solid />
            </View>
            <Text style={{ ...defaultStyles.largeThin, ...styles.rowText }}>I'm an expert</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            skillChangeOrder('up');
            navigation.goBack();
          }}
        >
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Icon name="caret-up" size={20} color={colors.darkGray} />
            </View>
            <Text style={{ ...defaultStyles.largeThin, ...styles.rowText }}>Move up</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            skillChangeOrder('down');
            navigation.goBack();
          }}
        >
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Icon name="caret-down" size={20} color={colors.darkGray} />
            </View>
            <Text style={{ ...defaultStyles.largeThin, ...styles.rowText }}>Move down</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            skillDelete();
            navigation.goBack();
          }}
        >
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Icon name="trash" size={20} color={colors.peach} />
            </View>
            <Text style={{ ...defaultStyles.largeThin, ...styles.rowText, color: colors.peach }}>Delete</Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <GrayButton onPress={() => navigation.goBack()}>Close</GrayButton>
        </View>
      </View>
    </View>
  );
};

export default EditSkillsPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transparentSection: {
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
    backgroundColor: colors.darkGray,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  rowIcon: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowText: {
    flexGrow: 1,
    paddingRight: 20,
  },
});
