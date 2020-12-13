import React, { useState, useContext, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  InputAccessoryView,
  Dimensions,
} from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Image from 'react-native-scalable-image';
import FitImage from 'react-native-fit-image';
import AllIcons from 'react-native-vector-icons/glyphmaps/FontAwesome5Free.json';

import NETWORK_POSTS_QUERY from 'library/queries/NETWORK_POSTS_QUERY';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import CURRENT_USER_FOLLOWING from 'library/queries/CURRENT_USER_FOLLOWING';
import CREATE_POST_MUTATION from 'library/mutations/CREATE_POST_MUTATION';
import MYGOALS_POSTS_QUERY from 'library/queries/MYGOALS_POSTS_QUERY';

import { UserContext } from 'library/utils/UserContext';
import {
  postPicUpload,
  postVideoUpload,
  getTopicID,
  addMainTopics,
  getNetworkIDsUser,
  getTopicFromID,
  isCustomGoalTest,
} from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Loader from 'library/components/UI/Loader';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import ProfilePicBasic from 'library/components/UI/ProfilePicBasic';
import CoolText from 'library/components/UI/CoolText';
import MentionsSelect from 'library/components/MentionsSelect';
import Goal from 'library/components/UI/Goal';
import CustomGoal from 'library/components/UI/CustomGoal';

