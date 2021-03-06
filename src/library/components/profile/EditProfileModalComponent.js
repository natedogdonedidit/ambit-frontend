import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/client';
import ImagePicker from 'react-native-image-crop-picker';

import UPDATE_USER_MUTATION from 'library/mutations/UPDATE_USER_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import { profilePicUpload, bannerPicUpload } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import TextButton from 'library/components/UI/buttons/TextButton';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import ProfilePicBasic from 'library/components/UI/ProfilePicBasic';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const bannerExample =
  'https://images.unsplash.com/photo-1592320937521-84c88747a68a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80';

const EditProfileModalComponent = ({ navigation, user }) => {
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [bannerPic, setBannerPic] = useState(user.bannerPic);
  const [name, setName] = useState(user.name);
  // const [lastName, setLastName] = useState(user.lastName);
  // const [headline, setHeadline] = useState(user.headline || headlineDefault);
  const [location, setLocation] = useState(user.location);
  const [locationID, setLocationID] = useState(user.locationID);
  const [locationLat, setLocationLat] = useState(user.locationLat);
  const [locationLon, setLocationLon] = useState(user.locationLon);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website);
  const [uploading, setUploading] = useState(false);

  // for setting banner width and height
  const { width } = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  const [top] = useState(insets.top || 20);

  const [updateOneUser, { loading: loadingEdit, error, data }] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      where: { username: user.username },
      data: {
        name,
        bio,
        website,
        // headline,
        location,
        locationID,
        locationLat,
        locationLon,
        profilePic,
        bannerPic,
      },
    },
    refetchQueries: () => [
      { query: SINGLE_USER_BIO, variables: { where: { username: user.username } } },
      { query: CURRENT_USER_QUERY },
    ],
    // update: (proxy, { data: dataReturned }) => {
    //   proxy.writeQuery({
    //     query: CURRENT_USER_QUERY,
    //     data: {
    //       userLoggedIn: dataReturned.updateOneUser,
    //     },
    //   });
    // },
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
      await uploadProfilePic();
    }

    if (user.bannerPic !== bannerPic) {
      await uploadBannerPic();
    }

    updateOneUser();
  };

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

  const handleEditBannerButton = () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      cropping: true,
      width,
      height: 100 + top,
    })
      .then((img) => setBannerPic(img.path))
      .catch((e) => console.log(e));
  };

  const uploadProfilePic = async () => {
    setUploading(true);
    try {
      const url = await profilePicUpload(user, profilePic);
      setUploading(false);
      setProfilePic(url);
    } catch (e) {
      setUploading(false);
      Alert.alert('Oh no!', 'We could not upload your new profile picture at this time. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const uploadBannerPic = async () => {
    setUploading(true);
    try {
      const url = await bannerPicUpload(user, bannerPic);
      console.log(url);
      setUploading(false);
      setBannerPic(url);
    } catch (e) {
      setUploading(false);
      Alert.alert('Oh no!', 'We could not upload your new banner picture at this time. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
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

  const loading = loadingEdit || uploading;

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
                height: 100 + top,
                width: '100%',
              }}
              resizeMode="cover"
              source={{
                uri: bannerPic || bannerExample,
              }}
            />

            <View style={styles.profilePicView}>
              <ProfilePicBasic pic={profilePic} size={70} border borderWidth={3} />
              <TextButton textStyle={styles.editButton} onPress={() => handleEditPicButton()}>
                Edit Image
              </TextButton>
            </View>

            <View style={styles.editBannerButton}>
              <TextButton textStyle={styles.editButton} onPress={() => handleEditBannerButton()}>
                Edit Banner
              </TextButton>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Name</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={(val) => setName(val)}
                value={name}
                placeholder="John"
                autoCorrect={false}
                autoCompleteType="off"
              />
            </View>
            {/* <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Last Name</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={(val) => setLastName(val)}
                value={lastName}
                placeholder="Doe"
                autoCorrect={false}
                autoCompleteType="off"
              />
            </View> */}
            {/* <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Headline</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={(val) => setHeadline(val)}
                value={headline}
                placeholder="Software Engineer at Facebook"
                autoCorrect={false}
                autoCompleteType="off"
                required
              />
            </View> */}
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Location</Text>
              </View>
              <View style={styles.rowInput}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('EditLocationModalRight', { initialLocation: location, handleLocationSelect })
                  }
                  style={styles.touchableRow}
                  hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                >
                  {location ? (
                    <Text style={{ ...defaultStyles.defaultText }}>{location}</Text>
                  ) : (
                    <Text style={{ ...defaultStyles.defaultPlaceholder }}>Select your location</Text>
                  )}
                  {/* <Icon name="angle-right" size={15} color={colors.iconGray} style={{}} /> */}
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ ...styles.row }}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Website</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={(val) => setWebsite(val)}
                value={website}
                placeholder="Your website URL"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
              />
              {/* <View style={{ height: '100%', justifyContent: 'center' }}>
                <Icon name="plus" size={15} color={colors.iconGray} style={{ paddingRight: 5 }} />
              </View> */}
            </View>
            <View style={{ ...styles.rowMultiline, borderBottomWidth: 0.2, borderBottomColor: colors.borderBlack }}>
              <View style={{ ...styles.rowTitle, marginTop: 4 }}>
                <Text style={{ ...defaultStyles.defaultBold }}>Bio</Text>
              </View>
              <TextInput
                style={{ ...styles.multilineInput, ...defaultStyles.defaultText, width: Dimensions.get('window').width - 140 }}
                onChangeText={(val) => setBio(val)}
                value={bio}
                placeholder="Start your bio..."
                maxLength={160}
                multiline
                textAlignVertical="top"
                scrollEnabled
                autoCompleteType="off"
              />
            </View>
            {/* <TouchableOpacity onPress={() => navigation.navigate('MyTopics', { userLoggedIn: user })}>
              <View style={{ ...styles.hatRowTop }}>
                <View style={styles.hatTitle}>
                  <Text style={{ ...defaultStyles.largeRegular, color: colors.iosBlue }}>Select my topics</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('MyHats', { userLoggedIn: user })}>
              <View style={{ ...styles.hatRow }}>
                <View style={styles.hatTitle}>
                  <Text style={{ ...defaultStyles.largeRegular, color: colors.iosBlue }}>Select my hats</Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading && <Loader active={loading} />}
    </View>
  );
};

export default EditProfileModalComponent;

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
    bottom: 100,
    right: 12,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: -5,
    paddingBottom: 30,
  },
  sectionTitle: {
    width: '100%',
    paddingBottom: 15,
    color: 'black',
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
    width: 85,
  },
  hatRowTop: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  hatRow: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  hatTitle: {
    flex: 1,
  },
  hatButton: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  rowInput: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  rowMultiline: {
    flexDirection: 'row',
    // height: 200,
    marginTop: 4,
    // alignItems: 'center',
  },
  multilineInput: {
    // height: 40,
    maxHeight: 90,
    maxWidth: 300,
    paddingBottom: 10,
  },
  rowInputNoBorder: {
    flexGrow: 1,
    justifyContent: 'center',
    height: '100%',
  },
});
