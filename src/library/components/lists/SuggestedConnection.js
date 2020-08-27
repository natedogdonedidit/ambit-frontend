import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import FollowButton from 'library/components/UI/buttons/FollowButton';
import MessageButton from 'library/components/UI/buttons/MessageButton';

const SuggestedConnection = ({ navigation, user, showMessage, showFollow }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate('Profile', { profileId: user.id, username: user.username })}
    >
      <View style={styles.connection}>
        <View style={styles.profilePicView}>
          <ProfilePic size="medium" navigation={navigation} user={user} />
        </View>
        <View style={styles.rightSide}>
          <Text style={defaultStyles.largeSemibold}>{user.name}</Text>
          {user.username && <Text style={defaultStyles.defaultMute}>@{user.username}</Text>}
          {/* {user.location && <Text style={defaultStyles.defaultMute}>{user.location}</Text>} */}
          {user.bio && <Text style={{ ...defaultStyles.defaultText, paddingTop: 8 }}>{user.bio}</Text>}
          <View style={styles.absoluteButtons}>
            <FollowButton userToFollowID={user.id} small onRow />
            <MessageButton
              onPress={() => navigation.navigate('Chat', { otherUserPassedIn: user })}
              buttonStyle={{ marginLeft: 6 }}
              small
            />
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

export default SuggestedConnection;
