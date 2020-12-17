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

const NewProjectButton = () => {
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
      <View style={{ width: 60, height: 60, borderRadius: 30 }}>
        <Image
          style={{ width: 60, height: 60, borderRadius: 30 }}
          resizeMode="cover"
          source={{
            uri: userLoggedIn.profilePic || profilePicExample,
          }}
        />
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: colors.purp,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: -3,
            right: -3,
          }}
        >
          <Icon name="plus" size={12} color={colors.white} style={{ paddingLeft: 1 }} />
        </View>
      </View>
      <View>
        <Text style={{ ...defaultStyles.defaultStory }}>New</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyBox: {
    // justifyContent: 'space-between',
    height: 80,
    width: 70,
    // borderRadius: 30,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    overflow: 'hidden',
    // marginLeft: 3,
    // backgroundColor: colors.gray12,
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default NewProjectButton;
