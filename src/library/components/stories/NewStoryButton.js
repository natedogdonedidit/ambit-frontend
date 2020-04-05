import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';

const NewStoryButton = ({ navigation, userLoggedIn }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('CreateStoryModal')} style={styles.storyBox}>
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['transparent', colors.black]}
        style={styles.linearGradient}
      />
      <View style={{ top: 7, left: 7 }}>
        <Icon name="plus-circle" size={30} color={colors.purp} style={{}} />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ ...defaultStyles.defaultMedium, color: colors.white }}>Create a story or project</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyBox: {
    justifyContent: 'space-between',
    height: 150,
    width: 100,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    overflow: 'hidden',
    marginLeft: 10,
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
