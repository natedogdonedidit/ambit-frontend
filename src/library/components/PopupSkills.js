import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GrayButton from 'library/components/UI/GrayButton';

const PopupSkills = ({
  popupVisible,
  setPopupVisible,
  skillDelete,
  skillChangeOrder,
  flipExpert,
}) => {
  return (
    <Modal animationType="slide" visible={popupVisible} transparent>
      <View style={styles.container}>
        <View style={styles.topHalf}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setPopupVisible(false)} />
        </View>
        <View style={styles.popupView}>
          <View style={styles.handleView}>
            <View style={styles.handle} />
          </View>
          <View>
            <TouchableOpacity onPress={() => flipExpert()}>
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Icon name="star" size={20} color={colors.darkGray} solid />
                </View>
                <Text style={{ ...defaultStyles.largeThin, ...styles.rowText }}>I'm an expert</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => skillChangeOrder('up')}>
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Icon name="caret-up" size={20} color={colors.darkGray} />
                </View>
                <Text style={{ ...defaultStyles.largeThin, ...styles.rowText }}>Move up</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => skillChangeOrder('down')}>
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Icon name="caret-down" size={20} color={colors.darkGray} />
                </View>
                <Text style={{ ...defaultStyles.largeThin, ...styles.rowText }}>Move down</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={() => skillDelete()}>
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Icon name="trash" size={20} color={colors.peach} />
                </View>
                <Text
                  style={{ ...defaultStyles.largeThin, ...styles.rowText, color: colors.peach }}
                >
                  Delete
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <GrayButton onPress={() => setPopupVisible(false)} buttonStyle={{}}>
              Close
            </GrayButton>
          </View>

          <View />
        </View>
      </View>
    </Modal>
  );
};

export default PopupSkills;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHalf: {
    flexGrow: 1,
  },
  popupView: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  handleView: {
    alignItems: 'center',
  },
  handle: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.darkGray,
    marginVertical: 8,
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
