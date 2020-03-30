import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useQuery, useMutation } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import FollowButton from 'library/components/UI/buttons/FollowButton';
import ConnectButton from 'library/components/UI/buttons/ConnectButton';
import ThreeDotsButton from 'library/components/UI/buttons/ThreeDotsButton';
import MessageButton from 'library/components/UI/buttons/MessageButton';
import SmallGrayButton from 'library/components/UI/buttons/SmallGrayButton';
import ProfilePic from 'library/components/UI/ProfilePic';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const NameBox = ({ user, navigation, isMyProfile }) => {
  const [followersCount, setFollowersCount] = useState(user.followersCount || 0);
  const [connectionsCount, setConnectionsCount] = useState(user.connectionsCount || 0);

  const isFreelancer = user.topicsFreelance.length > 0;
  const isMentor = user.topicsMentor.length > 0;
  const isInvestor = user.topicsInvest.length > 0;
  const useOpenToBox = isFreelancer || isMentor || isInvestor;

  const { loading: loadingUser, error, data } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = data;

  // custom functions
  const renderOpenTo = () => {
    if (!useOpenToBox) return null;

    return (
      <Text>
        <Text style={defaultStyles.defaultMute}>💼{`  `}Open to</Text>
        {isFreelancer && <Text style={{ ...defaultStyles.defaultSemibold, color: colors.purple }}> freelance</Text>}
        {isFreelancer && isInvestor && <Text style={{ ...defaultStyles.defaultText }}>,</Text>}
        {isInvestor && <Text style={{ ...defaultStyles.defaultSemibold, color: colors.green }}> invest</Text>}
        {(isFreelancer || isInvestor) && isMentor && <Text style={{ ...defaultStyles.defaultText }}>,</Text>}
        {isMentor && <Text style={{ ...defaultStyles.defaultSemibold, color: colors.salmon }}> mentor</Text>}
      </Text>
    );
  };

  const renderLocation = () => {
    if (!user.location) return null;
    return (
      <Text style={{ ...defaultStyles.defaultText }}>
        📍<Text style={{ ...defaultStyles.defaultMute }}>{`  ${user.location}`}</Text>
      </Text>
    );
  };

  const renderWebsite = () => {
    if (!user.website) return null;
    return <Text style={{ ...defaultStyles.defaultRegular, color: colors.iosBlue }}>🌎{`  ${user.website}`}</Text>;
  };

  const renderStats = () => {
    return (
      <View style={styles.stats}>
        <Text style={{ ...defaultStyles.defaultSemibold, marginRight: 5, marginLeft: 0, color: colors.iosBlue }}>
          {followersCount}
        </Text>
        <Text style={{ ...defaultStyles.defaultMute, marginRight: 10 }}>Followers</Text>

        <Text style={{ ...defaultStyles.defaultSemibold, marginRight: 5, color: colors.iosBlue }}>{connectionsCount}</Text>
        <Text style={{ ...defaultStyles.defaultMute, marginRight: 20 }}>Connections</Text>
      </View>
    );
  };

  return (
    <View style={{ ...styles.profileBox }}>
      <Text style={{ ...defaultStyles.hugeMedium, ...styles.name }}>{user.name}</Text>
      {user.headline && <Text style={{ ...defaultStyles.defaultMute, ...styles.headline }}>{user.headline}</Text>}
      {renderStats()}
      {user.bio && <Text style={{ ...defaultStyles.defaultText, ...styles.bio }}>{user.bio}</Text>}
      {(useOpenToBox || !!user.website || !!user.location) && (
        <View style={styles.detailsBox}>
          {renderLocation()}
          {renderWebsite()}
          {renderOpenTo()}
        </View>
      )}

      <View style={styles.whiteButtons}>
        {/* <View style={{ flex: 1 }}> */}
        <View style={{ flex: 1, paddingRight: 7 }}>
          <FollowButton
            userLoggedIn={userLoggedIn}
            userToFollow={user}
            followersCount={followersCount}
            setFollowersCount={setFollowersCount}
          />
        </View>

        <View style={{ flex: 1, paddingLeft: 7 }}>
          <ConnectButton />
        </View>
        {/* <View style={{ marginLeft: 15 }}>
          <ThreeDotsButton buttonStyle={{}} />
        </View> */}
      </View>

      {/* absolute */}
      <View style={styles.topRowButtons}>
        {isMyProfile ? (
          <SmallGrayButton onPress={() => navigation.navigate('EditProfileModal', { user })}>Edit Profile</SmallGrayButton>
        ) : (
          <>
            <SmallGrayButton onPress={() => null} buttonStyle={{ marginRight: 10 }}>
              Meet
            </SmallGrayButton>
            <MessageButton onPress={() => navigation.navigate('Chat', { otherUserPassedIn: user })} />
          </>
        )}
      </View>
      <View style={styles.profilePicView}>
        <ProfilePic user={user} intro={user.intro} navigation={navigation} size="large" border borderWidth={2.4} />
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