const NewPostModal = ({ navigation, route }) => {
  // ROUTE PARAMS
  const { topicPassedIn } = route.params;

  const { width } = Dimensions.get('window');

  // STATE
  const [goal, setGoal] = useState('');
  const [subField, setSubField] = useState('');
  const [topic, setTopic] = useState(topicPassedIn);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState('');
  const [location, setLocation] = useState('');
  const [locationID, setLocationID] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLon, setLocationLon] = useState('');
  const [cursorLocation, setCursorLocation] = useState(0);
  const [mentionText, setMentionText] = useState('');

  const [uploading, setUploading] = useState(false);

  // HOOKS
  const { currentUserId } = useContext(UserContext);

  const { loading: loadingUser, error, data } = useQuery(CURRENT_USER_QUERY);

  // only used to refetch NETWORK_POSTS upon creation
  const { data: dataFollowing } = useQuery(CURRENT_USER_FOLLOWING);
  const network = useMemo(() => {
    if (dataFollowing && dataFollowing.iFollow) {
      return [...dataFollowing.iFollow];
    }

    return [];
  }, [dataFollowing]);

  // FOR MENTION SEARCH
  useEffect(() => {
    // see if the string ends in a mention
    const re = /\B@\w+$/g;
    const mentions = content.match(re);

    // if it does, save to state
    if (mentions && mentions.length > 0) {
      const mentionToSearch = mentions[0].substr(1).toLowerCase();
      setMentionText(mentionToSearch);
    } else {
      setMentionText('');
    }
  }, [content]);

  useEffect(() => {
    if (data && data.userLoggedIn) {
      setLocation(data.userLoggedIn.location || null);
      setLocationID(data.userLoggedIn.locationID || null);
      setLocationLat(data.userLoggedIn.locationLat || null);
      setLocationLon(data.userLoggedIn.locationLon || null);
    }
  }, [data]);

  // MUTATIONS
  const [createOnePost, { loading: loadingCreate }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: () => [
      {
        query: NETWORK_POSTS_QUERY,
        variables: {
          orderBy: [
            {
              lastUpdated: 'desc',
            },
          ],
          where: {
            owner: {
              id: { in: [...network, currentUserId] },
            },
          },
        },
      },
    ],
    onError: (e) => {
      console.log('something went wrong either creating post or notifications', e);
      // Alert.alert('Oh no!', 'An error occured when trying to create this post. Try again later!', [
      //   { text: 'OK', onPress: () => console.log('OK Pressed') },
      // ]);
    },
  });

  const loading = loadingCreate || uploading;

  if (loadingUser) {
    return null;
  }

  // CUSTOM FUNCTIONS
  const handleBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    const message = validateInputs();
    // if missing a required field, Alert user
    if (message) {
      Alert.alert('Please fill in required field:', `${message}`, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      return;
    }

    try {
      navigation.goBack();
      const uploadedImages = await uploadImages();
      const uploadedVideo = await uploadVideo();
      console.log('video upload', uploadedVideo);

      if (!loadingCreate) {
        createOnePost({
          variables: {
            data: {
              isGoal: !!goal,
              goal: goal ? goal.name : null,
              goalColor: goal ? goal.secondaryColor : null,
              goalIcon: goal ? goal.goalIcon : null,
              subField,
              goalStatus: goal ? 'Active' : null,
              topic,
              location,
              locationID,
              locationLat,
              locationLon,
              content,
              video: uploadedVideo && uploadedVideo.url ? uploadedVideo.url : '',
              images: { set: uploadedImages },
              lastUpdated: new Date(),
              owner: {
                connect: { id: currentUserId },
              },
            },
          },
        });
      }

      // const topicsArrayForOptResp =
      //   topics.length > 0
      //     ? topics.map(({ topicID }, i) => {
      //         const { name } = getTopicFromID(topicID);

      //         return {
      //           __typename: 'Topic',
      //           id: i,
      //           name,
      //           topicID,
      //           parentTopic: { __typename: 'Topic', id: i, name, topicID },
      //         };
      //       })
      //     : null;

      // const newPostOptimisticObject = {
      //   __typename: 'Post',
      //   id: 'newPost12345',
      //   isGoal: !!goal,
      //   goal: goal ? goal.name : null,
      //   subField: subField ? { __typename: 'Topic', id: subField, name: getTopicFromID(subField).name, topicID: subField } : null,
      //   goalStatus: goal ? 'Active' : null,
      //   topics: topicsArrayForOptResp,
      //   location,
      //   locationID,
      //   locationLat,
      //   locationLon,
      //   content,
      //   video,
      //   images: uploadedImages,
      //   createdAt: new Date(),
      //   lastUpdated: new Date(),
      //   owner: { ...data.userLoggedIn },
      //   likesCount: null,
      //   likedByMe: false,
      //   commentsCount: null,
      //   sharesCount: null,
      //   updates: [],
      //   _deleted: false,
      // };

      // createPost({
      //   variables: {
      //     owner: currentUserId,
      //     post: {
      //       isGoal: !!goal,
      //       goal: goal ? goal.name : null,
      //       subField: subField ? { connect: { topicID: subField } } : null,
      //       goalStatus: goal ? 'Active' : null,
      //       topics: topics.length > 0 ? { connect: topics } : null,
      //       location,
      //       locationID,
      //       locationLat,
      //       locationLon,
      //       content,
      //       video,
      //       images: { set: uploadedImages },
      //       lastUpdated: new Date(),
      //       owner: {
      //         connect: { id: currentUserId },
      //       },
      //     },
      //   },
      //   optimisticResponse: {
      //     __typename: 'Mutation',
      //     createPost: {
      //       ...newPostOptimisticObject,
      //     },
      //   },
      //   update: (proxy, { data: dataReturned }) => {
      //     const networkPostsCache = proxy.readQuery({
      //       query: NETWORK_POSTS_QUERY,
      //     });
      //     // console.log(networkPostsCache);
      //     // console.log(dataReturned);

      //     proxy.writeQuery({
      //       query: NETWORK_POSTS_QUERY,
      //       data: {
      //         postsNetwork: {
      //           __typename: 'PostConnection',
      //           pageInfo: {
      //             ...networkPostsCache.postsNetwork.pageInfo,
      //           },
      //           edges: [
      //             { __typename: 'PostEdge', node: { ...dataReturned.createPost } },
      //             ...networkPostsCache.postsNetwork.edges,
      //           ],
      //         },
      //       },
      //     });
      //   },
      //   refetchQueries: goal && [{ query: MYGOALS_POSTS_QUERY }],
      // });
    } catch (e) {
      setUploading(false);
      console.log(e);
      if (e.message === 'Image upload fail') {
        Alert.alert('Oh no!', 'An error occured when trying to upload your photo. Remove the photo or try again.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      } else {
        Alert.alert('Oh no!', 'An error occured when trying to create this post. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
    }
  };

  const handleMentionSelect = (usernameClicked) => {
    setContent((prevState) => {
      // see if the string ends in a mention
      const re = /\B@\w+$/g;
      const mentions = prevState.match(re);

      // if it does, remove the partial mention, add in the full mention
      if (mentions && mentions.length > 0) {
        const mentionToSearch = mentions[0].substr(1).toLowerCase();
        const startOfString = prevState.substr(0, prevState.length - mentionToSearch.length);

        return `${startOfString}${usernameClicked} `;
      }
      return prevState;
    });
  };

  const handleGoalRowSelect = () => {
    navigation.navigate('SelectGoalModal', { setGoal, setTopic, setSubField });
  };

  const handleTopicRowSelect = () => {
    if (goal) {
      navigation.navigate('SelectPostTopicsModal', { goal, setTopic, setSubField });
    } else {
      navigation.navigate('SelectPostTopicsModal', { setTopic, setSubField });
    }
  };

  const clearGoal = () => {
    setGoal(null);
    setSubField('');
    setTopic(null);
  };

  const clearTopic = () => {
    setTopic(null);
  };

  const attemptUploads = () => {
    const uploadImagesPromises = images.map((image) => {
      const imageObject = postPicUpload(data.userLoggedIn.id, image);
      return imageObject;
    });

    return Promise.all([...uploadImagesPromises]);
  };

  const uploadImages = async () => {
    if (images.length > 0) {
      setUploading(true);
      const uploadedImages = await attemptUploads();
      setUploading(false);
      // console.log('uploaded', uploadedImages);
      return uploadedImages;
    }
    return [];
  };

  const uploadVideo = async () => {
    if (video) {
      setUploading(true);
      const uploadedVideo = await postVideoUpload(data.userLoggedIn.id, video.uri);
      setUploading(false);
      // console.log('uploaded', uploadedImages);
      return uploadedVideo;
    }
    return null;
  };

  const validateInputs = () => {
    if (!content) return 'Post';
    return null;
  };

  // images & video stuff

  const handleCameraIconPress = () => {
    // navigation.navigate('CameraModal', { isIntro: false });

    ImagePicker.openPicker({
      multiple: false,
      // maxFiles: 4,
      waitAnimationEnd: false,
      includeExif: true,
      loadingLabelText: 'Uploading files',
    })
      .then((item) => {
        // const newArray = imgs.map((img) => {
        //   // console.log('received image', img);
        //   // return { uri: img.path, width: img.width, height: img.height };
        //   // console.log(img.path);
        //   return img.path;
        // });

        // if video
        if (item.mime && item.mime.startsWith('video')) {
          if (item.duration < 61000) {
            // set video to state
            setVideo({ uri: item.path, width: item.width, height: item.height });
          } else {
            Alert.alert('Oh no!', 'Please select a video 60 seconds or less!', [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
        } else {
          setImages([item.path]);
        }

        // else (if photo)
        // set image to state

        // console.log('lol', item);

        // setImages([...newArray]);
      })
      .catch((e) => console.log(e));
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

  const onPressHashtag = () => {
    setContent((prevState) => {
      const beg = prevState.substring(0, cursorLocation);
      const end = prevState.substring(cursorLocation);

      return `${beg}#${end}`;
    });
  };

  const onPressMention = () => {
    setContent((prevState) => {
      const beg = prevState.substring(0, cursorLocation);
      const end = prevState.substring(cursorLocation);

      return `${beg}@${end}`;
    });
  };

  const renderVideo = () => {
    if (video && video.width && video.height && video.uri) {
      const ratio = video.width / video.height;

      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 15,
            paddingLeft: 48,
            marginBottom: 20,
          }}
        >
          <Video
            source={{ uri: video.uri }}
            // ref={videoRef}
            style={{
              width: 260,
              height: 260 / ratio,
              borderRadius: 10,
            }}
            resizeMode="contain"
            // paused
            repeat
          />
          <TouchableOpacity style={styles.removeImageButton} activeOpacity={0.7} onPress={() => setVideo(null)}>
            <Icon name="times" solid size={15} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderImages = () => {
    if (images.length < 1 || !!mentionText) return null;
    if (images.length === 1) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 15, paddingLeft: 48 }}>
          <View style={{ ...styles.image }}>
            <Image source={{ uri: images[0] }} height={300} width={280} />
            {/* <Image source={{ uri: images[0] }} width={200} /> */}
            <TouchableOpacity style={styles.removeImageButton} activeOpacity={0.7} onPress={() => setImages([])}>
              <Icon name="times" solid size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    if (images.length === 2) {
      return (
        <ScrollView
          horizontal
          // keyboardShouldPersistTaps="always"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', paddingTop: 10, alignItems: 'flex-start', paddingLeft: 48 }}
        >
          <View style={{ ...styles.image, marginRight: 15 }}>
            <Image source={{ uri: images[0] }} height={200} />
            <TouchableOpacity
              style={styles.removeImageButton}
              activeOpacity={0.7}
              onPress={() => {
                const newArray = [...images];
                newArray.splice(0, 1);
                setImages([...newArray]);
              }}
            >
              <Icon name="times" solid size={15} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.image }}>
            <Image source={{ uri: images[1] }} height={200} />
            <TouchableOpacity
              style={styles.removeImageButton}
              activeOpacity={0.7}
              onPress={() => {
                const newArray = [...images];
                newArray.splice(1, 1);
                setImages([...newArray]);
              }}
            >
              <Icon name="times" solid size={15} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }

    // if more than 2 images
    return (
      <ScrollView
        horizontal
        // keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row', paddingTop: 10, alignItems: 'flex-start', paddingLeft: 48 }}
      >
        {images.map((image, i) => {
          return (
            <View key={image} style={{ ...styles.image, marginRight: 15 }}>
              <Image source={{ uri: images[i] }} height={200} />
              <TouchableOpacity
                style={styles.removeImageButton}
                activeOpacity={0.7}
                onPress={() => {
                  const newArray = [...images];
                  newArray.splice(i, 1);
                  setImages([...newArray]);
                }}
              >
                <Icon name="times" solid size={15} color="white" />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const renderGoalText = () => {
    if (!goal) {
      return (
        <>
          <View style={styles.leftSide}>
            <Ionicons name="ios-rocket" size={22} color={colors.iconGray} />
          </View>
          <Text style={{ ...defaultStyles.largeMediumMute, opacity: 0.6, flex: 1 }}>Add a goal</Text>
          <TouchableOpacity
            style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
            onPress={handleGoalRowSelect}
            hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
          >
            <Ionicons name="ios-chevron-forward" size={20} color={colors.iconGray} />
          </TouchableOpacity>
        </>
      );
    }

    if (!subField) {
      return (
        <>
          <View style={styles.leftSide}>
            {goal.icon ? (
              <Icon name={goal.icon} solid size={20} color={goal.primaryColor} />
            ) : (
              <Ionicons name="ios-rocket" size={22} color={colors.red} />
            )}
          </View>
          <Text style={{ ...defaultStyles.largeMedium, flex: 1 }}>{goal.name}</Text>
          <TouchableOpacity
            style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
            onPress={clearGoal}
            hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
          >
            <Ionicons name="md-close" size={20} color={colors.iconGray} />
          </TouchableOpacity>
        </>
      );
    }

    const topik = getTopicFromID(subField);

    return (
      <>
        <View style={styles.leftSide}>
          {goal.icon ? (
            <Icon name={goal.icon} solid size={20} color={goal.primaryColor} />
          ) : (
            <Ionicons name="ios-rocket" size={22} color={colors.iconGray} />
          )}
        </View>
        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text>
            <Text style={{ ...defaultStyles.largeMedium }}>{goal.name} </Text>
            <Text style={{ ...defaultStyles.largeLight }}>{goal.adverb} </Text>
            <Text style={{ ...defaultStyles.largeMedium }}>{topik.name}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
          onPress={clearGoal}
          hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
        >
          <Ionicons name="md-close" size={20} color={colors.iconGray} />
        </TouchableOpacity>
      </>
    );
  };

  const renderTopicText = () => {
    // return null;
    if (!topic) {
      return (
        <>
          <View style={styles.leftSide}>
            <Ionicons name="ios-chatbubbles" size={22} color={colors.iconGray} />
          </View>

          <Text style={{ ...defaultStyles.largeMediumMute, opacity: 0.6, flex: 1 }}>Add a topic</Text>
          <TouchableOpacity
            style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
            onPress={handleTopicRowSelect}
            hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
          >
            <Ionicons name="ios-chevron-forward" size={20} color={colors.iconGray} />
          </TouchableOpacity>
        </>
      );
    }

    const { name } = getTopicFromID(topic);

    return (
      <>
        <View style={styles.leftSide}>
          <Ionicons name="ios-chatbubbles" size={22} color={colors.blueGray} />
        </View>

        <Text style={{ ...defaultStyles.largeMedium, flex: 1 }}>{name}</Text>
        <TouchableOpacity
          style={{ paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center' }}
          onPress={clearTopic}
          hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
        >
          <Ionicons name="md-close" size={20} color={colors.iconGray} />
        </TouchableOpacity>
      </>
    );
  };

  const renderTop = () => {
    // if there is a goal - show only the goal
    if (goal) {
      if (isCustomGoalTest(goal.name)) {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingTop: 15,
              paddingLeft: 7,
              // paddingRight: 30,
              // position: 'relative',
              // backgroundColor: 'pink',
              width: '100%',
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('CustomGoalModal', {
                  goalText: goal.name,
                  goalColor: goal.secondaryColor,
                  goalIcon: goal.goalIcon,
                  setGoal,
                  setTopic,
                })
              }
            >
              <CustomGoal navigation={navigation} goal={goal.name} color={goal.secondaryColor} icon={goal.goalIcon} />
            </TouchableOpacity>
            <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 3 }}
                onPress={clearGoal}
                hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
              >
                <Ionicons name="md-close" size={20} color={colors.iconGray} style={{ paddingBottom: 5 }} />
              </TouchableOpacity>
            </View>
          </View>
        );
      }

      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            paddingTop: 15,
            paddingLeft: 7,
            // paddingRight: 30,
            // position: 'relative',
            // backgroundColor: 'pink',
            width: '100%',
          }}
        >
          <View>
            <Goal goal={goal.name} subField={subField} />
          </View>
          <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 3 }}
              onPress={clearGoal}
              hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
            >
              <Ionicons name="md-close" size={20} color={colors.iconGray} style={{ paddingBottom: 5 }} />
            </TouchableOpacity>
          </View>
          {/* <View
            style={{
              // flexGrow: 1,
              // flexDirection: 'row',
              // justifyContent: 'flex-end',
              // alignItems: 'center',
              // paddingRight: 5,
              // backgroundColor: 'pink',
              // position: 'absolute',
              top: 28,
              right: 0,
            }}
          >
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center' }}
              onPress={clearGoal}
              hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
            >
              <Ionicons name="md-close" size={20} color={colors.iconGray} />
            </TouchableOpacity>
          </View> */}
        </View>
      );
    }

    // if there is no goal, but a topic - show only topic
    if (topic) {
      return (
        <TouchableOpacity onPress={handleTopicRowSelect} activeOpacity={0.7}>
          <View style={styles.selectTopicView}>{renderTopicText()}</View>
        </TouchableOpacity>
      );
    }

    return (
      <>
        <TouchableOpacity onPress={handleGoalRowSelect} activeOpacity={0.7}>
          <View style={styles.selectGoalView}>{renderGoalText()}</View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTopicRowSelect} activeOpacity={0.7}>
          <View style={styles.selectTopicView}>{renderTopicText()}</View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />
      <HeaderWhite
        handleLeft={handleBack}
        handleRight={handleSubmit}
        textLeft="Cancel"
        textRight="Post"
        solidRight
        title={`Create a ${goal ? 'Goal' : 'Post'}`}
      />
      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            // keyboardShouldPersistTaps="always"
          >
            {renderTop()}

            <View style={styles.postInputView}>
              <View style={styles.leftSide}>
                <ProfilePicBasic pic={data.userLoggedIn.profilePic} size={34} />
              </View>
              <View style={styles.rightSide}>
                <TextInput
                  style={{
                    flex: 1,
                    paddingTop: 6,
                    paddingRight: 15,
                    ...defaultStyles.largeRegular,
                    paddingBottom: 10,
                    // backgroundColor: 'pink',
                  }}
                  onChangeText={(val) => setContent(val)}
                  autoFocus
                  autoCompleteType="off"
                  keyboardType="twitter"
                  textContentType="none"
                  // autoCorrect={false}
                  multiline
                  maxLength={320}
                  textAlignVertical="top"
                  placeholder={goal ? 'Tell us about your goal' : "What's going on?"}
                  inputAccessoryViewID="1"
                  onSelectionChange={({ nativeEvent }) => setCursorLocation(nativeEvent.selection.end)}
                >
                  <CoolText>{content}</CoolText>
                </TextInput>
              </View>
            </View>
            {renderImages()}
            {renderVideo()}
          </ScrollView>
        </View>
        <InputAccessoryView nativeID="1">
          {mentionText ? (
            <MentionsSelect mentionText={mentionText} handleMentionSelect={handleMentionSelect} />
          ) : (
            <View style={styles.aboveKeyboard}>
              <View style={{ flex: 1, paddingRight: 20 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditLocationModal', { initialLocation: location, handleLocationSelect })}
                  hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Icon
                      name="map-marker-alt"
                      size={15}
                      color={colors.purp}
                      style={{ paddingRight: 8, paddingBottom: 2, opacity: 0.7 }}
                    />
                    <Text
                      numberOfLines={1}
                      // ellipsizeMode="head"
                      style={{ ...defaultStyles.defaultRegular, color: colors.blueGray, flex: 1 }}
                    >
                      {location}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                onPress={handleCameraIconPress}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: colors.purp,
                  position: 'absolute',
                  top: -32,
                  right: width / 2 - 32,
                  ...defaultStyles.shadowButton,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: colors.borderBlack,
                }}
              >
                <Icon name="camera" size={32} color={colors.white} style={{}} onPress={handleCameraIconPress} />
              </TouchableOpacity> */}
              <View style={styles.aboveKeyboardRight}>
                <TouchableOpacity onPress={() => null} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                  <Text style={{ ...defaultStyles.hugeBold, color: colors.purp, opacity: 0.7, paddingRight: 22 }}>GIF</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCameraIconPress} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                  <Icon name="image" size={22} color={colors.purp} style={{ paddingRight: 22, opacity: 0.7 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressMention} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                  <Icon name="at" size={18} color={colors.blue} style={{ paddingRight: 22, opacity: 0.7 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressHashtag} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                  <Icon name="hashtag" size={18} color={colors.purp} style={{ paddingRight: 4, opacity: 0.7 }} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </InputAccessoryView>
        <InputAccessoryView nativeID={2} />
      </KeyboardAvoidingView>
      {loading && <Loader active={loading} size="small" />}
    </View>
  );
};

export default NewPostModal;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'space-between',
    height: '100%',
    // backgroundColor: 'purple',
  },
  scrollView: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    // paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // flex: 1,
  },
  selectGoalView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 48,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  selectTopicView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    minHeight: 48,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  postInputView: {
    flexDirection: 'row',
    width: '100%',
    // height: 120,
    marginTop: 10,
    // backgroundColor: 'blue',
  },
  leftSide: {
    width: 50,
    paddingRight: 5,
    alignItems: 'center',
  },
  rightSide: {
    flex: 1,
    alignItems: 'stretch',
    // minHeight: 70,
  },

  images: {
    width: '100%',
  },
  image: {
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    overflow: 'hidden',
    // marginRight: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGray1,
    opacity: 0.9,
    height: 24,
    width: 24,
    borderRadius: 12,
    ...defaultStyles.shadow3,
  },
  aboveKeyboard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  aboveKeyboardLeft: {
    flexDirection: 'row',
  },
  aboveKeyboardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
