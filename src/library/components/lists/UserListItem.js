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

const UserListItem = ({ user, showFollow, showHide, postId, selectedUser, setSelectedUser }) => {
  const navigation = useNavigation();

  const [isHidden, setIsHidden] = useState(false);

  if (isHidden) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() =>
        navigation.navigate({
          name: 'Profile',
          key: `Profile:${user.username}`,
          params: { username: user.username },
        })
      }
    >
      <View style={styles.connection}>
        <View style={styles.profilePicView}>
          <ProfilePic size="medium" navigation={navigation} user={user} />
        </View>
        <View style={styles.rightSide}>
          <Text style={defaultStyles.largeSemibold}>{user.name}</Text>
          {!!user.username && <Text style={defaultStyles.defaultMute}>@{user.username}</Text>}
          {/* {user.location && <Text style={defaultStyles.defaultMute}>{user.location}</Text>} */}
          {!!user.bio && <Text style={{ ...defaultStyles.defaultText, paddingTop: 8 }}>{user.bio}</Text>}
          <View style={styles.absoluteButtons}>
            {showFollow && <FollowButton userToFollowID={user.id} username={user.username} small onRow />}
            {showHide && (
              <HideButton
                postId={postId}
                userId={user.id}
                setIsHidden={setIsHidden}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            )}
            {/* <MessageButton
              onPress={() => navigation.navigate({ name: 'Chat', key: `Chat:${user.id}`, params: { otherUserPassedIn: user } })}
              buttonStyle={{ marginLeft: 6 }}
              small
            /> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  connection: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  profilePicView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 76,
    alignSelf: 'flex-start',
    paddingLeft: 4,
    // paddingRight: 15,
  },
  rightSide: {
    flex: 1,
    paddingRight: 15,
    position: 'relative',
  },
  absoluteButtons: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 36,
    // backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingRight: 15,
  },
});

export default UserListItem;
