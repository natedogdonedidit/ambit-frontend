import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GrayButton from 'library/components/UI/GrayButton';

const EditPostPopup = ({ navigation }) => {
  // const postToEdit = navigation.getParam('postToEdit');
  const deletePost = navigation.getParam('deletePost');

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
            deletePost();
            navigation.goBack();
          }}
        >
          <View style={styles.row}>
            <View style={styles.rowIcon}>
              <Icon name="star" size={20} color={colors.darkGray} solid />
            </View>
            <Text style={{ ...defaultStyles.largeThin, ...styles.rowText }}>Delete Post</Text>
          </View>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <GrayButton onPress={() => navigation.goBack()}>Close</GrayButton>
        </View>
      </View>
    </View>
  );
};

export default EditPostPopup;

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