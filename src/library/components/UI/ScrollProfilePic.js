import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';

const ScrollProfilePic = ({ pic, pitch, intro = true, selected = false }) => {
  // const needsBorder = !!pitch || !!intro;
  const needsBorder = true;

  return (
    <View style={needsBorder ? styles.outterCircle : null}>
      {!!intro && (
        <LinearGradient
          start={{ x: 0.4, y: 0.4 }}
          end={{ x: 1, y: 1 }}
          colors={[colors.purp, colors.purple]}
          style={styles.linearGradient}
        />
      )}
      {!!pitch && (
        <LinearGradient
          start={{ x: 0.4, y: 0.4 }}
          end={{ x: 1, y: 1 }}
          colors={[colors.peach, colors.purpGradient]}
          style={styles.linearGradient}
        />
      )}
      <View style={[{ ...styles.profilePicView }, needsBorder ? { ...styles.whiteBorder } : null]}>
        <Image
          style={{ ...styles.profilePic }}
          resizeMode="cover"
          source={{
            uri: pic || profilePicExample,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  whiteBorder: {
    width: 54,
    height: 54,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: 'white',
    marginTop: 1.5,
    marginLeft: 1.5,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  outterCircle: {
    width: 57,
    height: 57,
    borderRadius: 28.5,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});

export default ScrollProfilePic;