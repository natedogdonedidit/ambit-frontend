import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, TouchableOpacity } from 'react-native';
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
      <View style={styles.profilePicView}>
        <ProfilePic navigation={navigation} user={user} size={54} />
      </View>
      <View style={styles.rightSide}>
        <Text style={defaultStyles.largeSemibold}>{user.name}</Text>
        <Text style={defaultStyles.defaultText}>{user.headline}</Text>
        <Text style={defaultStyles.defaultText}>{user.location}</Text>

        {reason.text && (
          <View style={styles.reasonRow}>
            <Icon name={reason.icon} solid size={12} color={colors.blueGray} style={{ alignSelf: 'center', paddingRight: 5 }} />
            <Text style={{ ...defaultStyles.defaultMuteItalic }}>{reason.text}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginTop: 8,
  },
  profilePicView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    alignSelf: 'flex-start',
  },
  reasonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default SuggestedConnection;
