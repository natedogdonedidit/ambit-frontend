import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import WhiteButton from 'library/components/UI/WhiteButton';
import TextButton from 'library/components/UI/TextButton';

const NameBox = ({ user, navigation, isMyProfile }) => {
  return (
    <View style={{ ...styles.profileBox }}>
      <Text style={{ ...defaultStyles.hugeMedium, ...styles.name }}>{user.name}</Text>
      <Text style={{ ...defaultStyles.defaultText, ...styles.job }}>
        {user.jobTitle || 'Job title'} | {user.location || 'Location'}
      </Text>
      <View style={styles.stats}>
        <Text style={{ ...defaultStyles.smallMedium, marginRight: 5 }}>372</Text>
        <Text style={{ ...defaultStyles.smallThin, marginRight: 20 }}>Followers</Text>
        <Text style={{ ...defaultStyles.smallMedium, marginRight: 5 }}>32</Text>
        <Text style={{ ...defaultStyles.smallThin, marginRight: 20 }}>Connections</Text>
        <Text style={{ ...defaultStyles.smallMedium, marginRight: 5 }}>402</Text>
        <Text style={{ ...defaultStyles.smallThin, marginRight: 20 }}>Posts</Text>
      </View>
      <View style={styles.whiteButtons}>
        <WhiteButton active onPress={() => null}>
          Follow
        </WhiteButton>
        <WhiteButton buttonStyle={{ marginLeft: 10 }} onPress={() => null}>
          Connect
        </WhiteButton>
        <WhiteButton buttonStyle={{ marginLeft: 10 }} onPress={() => null}>
          Meet
        </WhiteButton>
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
    marginBottom: 3,
  },
  job: {
    marginBottom: 15,
  },
  whiteButtons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  stats: {
    flexDirection: 'row',
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
