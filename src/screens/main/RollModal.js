import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { requestCameraRollPermission } from 'library/utils';

import HeaderWhite from 'library/components/headers/HeaderWhite';

const { width } = Dimensions.get('window');

const RollModal = ({ navigation }) => {
  const [cameraRoll, setCameraRoll] = useState([]);

  const assetType = navigation.getParam('assetType', 'Photos');
  const handleMediaSelect = navigation.getParam('handleMediaSelect');

  const getPhotosFromCameraRoll = async () => {
    // 1. request camera roll permission if android
    if (Platform.OS === 'android') {
      const isTrue = await PermissionsAndroid.check('READ_EXTERNAL_STORAGE');
      if (!isTrue) await requestCameraRollPermission();
    }

    // 2. get images from camera roll
    try {
      const res = await CameraRoll.getPhotos({
        first: 10,
        assetType,
      });

      const cameraRollImages = res.edges.map(image => image.node.image.uri);

      // 3. put images into state and open modal to dispaly images
      setCameraRoll(cameraRollImages);
    } catch (e) {
      console.error(e);
      Alert.alert('Oh no!', 'We could not access your camera roll. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  // execute every
  useEffect(() => {
    getPhotosFromCameraRoll();
  });

  const closeModal = () => {
    navigation.goBack();
  };

  const handleSelect = async media => {
    handleMediaSelect(media);
    navigation.goBack();
  };

  const renderImages = () => {
    return (
      <FlatList
        style={styles.flatList}
        numColumns={3}
        data={cameraRoll}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.picView}>
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Image style={styles.pic} resizeMode="cover" source={{ uri: item }} />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWhite handleLeft={closeModal} textLeft="Back" textRight="" title="Select an Image" />
      {cameraRoll.length > 0 ? renderImages() : <Text>No images in camera roll</Text>}
    </SafeAreaView>
  );
};

export default RollModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    width: '100%',
  },
  picView: {
    width: width / 3,
    height: width / 3,
    padding: 1,
  },
  pic: {
    width: '100%',
    height: '100%',
  },
});
