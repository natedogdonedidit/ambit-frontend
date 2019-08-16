import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { UserContext } from 'library/utils/UserContext';
import WhiteButton from 'library/components/UI/WhiteButton';
import ProfileTabs from 'library/components/ProfileTabs';
import EditProfileModal from 'library/components/EditProfileModal';

const ProfileScreen = ({ navigation }) => {
  const [tabState, setTabState] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { currentUser } = useContext(UserContext);
  const profileId = navigation.getParam('profileId', 'NO-ID');

  return (
    <View style={styles.container}>
      <EditProfileModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={styles.profileBox}>
        <View style={styles.profilePicView}>
          <Image
            style={styles.profilePic}
            resizeMode="cover"
            source={{
              uri:
                'https://res.cloudinary.com/cwhit/image/upload/v1554496137/sickfits/bnv8g9tra0urzouy2dmn.jpg',
            }}
          />
        </View>
        <Text style={{ ...defaultStyles.h2, ...styles.name }}>Chad Whittaker</Text>
        <Text style={{ ...defaultStyles.h3, ...styles.job }}>
          Electrical Engineer | Cleveland, OH
        </Text>
        <View style={styles.twoButtons}>
          {profileId === currentUser.id ? (
            <WhiteButton onPress={() => setModalVisible(true)}>Edit Profile</WhiteButton>
          ) : (
            <>
              <WhiteButton onPress={() => null}>Follow</WhiteButton>
              <WhiteButton onPress={() => null}>Connect</WhiteButton>
            </>
          )}
        </View>
        <Text style={{ ...defaultStyles.smallBold, ...styles.websiteFont }}>
          wwww.mywebsite.com
        </Text>
      </View>
      <ProfileTabs tabState={tabState} setTabState={setTabState} />
      <View style={styles.content}>
        <Text>Content goes here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  profileBox: {
    backgroundColor: colors.purp,
    paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profilePicView: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
    marginBottom: 10,
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: 'white',
    marginBottom: 5,
  },
  job: {
    color: 'white',
    fontWeight: '100',
    marginBottom: 15,
  },
  twoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  websiteFont: {
    color: 'white',
    marginBottom: 15,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: 36,
  },
  content: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
});

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

export default ProfileScreen;
