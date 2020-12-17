import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useQuery } from '@apollo/client';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import Loader from 'library/components/UI/Loader';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import { useNavigation } from '@react-navigation/native';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';

const NewProjectButton = ({ loadingCreateStory }) => {
  const navigation = useNavigation();
  const { data } = useQuery(CURRENT_USER_QUERY);
  if (!data) {
    return null;
  }

  const { userLoggedIn } = data;

  if (!userLoggedIn) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('StoryCameraModal', { isNewProject: true })}
      style={styles.storyBox}
    >
      <View style={{ width: '100%', height: 76 }}>
        <Image
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
          source={{
            uri: userLoggedIn.profilePic || profilePicExample,
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: 36,
          top: 85 - 26,
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
          paddingTop: 20,
          paddingHorizontal: 8,
        }}
      >
        <Text style={{ ...defaultStyles.defaultSemibold, textAlign: 'center', fontSize: 13, color: colors.blueGray }}>New</Text>
        {/* <Text style={{ ...defaultStyles.defaultSemibold, textAlign: 'center', fontSize: 13, color: colors.blueGray }}>Bit</Text> */}
      </View>
      {loadingCreateStory && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 85,
            height: 136,
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
    height: 120,
    width: 80,
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

export default NewProjectButton;
