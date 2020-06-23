import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from '@apollo/react-hooks';
import ImagePicker from 'react-native-image-crop-picker';

import EDIT_BIO_MUTATION from 'library/mutations/EDIT_BIO_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import CURRENT_USER_QUERY_HEADER from 'library/queries/CURRENT_USER_QUERY_HEADER';
import { profilePicUpload, bannerPicUpload, sortExperiences } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import TextButton from 'library/components/UI/buttons/TextButton';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import ProfilePicBasic from 'library/components/UI/ProfilePicBasic';
import EditProfileModalComponent from './EditProfileModalComponent';

const EditProfileModal = ({ navigation }) => {
  const { loading, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) {
    return <Loader active={loading} />;
  }

  const { userLoggedIn } = data;

  return <EditProfileModalComponent navigation={navigation} user={userLoggedIn} />;
};

export default EditProfileModal;

const styles = StyleSheet.create({
  profilePicView: {
    top: -20,
    left: 20,
    width: 80,
    alignItems: 'center',
  },
  editButton: {
    ...defaultStyles.defaultText,
    color: colors.iosBlue,
    textAlign: 'center',
  },
  editBannerButton: {
    position: 'absolute',
    justifyContent: 'center',
    top: 100,
    right: 12,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: -5,
    paddingBottom: 30,
  },
  sectionTitle: {
    width: '100%',
    paddingBottom: 15,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  touchableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTitle: {
    width: 100,
  },
  hatRowTop: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  hatRow: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  hatTitle: {
    flex: 1,
  },
  hatButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rowInput: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  rowMultiline: {
    flexDirection: 'row',
    // height: 200,
    marginTop: 4,
    // alignItems: 'center',
  },
  multilineInput: {
    // height: 40,
    maxHeight: 90,
    maxWidth: 300,
    paddingBottom: 10,
  },
  rowInputNoBorder: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
  },
});
