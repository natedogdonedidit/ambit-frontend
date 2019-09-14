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
  PermissionsAndroid,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';
import CameraRoll from '@react-native-community/cameraroll';
import LinearGradient from 'react-native-linear-gradient';

import EDIT_BIO_MUTATION from 'library/mutations/EDIT_BIO_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { cloud_name } from 'library/config';
import { requestCameraRollPermission } from 'library/utils';
import WhiteButton from 'library/components/UI/WhiteButton';
import EditProfessionModal from 'library/components/modals/EditProfessionModal';
import EditLocationModal from 'library/components/modals/EditLocationModal';
import CameraRollModal from 'library/components/modals/CameraRollModal';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';
const bannerExample =
  'https://images.unsplash.com/photo-1460134741496-83752c8919df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

const EditBioModal = ({ modalVisible, setModalVisible, user }) => {
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
  const [website, setWebsite] = useState(user.website);
  const [bio, setBio] = useState(user.bio);

  const [proModalVisible, setProModalVisible] = useState(false);
  const [locModalVisible, setLocModalVisible] = useState(false);
  const [cameraRollModalVisible, setCameraRollModalVisible] = useState(false);

  const [cameraRoll, setCameraRoll] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [editBio, { loading, error, called, data }] = useMutation(EDIT_BIO_MUTATION, {
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
        website,
        bio,
        profilePic,
        bannerPic,
      },
    },
    refetchQueries: () => [{ query: SINGLE_USER_BIO, variables: { id: user.id } }, { query: CURRENT_USER_QUERY }],
    onCompleted: () => {
      // setModalVisible(false);
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your profile. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const resetState = () => {
    setProfilePic(user.profilePic);
    setBannerPic(user.bannerPic);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setJobTitle(user.jobTitle);
    setProfession(user.profession);
    setIndustry(user.industry);
    setLocation(user.location);
    setLocationLat(user.locationLat);
    setLocationLon(user.locationLon);
    setWebsite(user.website);
    setBio(user.bio);
    setProfilePic(user.profilePic);
    setBannerPic(user.bannerPic);
  };

  const handleCancel = () => {
    resetState();
    setModalVisible(false);
  };

  const handleSave = async () => {
    // if profile picture is different ... try uploading the image to cloudinary
    if (user.profilePic !== profilePic) {
      await imageUpload();
    }

    // run mutation
    editBio();
    // resetState();
    setModalVisible(false);
  };

  const handleEditPicButton = async () => {
    // 1. request camera roll permission if android
    if (Platform.OS === 'android') {
      const isTrue = await PermissionsAndroid.check('READ_EXTERNAL_STORAGE');
      if (!isTrue) await requestCameraRollPermission();
    }

    // 2. get images from camera roll
    try {
      const res = await CameraRoll.getPhotos({
        first: 10,
        assetType: 'Photos',
      });

      const cameraRollImages = res.edges.map(image => image.node.image.uri);

      // 3. put images into state and open modal to dispaly images
      setCameraRoll(cameraRollImages);
      setCameraRollModalVisible(true);
    } catch (e) {
      console.error(e);
      // alert could not get images from camera roll
      Alert.alert('Oh no!', 'We could not access your camera roll. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const handleImageSelect = image => {
    // put image into state
    setProfilePic(image);
  };

  const imageUpload = async () => {
    setUploading(true);
    // create tags
    const tags = `profilepic,${user.id}`;
    // create context
    const context = `user=${user.id}`;
    // create file object
    const photo = {
      uri: profilePic,
      type: 'image',
      name: `${user.id}-profilepic`,
    };
    // create body
    const uploadData = new FormData();
    uploadData.append('file', photo);
    uploadData.append('upload_preset', 'ambit-profilepic-preset');
    uploadData.append('tags', tags);
    uploadData.append('context', context);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: 'POST',
        body: uploadData,
      });
      const resJson = await res.json();

      // put image into state
      setUploading(false);
      setProfilePic(resJson.url);
    } catch (e) {
      console.log('an error occured trying to upload your photo');
      console.error(e);
      Alert.alert('Oh no!', 'We could not upload your new profile picture at this time. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      setUploading(false);
      setProfilePic(user.profilePic);
    }
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderWhite handleLeft={handleCancel} handleRight={handleSave} textLeft="Cancel" textRight="Save" title="Edit Profile" />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <ScrollView>
            <View style={{ width: '100%' }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[colors.blueGradient, colors.purpGradient]}
                style={styles.linearGradient}
              >
                <ImageBackground
                  resizeMode="cover"
                  style={{ width: '100%' }}
                  imageStyle={{ opacity: 0.1 }}
                  source={{
                    uri: bannerPic || bannerExample,
                  }}
                >
                  <View style={styles.profileBox}>
                    <View style={{ ...styles.profilePicView }}>
                      <Image
                        style={{ ...styles.profilePic }}
                        resizeMode="cover"
                        source={{
                          uri: profilePic || profilePicExample,
                        }}
                      />
                    </View>
                    <WhiteButton buttonStyle={{ marginBottom: 10 }} onPress={() => handleEditPicButton()}>
                      Edit Pic
                    </WhiteButton>
                    <WhiteButton buttonStyle={{ marginBottom: 20 }} onPress={() => null}>
                      Edit Banner
                    </WhiteButton>
                  </View>
                </ImageBackground>
              </LinearGradient>
            </View>
            <View style={styles.section}>
              <Text style={{ ...defaultStyles.largeMedium, ...styles.sectionTitle }}>Personal Info</Text>

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
                    onPress={() => setProModalVisible(true)}
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
                <View style={styles.rowInputNoBorder}>
                  <TouchableOpacity
                    onPress={() => setLocModalVisible(true)}
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
              {/* <View style={styles.row}>
                <View style={styles.rowTitle}>
                  <Text style={{ ...defaultStyles.defaultBold }}>Website</Text>
                </View>
                <TextInput
                  style={{ ...styles.rowInputNoBorder, ...defaultStyles.defaultText }}
                  onChangeText={val => setWebsite(val)}
                  value={website}
                  placeholder="Add your website"
                  autoCapitalize="none"
                />
              </View> */}
            </View>
            <View style={styles.section}>
              <Text style={{ ...defaultStyles.largeMedium, ...styles.sectionTitle }}>Bio</Text>
              <TextInput
                style={{ ...styles.multilineInput, ...defaultStyles.defaultText }}
                onChangeText={val => setBio(val)}
                value={bio}
                placeholder="Start your bio"
                multiline
                scrollEnabled={false}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <EditLocationModal
        locModalVisible={locModalVisible}
        setLocModalVisible={setLocModalVisible}
        location={location}
        setLocation={setLocation}
        locationLat={locationLat}
        setLocationLat={setLocationLat}
        locationLon={locationLon}
        setLocationLon={setLocationLon}
      />
      <EditProfessionModal
        user={user}
        proModalVisible={proModalVisible}
        setProModalVisible={setProModalVisible}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        profession={profession}
        setProfession={setProfession}
        industry={industry}
        setIndustry={setIndustry}
      />
      <CameraRollModal
        cameraRollModalVisible={cameraRollModalVisible}
        setCameraRollModalVisible={setCameraRollModalVisible}
        cameraRoll={cameraRoll}
        setCameraRoll={setCameraRoll}
        handleImageSelect={handleImageSelect}
      />
      {loading || (uploading && <Loader active={loading || uploading} />)}
    </Modal>
  );
};

export default EditBioModal;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
  },
  profileBox: {
    paddingTop: 30,
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
    marginBottom: 15,
    backgroundColor: 'white',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderTopWidth: 0.2,
    borderTopColor: colors.darkGray,
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
  rowInputNoBorder: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
  },
  largeInput: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.darkGray,
  },
  multilineInput: {
    width: '100%',
  },
});
