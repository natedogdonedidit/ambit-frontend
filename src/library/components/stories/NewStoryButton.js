import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';

const NewStoryButton = ({ navigation }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('CameraModal')} style={styles.storyBox}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: colors.purp,
          justifyContent: 'center',
          alignItems: 'center',
          ...defaultStyles.shadowButton,
        }}
      >
        <Icon name="camera" size={28} color={colors.white} style={{}} />
      </View>
      <Text style={{ ...defaultStyles.defaultMediumMute, paddingTop: 6 }}>Share</Text>
    </TouchableOpacity>
  );

  // the old way
  // return (
  //   <TouchableOpacity onPress={() => navigation.navigate('CameraModal')} style={styles.storyBox}>
  //     <LinearGradient
  //       start={{ x: 0.5, y: 0 }}
  //       end={{ x: 0.5, y: 1 }}
  //       colors={['transparent', 'rgba(0,0,0,0.4)']}
  //       style={styles.linearGradient}
  //     />
  //     <View style={{ top: 7, left: 7 }}>
  //       <Icon name="plus-circle" size={30} color={colors.purp} style={{}} />
  //     </View>

  //     <View
  //       style={{
  //         position: 'absolute',
  //         bottom: 10,
  //         left: 0,
  //         paddingHorizontal: 8,
  //       }}
  //     >
  //       <Text style={{ ...defaultStyles.defaultMedium, fontSize: 13, color: colors.white }}>Create a story or project</Text>
  //     </View>
  //   </TouchableOpacity>
  // );
};

const styles = StyleSheet.create({
  storyBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    paddingHorizontal: 10,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});

export default NewStoryButton;
