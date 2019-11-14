import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GrayButton from 'library/components/UI/GrayButton';

const EditPostPopup = ({ navigation }) => {
  const post = navigation.getParam('post');
  const isMyPost = navigation.getParam('isMyPost');
  const isComment = navigation.getParam('isComment', false);
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
      <SafeAreaView style={styles.modalView}>
        <View style={styles.handleView}>
          <View style={styles.handle} />
        </View>
        <View style={styles.modalContent}>
          {post.isGoal && isMyPost && (
            <TouchableOpacity onPress={() => navigation.navigate('UpdatePost', { post })}>
              <View style={styles.row}>
                <View style={styles.rowIcon}>
                  <Icon name="edit" size={20} color={colors.iconGray} solid />
                </View>
                <Text style={{ ...defaultStyles.hugeLight, ...styles.rowText }}>Add an update</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              deletePost();
              navigation.goBack();
            }}
          >
            <View style={styles.row}>
              <View style={styles.rowIcon}>
                <Icon name="trash-alt" size={20} color={colors.peach} solid />
              </View>
              <Text style={{ ...defaultStyles.hugeLight, ...styles.rowText, color: colors.peach }}>
                Delete {isComment ? 'Comment' : 'Post'}
              </Text>
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
