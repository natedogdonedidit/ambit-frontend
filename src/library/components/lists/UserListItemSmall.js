import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import FollowButton from 'library/components/UI/buttons/FollowButton';
// import MessageButton from 'library/components/UI/buttons/MessageButton';
import HideButton from 'library/components/UI/buttons/HideButton';

const UserListItemSmall = ({ user, onPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity key={user.id} style={styles.user} activeOpacity={0.7} onPress={onPress}>
      <ProfilePic size="small" user={user} enableIntro={false} enableStory={false} enableClick={false} />
      <Text style={{ ...defaultStyles.defaultMedium, paddingLeft: 10 }}>
        {user.name}
        <Text style={{ ...defaultStyles.defaultMute, paddingLeft: 5 }}> @{user.username}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 52,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
});

export default UserListItemSmall;
