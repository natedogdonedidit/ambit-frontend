import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import FollowButton from 'library/components/UI/buttons/FollowButton';
import ConnectButton from 'library/components/UI/buttons/ConnectButton';
import ThreeDotsButton from 'library/components/UI/buttons/ThreeDotsButton';
import MessageButton from 'library/components/UI/buttons/MessageButton';
import SmallGrayButton from 'library/components/UI/buttons/SmallGrayButton';
import ProfilePic from 'library/components/UI/ProfilePic';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NameBox = ({ user, navigation, isMyProfile }) => {
  const [followersAdjustment, setFollowersAdjustment] = useState(0);

  useEffect(() => {
    setFollowersAdjustment(0);
  }, [user.followersCount]);

  // custom functions
  const renderWebsite = () => {
    if (!user.website) return null;
    return <Text style={{ ...defaultStyles.defaultRegular, color: colors.iosBlue }}>🌎{`  ${user.website}`}</Text>;
  };

  const renderStats = () => {
    return (
      <View style={styles.stats}>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => navigation.navigate('Followers', { userID: user.id, followersCount: user.followersCount })}
        >
          <Text style={{ ...defaultStyles.defaultSemibold, marginRight: 5, marginLeft: 0, color: colors.iosBlue }}>
            {user.followersCount + followersAdjustment}
          </Text>
          <Text style={{ ...defaultStyles.defaultMute, marginRight: 10 }}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => navigation.navigate('Following', { userID: user.id, followingCount: user.followingCount })}
        >
          <Text style={{ ...defaultStyles.defaultSemibold, marginRight: 5, marginLeft: 0, color: colors.iosBlue }}>
            {user.followingCount || 0}
          </Text>
          <Text style={{ ...defaultStyles.defaultMute, marginRight: 10 }}>Following</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ ...styles.profileBox }}>
      <Text style={{ ...defaultStyles.hugeMedium, ...styles.name }}>{user.name}</Text>
      {user.headline && <Text style={{ ...defaultStyles.defaultMute, ...styles.headline }}>{user.headline}</Text>}
      {renderStats()}
      {user.bio && <Text style={{ ...defaultStyles.defaultText, ...styles.bio }}>{user.bio}</Text>}
      {!!user.website && <View style={styles.detailsBox}>{renderWebsite()}</View>}

      {/* absolute */}
      <View style={styles.topRowButtons}>
        {isMyProfile ? (
          <SmallGrayButton onPress={() => navigation.navigate('EditProfileModal', { user })}>Edit Profile</SmallGrayButton>
        ) : (
          <>
            <MessageButton
              onPress={() => navigation.navigate('Chat', { otherUserPassedIn: user })}
              buttonStyle={{ marginRight: 6 }}
            />
            {/* <ConnectButton onPress={() => null} buttonStyle={{ marginRight: 10 }} /> */}

            <FollowButton userToFollow={user} setFollowersAdjustment={setFollowersAdjustment} />
          </>
        )}
      </View>
      <View style={styles.profilePicView}>
        <ProfilePic user={user} navigation={navigation} size="large" border borderWidth={2.4} />
      </View>
    </View>
  );
};

export default NameBox;

const styles = StyleSheet.create({
  profileBox: {
    width: '100%',
    paddingTop: 50, // to make white space for Profile Pic & Buttons
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
    marginBottom: 1,
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
  stats: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginTop: 2,
    marginBottom: 15,
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
