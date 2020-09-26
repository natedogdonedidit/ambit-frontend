import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import { useMutation } from '@apollo/client';
import ImagePicker from 'react-native-image-crop-picker';
import { profilePicUpload } from 'library/utils';
import Feather from 'react-native-vector-icons/Feather';

import UPDATE_USER_MUTATION from 'library/mutations/UPDATE_USER_MUTATION';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/buttons/TextButton';

const profilePicExample = 'http://res.cloudinary.com/ambitapp/image/upload/v1601044540/ProfilePics/tjp6bg4tqx3qtxuijnhc.jpg';

const OnboardingProfile = ({ navigation, route }) => {
  const { username } = route.params;

  const [profilePic, setProfilePic] = useState('');
  const [location, setLocation] = useState('');
  const [locationID, setLocationID] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLon, setLocationLon] = useState('');

  // MUTATION
  const [updateOneUser, { loading: loadingEdit, error, data }] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      where: { username },
      data: {
        profilePic,
        location,
        locationID,
        locationLat,
        locationLon,
      },
    },
  });

  const handleEditPicButton = () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      cropping: true,
      // cropperCircleOverlay: true,
    })
      .then((img) => setProfilePic(img.path))
      .catch((e) => console.log(e));
  };

  const handleNext = async () => {
    navigation.navigate('OnboardingTopics', { username });

    try {
      let url = '';

      if (profilePic) {
        url = await profilePicUpload(username, profilePic);
      }

      // setProfilePic(url || profilePicExample);
      updateOneUser({
        variables: {
          where: { username },
          data: {
            profilePic: url,
            location,
            locationID,
            locationLat,
            locationLon,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  // must pass this to location modal
  const handleLocationSelect = (locObject) => {
    if (locObject) {
      setLocation(locObject.location);
      setLocationID(locObject.locationID);
      setLocationLat(locObject.locationLat);
      setLocationLon(locObject.locationLon);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={{ ...defaultStyles.ambitLogoSmall }}>ambit</Text>
        </View>
        <View style={styles.picSection}>
          {username && <Text style={{ ...defaultStyles.hugeSemibold, paddingTop: 20, fontSize: 22 }}>Hi, {username}!</Text>}
          <View style={styles.profilePic}>
            <Image
              source={{ uri: profilePic || profilePicExample }}
              style={{ width: `100%`, height: '100%' }}
              // resizeMode="contain"
              resizeMode="cover"
              // overflow="hidden"
            />
          </View>
          <TextButton textStyle={styles.editButton} onPress={handleEditPicButton}>
            Edit Profile Pic
          </TextButton>
        </View>
        <View style={styles.formSection}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditLocationModalRight', { initialLocation: location, handleLocationSelect })}
            style={{ flexDirection: 'row', alignItems: 'center', height: 40, position: 'relative' }}
          >
            <View style={{ position: 'absolute', left: 0 }}>
              <Feather
                name="map-pin"
                size={20}
                color={colors.blueGray}
                style={{ textAlign: 'center', paddingTop: 0, paddingRight: 10 }}
              />
            </View>

            <View
              style={{
                flex: 1,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.borderBlack,
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20,
              }}
            >
              {location ? (
                <Text style={{ ...defaultStyles.hugeRegular, color: colors.blueGray }}>{location}</Text>
              ) : (
                <Text style={{ ...defaultStyles.defaultPlaceholder, fontSize: 18 }}>Select your city</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottom}>
          <TextButton onPress={() => navigation.navigate('MainStack')}>Skip</TextButton>
          <ButtonDefault buttonStyle={styles.buttonStyle} onPress={handleNext}>
            Next
          </ButtonDefault>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  picSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  formSection: {
    flex: 1,
    // backgroundColor: 'blue',
    paddingTop: 70,
    paddingHorizontal: 40,
  },
  bottom: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingRight: 8,
    paddingLeft: 14,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.lightLightGray,
    marginTop: 15,
    marginBottom: 6,
    // borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.7)',
    // opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 35,
    overflow: 'hidden',
  },
  buttonStyle: {
    paddingHorizontal: 14,
  },
  input: {
    // width: '100%',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBlack,
    marginVertical: 13,
    paddingBottom: 4,
    ...defaultStyles.hugeRegular,
    fontSize: 18,
    paddingLeft: 5,
  },
});

export default OnboardingProfile;
