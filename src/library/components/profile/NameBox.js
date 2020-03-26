import React from 'react';
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
import EDIT_FOLLOWING_MUTATION from 'library/mutations/EDIT_FOLLOWING_MUTATION';

const NameBox = ({ user, navigation, isMyProfile }) => {
  const isFreelancer = user.topicsFreelance.length > 0;
  const isMentor = user.topicsMentor.length > 0;
  const isInvestor = user.topicsInvest.length > 0;
  const useOpenToBox = isFreelancer || isMentor || isInvestor;

  const { loading: loadingUser, error, data } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = data;
  const following = userLoggedIn ? userLoggedIn.following : [];
  // check if i'm following this user
  const isFollowingInd = following.findIndex(u => u.id === user.id);
  const isFollowing = isFollowingInd >= 0;

  // MUTATIONS - follow, connect
  const [editFollowing] = useMutation(EDIT_FOLLOWING_MUTATION, {
    variables: {
      userID: user.id,
      newFollow: !isFollowing,
    },
    onError: e => {
      console.log(e);
      Alert.alert('Oh no!', 'An error occured when trying to follow this user. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // custom functions

  const handleFollowClick = () => {
    editFollowing();
  };

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
        <Text style={{ ...defaultStyles.defaultSemibold, marginRight: 5, marginLeft: 0, color: colors.iosBlue }}>372</Text>
        <Text style={{ ...defaultStyles.defaultMute, marginRight: 10 }}>Followers</Text>

        <Text style={{ ...defaultStyles.defaultSemibold, marginRight: 5, color: colors.iosBlue }}>32</Text>
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
        <View style={{ flex: 1 }}>
          <FollowButton onPress={handleFollowClick} active={isFollowing} buttonStyle={{ width: '100%' }} />
        </View>

        <View style={{ flex: 1, marginLeft: 15 }}>
          <ConnectButton buttonStyle={{ width: '100%' }} />
        </View>
        <View style={{ marginLeft: 15 }}>
          <ThreeDotsButton buttonStyle={{}} />
        </View>
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
    marginBottom: 15,
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
