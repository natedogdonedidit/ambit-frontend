import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import WhiteButton from 'library/components/UI/WhiteButton';
import FollowButton from 'library/components/UI/FollowButton';
import ConnectButton from 'library/components/UI/ConnectButton';
import TextButton from 'library/components/UI/TextButton';
import ThreeDotsButton from 'library/components/UI/ThreeDotsButton';

const NameBox = ({ user, navigation, isMyProfile }) => {
  // custom functions
  const useOpenToBox = user.isFreelancer || user.isMentor || user.isInvestor;
  const renderOpenTo = () => {
    if (!useOpenToBox) return null;

    return (
      <Text>
        <Text style={defaultStyles.defaultMute}>💼{`  `}Open to</Text>
        {user.isFreelancer && <Text style={{ ...defaultStyles.defaultSemibold, color: colors.purple }}> freelance</Text>}
        {user.isFreelancer && user.isInvestor && <Text style={{ ...defaultStyles.defaultText }}>,</Text>}
        {user.isInvestor && <Text style={{ ...defaultStyles.defaultSemibold, color: colors.green }}> invest</Text>}
        {(user.isFreelancer || user.isInvestor) && user.isMentor && <Text style={{ ...defaultStyles.defaultText }}>,</Text>}
        {user.isMentor && <Text style={{ ...defaultStyles.defaultSemibold, color: colors.salmon }}> mentor</Text>}
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
        <Text style={{ ...defaultStyles.defaultRegular, marginRight: 5, marginLeft: 0, color: colors.iosBlue }}>372</Text>
        <Text style={{ ...defaultStyles.defaultMute, marginRight: 10 }}>Followers</Text>

        <Text style={{ ...defaultStyles.defaultRegular, marginRight: 5, color: colors.iosBlue }}>32</Text>
        <Text style={{ ...defaultStyles.defaultMute, marginRight: 20 }}>Connections</Text>
      </View>
    );
  };

  return (
    <View style={{ ...styles.profileBox }}>
      <Text style={{ ...defaultStyles.hugeMedium, ...styles.name }}>{user.name}</Text>
      {user.headline && <Text style={{ ...defaultStyles.defaultText, ...styles.headline }}>{user.headline}</Text>}
      {renderStats()}
      <Text style={{ ...defaultStyles.defaultText, ...styles.bio }}>{user.bio}</Text>
      {(useOpenToBox || !!user.website) && (
        <View style={styles.detailsBox}>
          {renderLocation()}
          {renderWebsite()}
          {renderOpenTo()}
        </View>
      )}

      <View style={styles.whiteButtons}>
        <FollowButton />
        <ConnectButton buttonStyle={{ marginLeft: 15 }} />
        <ThreeDotsButton buttonStyle={{ marginLeft: 15 }} />
      </View>
      {isMyProfile && (
        <View style={styles.editProfileButton}>
          <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('EditNameModal', { user })}>
            Edit
          </TextButton>
        </View>
      )}
    </View>
  );
};

export default NameBox;

const styles = StyleSheet.create({
  profileBox: {
    width: '100%',
    paddingTop: 70,
    paddingHorizontal: 20,
    backgroundColor: 'white',
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
