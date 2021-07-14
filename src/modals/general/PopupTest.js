import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import REPOST_POST_MUTATION from 'library/mutations/REPOST_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';

const PopupTest = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  // const { handleRepost, postId } = route.params;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
        }}>
        <View style={styles.transparentSection} />
      </TouchableWithoutFeedback>
      <View style={{ ...styles.modalContent, paddingBottom: insets.bottom }}>
        <Text style={styles.title}>Test Popup</Text>
      </View>
    </View>
  );
};

export default PopupTest;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'transparent',
    backgroundColor: 'pink',
    opacity: 0.2,
    // paddingHorizontal: 12,
    // paddingBottom: 12,
  },
  transparentSection: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  modalContent: {
    width: '100%',
    // height: 120,
    flexDirection: 'column',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    height: 60,
  },
  title: {
    textAlign: 'center',
    paddingTop: 15,
    ...defaultStyles.hugeSemibold,
    // color: colors.blueGray,
  },
});
