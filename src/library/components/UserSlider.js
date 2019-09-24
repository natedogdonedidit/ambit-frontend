import React, { useState, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, TouchableOpacity } from 'react-native';

import { UserContext } from 'library/utils/UserContext';
// import ScrollProfilePic from 'library/components/UI/ScrollProfilePic';
import ProfilePic from 'library/components/UI/ProfilePic';
import Loader from 'library/components/UI/Loader';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const UserSlider = ({ users, navigation, handleUserChange, profileId }) => {
  // const { currentUserId } = useContext(UserContext);
  // const profileId = 'ck0tsen1lpd600b09xfi09b14';

  // if (loading) {
  //   return <Loader loading={loading} />;
  // }

  const renderUsers = () => {
    return users.map((user, i) => {
      return (
        <TouchableOpacity key={i} style={{ paddingRight: 15 }} onPress={() => handleUserChange(user.id)}>
          <View style={profileId === user.id && defaultStyles.shadowSlider}>
            <ProfilePic user={user} border disableVideo disableClick size={50} />
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{ ...styles.container }}>
      <View style={styles.note}>
        <Text style={defaultStyles.smallThinMute}>Your suggested connections</Text>
      </View>
      <ScrollView contentContainerStyle={styles.users} horizontal showsHorizontalScrollIndicator={false}>
        {renderUsers()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  note: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 24,
    // paddingBottom: 5,
  },
  users: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 12,
    height: 70,
  },
});

export default UserSlider;
