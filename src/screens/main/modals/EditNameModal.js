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
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';
import LinearGradient from 'react-native-linear-gradient';

import EDIT_BIO_MUTATION from 'library/mutations/EDIT_BIO_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import { imageUpload, sortExperiences } from 'library/utils';

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
  console.log;

  // headline
  const experienceSorted = user.experience.sort(sortExperiences);
  const headlineDefault = `${experienceSorted[0].subText} at ${experienceSorted[0].name}`;

  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [bannerPic, setBannerPic] = useState(user.bannerPic);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  // const [jobTitle, setJobTitle] = useState(user.jobTitle);
  // const [profession, setProfession] = useState(user.profession || headlineDefault);
  const [headline, setHeadline] = useState(user.headline || headlineDefault);
  const [industry, setIndustryFields] = useState(user.industry);
  const [location, setLocation] = useState(user.location);
  const [locationLat, setLocationLat] = useState(user.locationLat);
  const [locationLon, setLocationLon] = useState(user.locationLon);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website);
  const [isFreelancer, setIsFreelancer] = useState(user.isFreelancer);
  const [freelanceFields, setFreelanceFields] = useState(user.freelanceFields);
  const [isInvestor, setIsInvestor] = useState(user.isInvestor);
  const [investorFields, setInvestorFields] = useState(user.investorFields);
  const [isMentor, setIsMentor] = useState(user.isMentor);
  const [mentorFields, setMentorFields] = useState(user.mentorFields);
  const [uploading, setUploading] = useState(false);

  const [editBio, { loading: loadingEdit, error, data }] = useMutation(EDIT_BIO_MUTATION, {
    variables: {
      id: user.id,
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        // jobTitle,
        bio,
        website,
        // profession,
        headline,
        industry: {
          set: industry,
        },
        location,
        locationLat,
        locationLon,
        profilePic,
        bannerPic,
        isFreelancer,
        freelanceFields: {
          set: freelanceFields,
        },
        isInvestor,
        investorFields: {
          set: investorFields,
        },
        isMentor,
        mentorFields: {
          set: mentorFields,
        },
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

  // industry stuff
  const handleIndustryClick = () => {
    navigation.navigate('SelectIndustryModal', {
      industry,
      saveIndustryFields,
    });
  };

  const saveIndustryFields = fields => {
    if (fields.length > 0) {
      setIndustryFields(fields);
    } else {
      setIndustryFields([]);
    }
  };

  const renderIndustries = () => {
    if (industry.length < 1) return <Text style={{ ...defaultStyles.defaultMute }}>Select your industry</Text>;

    return industry.map((ind, i) => (
      <Text key={ind} style={{ ...defaultStyles.defaultText }}>
        {i === 0 ? ind : `, ${ind}`}
      </Text>
    ));
  };

  // freelance stuff
  const handleFreelanceClick = () => {
    navigation.navigate('SelectFreelanceModal', {
      freelanceFields,
      saveFreelanceFields,
    });
  };

  const saveFreelanceFields = fields => {
    if (fields.length > 0) {
      setIsFreelancer(true);
      setFreelanceFields(fields);
    } else {
      setIsFreelancer(false);
      setFreelanceFields([]);
    }
  };

  // investor stuff
  const handleInvestorClick = () => {
    navigation.navigate('SelectInvestorModal', {
      investorFields,
      saveInvestorFields,
    });
  };

  const saveInvestorFields = fields => {
    if (fields.length > 0) {
      setIsInvestor(true);
      setInvestorFields(fields);
    } else {
      setIsInvestor(false);
      setInvestorFields([]);
    }
  };

  // mentor stuff
  const handleMentorClick = () => {
    navigation.navigate('SelectMentorModal', {
      mentorFields,
      saveMentorFields,
    });
  };

  const saveMentorFields = fields => {
    if (fields.length > 0) {
      setIsMentor(true);
      setMentorFields(fields);
    } else {
      setIsMentor(false);
      setMentorFields([]);
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

            <View style={styles.profilePicView}>
              <ProfilePicBasic pic={profilePic} size={70} border borderWidth={3} />
              <TextButton
                textStyle={styles.editButton}
                onPress={() =>
                  navigation.navigate('RollModal', { handleMediaSelect: handleProfilePicSelect, assetType: 'Photos' })
                }
              >
                Edit Image
              </TextButton>
            </View>

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
                autoCorrect={false}
                autoCompleteType="off"
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
                autoCorrect={false}
                autoCompleteType="off"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Headline</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={val => setHeadline(val)}
                value={headline}
                placeholder={`${headlineDefault}`}
                autoCorrect={false}
                autoCompleteType="off"
                required
              />
            </View>
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
                    <Text style={{ ...defaultStyles.defaultMute }}>Select your location</Text>
                  )}
                  {/* <Icon name="angle-right" size={15} color={colors.iconGray} style={{}} /> */}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Industry</Text>
              </View>
              <View style={styles.rowInput}>
                <TouchableOpacity
                  onPress={() => handleIndustryClick()}
                  style={styles.touchableRow}
                  hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                >
                  <Text numberOfLines={1}>{renderIndustries()}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ ...styles.row }}>
              <View style={styles.rowTitle}>
                <Text style={{ ...defaultStyles.defaultBold }}>Website</Text>
              </View>
              <TextInput
                style={{ ...styles.rowInput, ...defaultStyles.defaultText }}
                onChangeText={val => setWebsite(val)}
                value={website}
                placeholder="Your website URL"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
              />
              <View style={{ height: '100%', justifyContent: 'center' }}>
                <Icon name="plus" size={15} color={colors.iconGray} style={{ paddingRight: 5 }} />
              </View>
            </View>
            <View style={{ ...styles.rowMultiline, borderBottomWidth: 0.2, borderBottomColor: colors.borderBlack }}>
              <View style={{ ...styles.rowTitle, marginTop: 4 }}>
                <Text style={{ ...defaultStyles.defaultBold }}>Bio</Text>
              </View>
              <TextInput
                style={{ ...styles.multilineInput, ...defaultStyles.defaultText, width: Dimensions.get('window').width - 140 }}
                onChangeText={val => setBio(val)}
                value={bio}
                placeholder="Start your bio..."
                maxLength={160}
                multiline
                textAlignVertical="top"
                scrollEnabled
                autoCorrect={false}
                autoCompleteType="off"
              />
            </View>
            <TouchableOpacity onPress={() => handleInvestorClick()}>
              <View style={{ ...styles.hatRow }}>
                <View style={styles.hatTitle}>
                  <Text style={{ ...defaultStyles.largeRegular, color: colors.iosBlue }}>I'm open to invest</Text>
                </View>

                <View style={styles.hatButton}>
                  <Icon
                    name={isInvestor ? 'check-circle' : 'circle'}
                    size={25}
                    color={isInvestor ? colors.purp : colors.borderBlack}
                    style={{ paddingRight: 0 }}
                    solid={!!isInvestor}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFreelanceClick()}>
              <View style={{ ...styles.hatRow }}>
                <View style={styles.hatTitle}>
                  <Text style={{ ...defaultStyles.largeRegular, color: colors.iosBlue }}>I'm open to freelance</Text>
                </View>

                <View style={styles.hatButton}>
                  <Icon
                    name={isFreelancer ? 'check-circle' : 'circle'}
                    size={25}
                    color={isFreelancer ? colors.purp : colors.borderBlack}
                    style={{ paddingRight: 0 }}
                    solid={!!isFreelancer}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleMentorClick()}>
              <View style={{ ...styles.hatRow }}>
                <View style={styles.hatTitle}>
                  <Text style={{ ...defaultStyles.largeRegular, color: colors.iosBlue }}>I'm open to mentor others</Text>
                </View>

                <View style={styles.hatButton}>
                  <Icon
                    name={isMentor ? 'check-circle' : 'circle'}
                    size={25}
                    color={isMentor ? colors.purp : colors.borderBlack}
                    style={{ paddingRight: 0 }}
                    solid={!!isMentor}
                  />
                </View>
              </View>
            </TouchableOpacity>
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
    width: 100,
  },
  hatRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingTop: 15,
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
