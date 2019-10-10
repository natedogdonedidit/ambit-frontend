import React, { useState } from 'react';
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';
import LinearGradient from 'react-native-linear-gradient';

import EDIT_BIO_MUTATION from 'library/mutations/EDIT_BIO_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import { imageUpload } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import WhiteButton from 'library/components/UI/WhiteButton';
import TextButton from 'library/components/UI/TextButton';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import ProfilePicBasic from 'library/components/UI/ProfilePicBasic';

const bannerExample = 'http://backgrounddownload.com/wp-content/uploads/2018/09/background-polygons-6.jpg';

const EditNameModal = ({ navigation }) => {
  const user = navigation.getParam('user');

  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [bannerPic, setBannerPic] = useState(user.bannerPic);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [jobTitle, setJobTitle] = useState(user.jobTitle);
  const [profession, setProfession] = useState(user.profession);
  const [industry, setIndustry] = useState(user.industry);
  const [location, setLocation] = useState(user.location);
  const [locationLat, setLocationLat] = useState(user.locationLat);
  const [locationLon, setLocationLon] = useState(user.locationLon);
  const [uploading, setUploading] = useState(false);

  const [editBio, { loading: loadingEdit, error, data }] = useMutation(EDIT_BIO_MUTATION, {
    variables: {
      id: user.id,
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        jobTitle,
        profession,
        industry,
        location,
        locationLat,
        locationLon,
        profilePic,
        bannerPic,
      },
    },
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }],
    update: (proxy, { data: dataReturned }) => {
      proxy.writeQuery({
        query: SINGLE_USER_BIO,
        data: {
          user: dataReturned.editBio,
        },
      });
    },
    onCompleted: () => {
      navigation.goBack();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your profile. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const handleSave = async () => {
    // if profile picture is different ... try uploading the image to cloudinary
    if (user.profilePic !== profilePic) {
      await uploadImage();
    }

    editBio();
  };

  // must pass this to camera roll modal
  const handleProfilePicSelect = (uri, type) => {
    if (type === 'image') {
      setProfilePic(uri);
    }
  };

  // must pass this to camera roll modal
  const handleBannerSelect = (uri, type) => {
    if (type === 'image') {
      setBannerPic(uri);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    try {
      const urls = await imageUpload(user.id, [profilePic]);
      setUploading(false);
      console.log(urls);
      setProfilePic(urls[0]);
    } catch (e) {
      setUploading(false);
      Alert.alert('Oh no!', 'We could not upload your new profile picture at this time. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  // must pass this to location modal
  const handleLocationSelect = locObject => {
    if (locObject) {
      setLocation(locObject.location);
      setLocationLat(locObject.locationLat);
      setLocationLon(locObject.locationLon);
    }
  };

  const loading = loadingEdit || uploading;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderWhite
        handleLeft={navigation.goBack}
        handleRight={handleSave}
        textLeft="Cancel"
        textRight="Save"
        title="Edit Profile"
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <View style={{ width: '100%' }}>
            <Image
              style={{
                height: 140,
                width: '100%',
              }}
              resizeMode="cover"
              source={{
                uri: bannerPic || bannerExample,
              }}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('RollModal', { handleMediaSelect: handleProfilePicSelect, assetType: 'Photos' })}
            >
              <View style={styles.profilePicView}>
                <ProfilePicBasic pic={profilePic} size={70} border />
                <TextButton
                  textStyle={styles.editButton}
                  onPress={() =>
                    navigation.navigate('RollModal', { handleMediaSelect: handleProfilePicSelect, assetType: 'Photos' })
                  }
                >
                  Edit Image
                </TextButton>
              </View>
            </TouchableOpacity>
            <View style={styles.editBannerButton}>
              <TextButton
                textStyle={styles.editButton}
                onPress={() => navigation.navigate('RollModal', { handleMediaSelect: handleBannerSelect, assetType: 'Photos' })}
              >
                Edit Banner
              </TextButton>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>First Name</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={val => setFirstName(val)}
                value={firstName}
                placeholder="John"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Last Name</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={val => setLastName(val)}
                value={lastName}
                placeholder="Doe"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Profession</Text>
              </View>
              <View style={styles.rowInput}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditProfessionModal', {
                      user,
                      profession,
                      industry,
                      jobTitle,
                      setProfession,
                      setIndustry,
                      setJobTitle,
                    })
                  }
                  style={styles.touchableRow}
                  hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                >
                  {jobTitle ? (
                    <Text style={{ ...defaultStyles.defaultText }}>{jobTitle}</Text>
                  ) : (
                    <Text style={{ ...defaultStyles.defaultMute }}>Select your profession</Text>
                  )}
                  <Icon name="angle-down" size={15} color={colors.darkGray} style={{}} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Location</Text>
              </View>
              <View style={styles.rowInput}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditLocationModal', { initialLocation: location, handleLocationSelect })}
                  style={styles.touchableRow}
                  hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                >
                  {location ? (
                    <Text style={{ ...defaultStyles.defaultText }}>{location}</Text>
                  ) : (
                    <Text style={{ ...defaultStyles.defaultMute }}>Select your location</Text>
                  )}
                  <Icon name="angle-down" size={15} color={colors.darkGray} style={{}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <Loader active={loading} />}
    </SafeAreaView>
  );
};

export default EditNameModal;

const styles = StyleSheet.create({
  profilePicView: {
    top: -20,
    left: 20,
    width: 80,
    alignItems: 'center',
  },
  editButton: {
    ...defaultStyles.defaultText,
    color: colors.iosBlue,
    textAlign: 'center',
  },
  editBannerButton: {
    position: 'absolute',
    justifyContent: 'center',
    top: 100,
    right: 12,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: -5,
  },
  sectionTitle: {
    width: '100%',
    paddingBottom: 15,
    color: colors.darkGray,
  },
  row: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  touchableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTitle: {
    width: 100,
  },
  rowInput: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.darkGray,
  },
  // rowInputNoBorder: {
  //   flexGrow: 1,
  //   justifyContent: 'center',
  //   height: '100%',
  // },
});
