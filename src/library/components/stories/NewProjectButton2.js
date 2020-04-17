import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import Loader from 'library/components/UI/Loader';

const NewProjectButton2 = ({ navigation, loadingCreateStory }) => {
  return (
    <View style={styles.storyBox}>
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
        <Text style={{ ...defaultStyles.defaultSemibold, fontSize: 13, color: colors.gray60 }}>Create a{'\n'}new project</Text>
      </View>
      {loadingCreateStory && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 100,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader loading={loadingCreateStory} size="large" color={colors.gray60} />
        </View>
      )}
    </View>
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
    marginLeft: 6,
    backgroundColor: colors.gray12,
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
});

export default NewProjectButton2;
