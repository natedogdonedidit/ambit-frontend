import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import FollowButton from 'library/components/UI/buttons/FollowButton';
import { UserContext } from 'library/utils/UserContext';

const UserListItem = ({ navigation, user }) => {
  const { currentUserId } = useContext(UserContext);
  const isMe = currentUserId === user.id;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() =>
        navigation.navigate({ name: 'Profile', key: `Profile:${user.username}`, params: { username: user.username } })
      }
    >
      <View style={styles.connection}>
        <View style={styles.profilePicView}>
          <ProfilePic size="medium" navigation={navigation} user={user} />
        </View>
        <View style={styles.rightSide}>
          <Text style={defaultStyles.largeSemibold}>{user.name}</Text>
          {user.headline && <Text style={defaultStyles.defaultMute}>{user.headline}</Text>}
          {/* {user.location && <Text style={defaultStyles.defaultMute}>{user.location}</Text>} */}
          {user.bio && <Text style={{ ...defaultStyles.defaultText, paddingTop: 8 }}>{user.bio}</Text>}
          {!isMe && (
            <View style={{ paddingTop: 0, paddingRight: 12, position: 'absolute', top: 0, right: 0 }}>
              <FollowButton userToFollowID={user.id} />
            </View>
          )}
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
  reasonRow: {
    flexDirection: 'row',
    marginTop: 10,
    // left: -18,
  },
});

export default UserListItem;
