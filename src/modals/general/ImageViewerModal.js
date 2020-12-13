import React, { useState } from 'react';
import ImageView from 'react-native-image-viewing';

const ImageViewerModal = ({ navigation, route }) => {
  // ROUTE PARAMS
  const { images, index } = route.params; // urls
  const [visible, setIsVisible] = useState(true);

  const formattedImages = images.map(imageURL => {
    return { uri: imageURL };
  });

  return (
    <ImageView
      images={formattedImages}
      imageIndex={index}
      visible={visible}
      onRequestClose={() => {
        setIsVisible(false);
        navigation.goBack();
      }}
    />
  );
};

export default ImageViewerModal;
