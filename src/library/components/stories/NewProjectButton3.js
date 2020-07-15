import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import Loader from 'library/components/UI/Loader';

const NewProjectButton2 = ({ navigation, userLoggedIn, loadingCreateStory }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('CameraModal', { isIntro: false })}
      style={styles.storyBox}
    >
      <View style={{ width: '100%', height: 100 }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          source={{
            uri: userLoggedIn.profilePic,
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: 36,
          top: 100 - 18,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: colors.lightGray,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: colors.purp,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="camera" size={16} color={colors.lightGray} style={{}} />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: 18,
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ ...defaultStyles.defaultSemibold, textAlign: 'center', fontSize: 13, color: colors.blueGray }}>
          New story or project
        </Text>
      </View>
      {loadingCreateStory && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 96,
            height: 160,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader loading={loadingCreateStory} size="large" color={colors.gray60} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyBox: {
    // justifyContent: 'space-between',
    height: 160,
    width: 96,
    borderRadius: 10,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    overflow: 'hidden',
    marginLeft: 6,
    backgroundColor: colors.gray12,
    position: 'relative',
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
