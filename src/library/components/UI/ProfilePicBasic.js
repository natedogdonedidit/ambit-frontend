import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';

const ProfilePicBasic = ({ pic, size = 40, border = false, borderWidth = 2 }) => {
  // sizes
  // small = 30
  // medium = 40
  // large = 70

  const whiteBorder = size + 2 * borderWidth;

  const styles = StyleSheet.create({
    noBorder: {
      width: size,
      height: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      backgroundColor: 'white',
    },
    whiteBorder: {
      width: whiteBorder,
      height: whiteBorder,
      borderRadius: whiteBorder / 2,
      borderWidth,
      borderColor: 'white',
      overflow: 'hidden',
    },
    profilePic: {
      width: '100%',
      height: '100%',
    },
    grayBox: {
      width: '100%',
      height: '100%',
      backgroundColor: 'lightgray',
    },
  });

  if (!pic) {
    return (
      <View style={border ? styles.whiteBorder : styles.noBorder}>
        <View style={styles.grayBox} />
      </View>
    );
  }

  return (
    <View style={border ? styles.whiteBorder : styles.noBorder}>
      <Image
        style={{ ...styles.profilePic }}
        resizeMode="cover"
        source={{
          uri: pic || profilePicExample,
        }}
      />
    </View>
  );
};

export default ProfilePicBasic;
