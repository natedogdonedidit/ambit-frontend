import React from 'react';
import { StyleSheet, Modal, View, ScrollView, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const EditPostModal = ({ handleDeletePost }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setModalVisibleEditPost(false)}>
        <View style={styles.closeModal} />
      </TouchableWithoutFeedback>
      <View style={styles.modalView}>
        <View style={styles.handleView}>
          <View style={styles.handle} />
        </View>
        <TouchableOpacity onPress={() => null}>
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Icon name="edit" solid size={18} color={colors.darkGray} style={{ opacity: 0.3 }} />
            </View>
            <View style={styles.settingText}>
              <Text style={defaultStyles.hugeLight}>Add an Update</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletePost()}>
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Icon name="trash-alt" solid size={18} color={colors.darkGray} style={{ opacity: 0.3 }} />
            </View>
            <View style={styles.settingText}>
              <Text style={{ ...defaultStyles.hugeLight }}>Delete Post</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditPostModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeModal: {
    flexGrow: 1,
  },
  modalView: {
    width: '100%',
    // height: 200,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 50,
  },
  handleView: {
    alignItems: 'center',
    marginBottom: 15,
  },
  handle: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.darkGray,
    marginTop: 8,
  },
  settingRow: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    paddingRight: 15,
    alignItems: 'center',
  },
  settingIcon: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
