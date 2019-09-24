import React, { useState } from 'react';
import { StyleSheet, Modal, SafeAreaView, View, Text, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';

import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';

const { width } = Dimensions.get('window');

const RollModal = ({ navigation }) => {
  const cameraRoll = navigation.getParam('cameraRoll', []);

  const closeModal = () => {
    navigation.goBack();
  };

  const pressImage = async image => {
    handleImageSelect(image);
    closeModal();
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
            <TouchableOpacity onPress={() => pressImage(item)}>
              <Image style={styles.pic} resizeMode="cover" source={{ uri: item }} />
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <TextButton textStyle={styles.closeButtonText} onPress={() => closeModal()}>
            Cancel
          </TextButton>
          <Text style={{ ...defaultStyles.headerTitle, ...styles.headerTitle }}>Select an Image</Text>
          <TextButton textStyle={styles.saveButtonText} onPress={() => closeModal()}>
            Done
          </TextButton>
        </View>
        {cameraRoll.length > 0 ? renderImages() : <Text>No images in camera roll</Text>}
      </View>
    </SafeAreaView>
  );
};

export default RollModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    width: 60,
    textAlign: 'left',
  },
  saveButtonText: {
    width: 60,
    textAlign: 'right',
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: 'center',
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
