import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';

const SuggestedConnection = ({ navigation, item }) => {
  const { user, reason } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate('Profile', { profileId: user.id })}
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
          {reason.text && (
            <View style={styles.reasonRow}>
              <Icon
                name={reason.icon}
                solid
                size={12}
                color={colors.blueGray}
                style={{ alignSelf: 'flex-start', paddingRight: 8, paddingTop: 2 }}
              />
              <Text style={{ ...defaultStyles.defaultMuteItalic }}>{reason.text}</Text>
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
  },
  reasonRow: {
    flexDirection: 'row',
    marginTop: 10,
    // left: -18,
  },
});

export default SuggestedConnection;
