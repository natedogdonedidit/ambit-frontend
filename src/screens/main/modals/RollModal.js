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
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';

const { width } = Dimensions.get('window');

const RollModal = ({ navigation }) => {
  // make sure these params get passed in!!
  const assetTypeRequested = navigation.getParam('assetType', 'All'); // All, Photos, Videos
  const handleMediaSelect = navigation.getParam('handleMediaSelect');
  const selected = navigation.getParam('selected', []);

  const [assetType, setAssetType] = useState(assetTypeRequested === 'All' ? 'Photos' : assetTypeRequested);
  const [cameraRoll, setCameraRoll] = useState([]);

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

      const cameraRollObjects = res.edges.map(image => {
        return { uri: image.node.image.uri, type: image.node.type };
      });

      // 3. put images into state and open modal to dispaly images
      setCameraRoll(cameraRollObjects);
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
  }, [assetType]);

  const closeModal = () => {
    navigation.goBack();
  };

  const handleSelect = async (uri, type) => {
    handleMediaSelect(uri, type);
    navigation.goBack();
  };

  const swapType = () => {
    setAssetType(assetType === 'Photos' ? 'Videos' : 'Photos');
  };

  const textRight = () => {
    if (assetTypeRequested !== 'All') return '';

    return assetType === 'Photos' ? 'Videos' : 'Photos';
  };

  const renderImages = () => {
    return (
      <FlatList
        style={styles.flatList}
        numColumns={3}
        data={cameraRoll}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.uri);
          return (
            <View style={styles.picView}>
              <TouchableOpacity onPress={() => handleSelect(item.uri, item.type)}>
                <Image style={styles.pic} resizeMode="cover" source={{ uri: item.uri }} />
                {isSelected && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 1,
                      right: 1,
                      left: 1,
                      bottom: 1,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      borderWidth: 4,
                      borderColor: colors.brightGreen,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Icon name="check-circle" solid size={30} color={colors.brightGreen} />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWhite
        handleLeft={closeModal}
        textLeft="Back"
        handleRight={assetTypeRequested === 'All' ? swapType : () => null}
        textRight={textRight()}
        title={assetType === 'Photos' ? 'Photos' : 'Videos'}
      />
      {cameraRoll.length > 0 ? renderImages() : <Text style={styles.noImagesText}>No images in camera roll</Text>}
    </SafeAreaView>
  );
};

export default RollModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  noImagesText: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 30,
    ...defaultStyles.defaultItalic,
  },
});
