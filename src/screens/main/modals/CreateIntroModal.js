import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import MediaMeta from 'react-native-media-meta';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import SmallGrayButton from 'library/components/UI/SmallGrayButton';

const CreateIntroModal = ({ navigation }) => {
  const recordNewVideo = () => {
    ImagePicker.openCamera({
      mediaType: 'video',
      useFrontCamera: true,
      includeExif: true,
    }).then(recordedVideo => {
      console.log(recordedVideo);

      // 1. upload video & divide into 10s incrememnts

      // 2. retrieve URL's for each video segment

      // 3. put URL's into state
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderWhite handleLeft={navigation.goBack} handleRight={null} textLeft="Cancel" textRight="" title="Your Intro" />
      <SmallGrayButton onPress={recordNewVideo}>Add Video</SmallGrayButton>
    </SafeAreaView>
  );
};

export default CreateIntroModal;
