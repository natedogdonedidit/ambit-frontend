import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GrayButton from 'library/components/UI/buttons/GrayButton';

const EditStoryItemPopup = ({ navigation, route }) => {
  const { itemIndex, storyLength, removeStoryItem, changeOrder } = route.params;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.transparentSection} />
      </TouchableWithoutFeedback>
      <SafeAreaView style={styles.modalView}>
        <View style={styles.handleView}>
          <View style={styles.handle} />
        </View>
        <View style={styles.modalContent}>
          {itemIndex !== 0 && (
            <TouchableOpacity
              onPress={() => {
                changeOrder(itemIndex, 'up');
                navigation.goBack();
              }}
            >
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Icon name="arrow-left" size={20} color={colors.blueGray} solid />
                </View>
                <Text style={{ ...defaultStyles.hugeLight, ...styles.rowText, color: colors.blueGray }}>Move left</Text>
              </View>
            </TouchableOpacity>
          )}
          {itemIndex !== storyLength - 1 && (
            <TouchableOpacity
              onPress={() => {
                changeOrder(itemIndex, 'down');
                navigation.goBack();
              }}
            >
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Icon name="arrow-right" size={20} color={colors.blueGray} solid />
                </View>
                <Text style={{ ...defaultStyles.hugeLight, ...styles.rowText, color: colors.blueGray }}>Move right</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              removeStoryItem(itemIndex);
              navigation.goBack();
            }}
          >
            <View style={styles.row}>
              <View style={styles.rowIcon}>
                <Icon name="trash-alt" size={20} color={colors.peach} solid />
              </View>
              <Text style={{ ...defaultStyles.hugeLight, ...styles.rowText, color: colors.peach }}>Remove Item</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.modalFooter}>
          <GrayButton onPress={() => navigation.goBack()}>Close</GrayButton>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EditStoryItemPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transparentSection: {
    flexGrow: 1,
  },
  modalView: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',

    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 10,
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
    color: colors.blueGray,
  },
  modalContent: {
    flexGrow: 1,
    width: '100%',
    paddingVertical: 15,
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
