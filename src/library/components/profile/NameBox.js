import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import FollowButton from 'library/components/UI/buttons/FollowButton';
import MessageButton from 'library/components/UI/buttons/MessageButton';
import SmallGrayButton from 'library/components/UI/buttons/SmallGrayButton';
import ProfilePic from 'library/components/UI/ProfilePic';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FollowStats from './FollowStats';

// user is from SINGLE_USER_BASIC
const NameBox = ({ user, navigation, isMyProfile }) => {
  // custom functions
  const renderWebsite = () => {
    if (!user.website) return null;
    return <Text style={{ ...defaultStyles.defaultRegular, color: colors.iosBlue }}>🌎{`  ${user.website}`}</Text>;
  };

  return (
    <View style={{ ...styles.profileBox }}>
      <Text style={{ fontFamily: 'SFProDisplay-Bold', fontSize: 20, fontWeight: '600', ...styles.name }}>{user.name}</Text>
      {!!user.username && (
        <Text style={{ ...defaultStyles.defaultMute, fontWeight: '500', ...styles.headline }}>@{user.username}</Text>
      )}
      {!!user.bio && <Text style={{ ...defaultStyles.defaultText, ...styles.bio }}>{user.bio}</Text>}
      {!!user.website && <View style={styles.detailsBox}>{renderWebsite()}</View>}
      <FollowStats username={user.username} navigation={navigation} />

      {/* absolute */}
      <View style={styles.topRowButtons}>
        {isMyProfile ? (
          <SmallGrayButton onPress={() => navigation.navigate('EditProfileModal', { username: user.username })}>
            Edit Profile
          </SmallGrayButton>
        ) : (
          <>
            <MessageButton
              onPress={() => navigation.navigate({ name: 'Chat', key: `Chat:${user.id}`, params: { otherUserPassedIn: user } })}
              buttonStyle={{ marginRight: 6 }}
            />
            {/* <ConnectButton onPress={() => null} buttonStyle={{ marginRight: 10 }} /> */}

            <FollowButton userToFollowID={user.id} username={user.username} />
          </>
        )}
      </View>
      <View style={styles.profilePicView}>
        <ProfilePic user={user} navigation={navigation} size="large" border borderWidth={2.4} enableStory={false} />
      </View>
    </View>
  );
};

export default NameBox;

const styles = StyleSheet.create({
  profileBox: {
    width: '100%',
    paddingTop: 56, // to make white space for Profile Pic & Buttons
    paddingHorizontal: 20,
    backgroundColor: 'white',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
  },
  profilePicView: {
    position: 'absolute',
    top: -35,
    left: 20,
  },
  topRowButtons: {
    position: 'absolute',
    top: 10,
    right: 20,

    flexDirection: 'row',
  },
  name: {
    marginBottom: 1,
  },
  headline: {
    marginBottom: 15,
  },
  bio: {
    marginBottom: 15,
  },
  detailsBox: {
    marginBottom: 15,
  },
  whiteButtons: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 20,
  },
  editProfileButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  editButton: {
    fontSize: 14,
  },
});
