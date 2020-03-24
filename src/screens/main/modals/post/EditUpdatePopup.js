import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GrayButton from 'library/components/UI/buttons/GrayButton';

import DELETE_UPDATE_MUTATION from 'library/mutations/DELETE_UPDATE_MUTATION';
import POST_COMMENTS_QUERY from 'library/queries/POST_COMMENTS_QUERY';
import { UserContext } from 'library/utils/UserContext';

const EditUpdatePopup = ({ navigation, route }) => {
  const { update } = route.params;
  const { currentUserId } = useContext(UserContext);
  const isMyPost = currentUserId === update.parentPost.owner.id;

  // DELETE MUTATION
  const [deleteUpdate] = useMutation(DELETE_UPDATE_MUTATION, {
    variables: {
      id: update.id,
      ownerID: update.parentPost.owner.id,
    },
    refetchQueries: () => [{ query: POST_COMMENTS_QUERY, variables: { id: update.parentPost.id } }],
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this update. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const handleDelete = () => {
    deleteUpdate();
    navigation.goBack();
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
      <SafeAreaView style={styles.modalView}>
        <View style={styles.handleView}>
          <View style={styles.handle} />
        </View>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={() => null}>
            <View style={styles.row}>
              <View style={styles.rowIcon}>
                <Icon name="flag" size={20} color={colors.iconGray} />
              </View>
              <Text style={{ ...defaultStyles.hugeLight, ...styles.rowText }}>Report</Text>
            </View>
          </TouchableOpacity>
          {isMyPost && (
            <TouchableOpacity onPress={handleDelete}>
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Icon name="trash-alt" size={20} color={colors.peach} solid />
                </View>
                <Text style={{ ...defaultStyles.hugeLight, ...styles.rowText, color: colors.peach }}>Delete Update</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.modalFooter}>
          <GrayButton onPress={() => navigation.goBack()}>Close</GrayButton>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EditUpdatePopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  transparentSection: {
    flexGrow: 1,
    backgroundColor: 'transparent',
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
