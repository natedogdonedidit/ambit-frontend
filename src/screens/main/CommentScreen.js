import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Alert,
  ScrollView,
  // Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  InputAccessoryView,
} from 'react-native';
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks';
// import Editor, { displayTextWithMentions } from 'react-native-mentions-editor';
import ImagePicker from 'react-native-image-crop-picker';
// import Image from 'react-native-scalable-image';
import FitImage from 'react-native-fit-image';
import { postPicUpload, imageUpload } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import PostGroupTL from 'library/components/post/PostGroupTL';
import ProfilePic from 'library/components/UI/ProfilePic';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import ALL_USERS_QUERY from 'library/queries/ALL_USERS_QUERY';
import CREATE_COMMENT_MUTATION from 'library/mutations/CREATE_COMMENT_MUTATION';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
// import ThreadLine from 'library/components/UI/ThreadLine';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Post from 'library/components/post/Post';
import Comment from 'library/components/post/Comment';

const CommentScreen = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  // const inputRef = useRef(null);

  // params
  const clicked = navigation.getParam('clicked', null); // the content that was clicked (post, update, or comment)
  const updateInd = navigation.getParam('updateInd', null);
  const isUpdate = navigation.getParam('isUpdate', false); // if commenting on an Update
  const isComment = navigation.getParam('isComment', false); // if commenting on a Comment

  // state declaration\
  // const [comment, setComment] = useState(isComment ? `@[${clicked.owner.name}](${clicked.owner.id}) ` : '');
  const [comment, setComment] = useState('');
  const [commentImage, setCommentImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [mentions, setMentions] = useState([]);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [showMentionList, setShowMentionList] = useState(false);

  // constants
  const currentTime = new Date();
  const parentPost = isUpdate || isComment ? clicked.parentPost : clicked;
  const parentUpdate = isUpdate ? { connect: { id: clicked.id } } : null;
  const hasParentComment = isComment ? !!clicked.parentComment : null;

  let parentComment = null;
  if (isComment && hasParentComment) parentComment = { connect: { id: clicked.parentComment.id } };
  if (isComment && !hasParentComment) parentComment = { connect: { id: clicked.id } };

  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;

  const { loading: loadingPost, error: errorPost, data: dataPost } = useQuery(SINGLE_POST_QUERY, {
    variables: { id: parentPost.id },
  });

  const loading = loadingUser || loadingPost;

  if (errorUser) return <Error error={errorUser} />;
  if (errorPost) return <Error error={errorPost} />;

  const handleSubmit = async () => {
    const message = validateInputs();
    // if missing a required field, Alert user
    if (message) {
      Alert.alert('Please add a comment or image', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      return;
    }
    if (commentImage) {
      await uploadImage();
    }
    createComment();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderWhite
          handleLeft={navigation.goBack}
          handleRight={handleSubmit}
          textLeft="Back"
          textRight="Reply"
          title="Comment"
        />
        <Loader loading={loading} full={false} />
      </View>
    );
  }

  const { singlePost: post } = dataPost;

  const [getPossibleMentions, { loading: loadingMentions, error: errorMentions, data: dataMentions }] = useLazyQuery(
    ALL_USERS_QUERY
  );

  // const parentPostObject = isUpdate ? null : { connect: { id: parentPost.id } }; // dont want to attach comment to a parentPost if it has a parentUpdate
  const parentPostObject = { connect: { id: parentPost.id } }; // dont want to attach comment to a parentPost if it has a parentUpdate

  // MUTATIONS
  const [createComment, { loading: loadingCreate }] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      comment: {
        content: comment,
        image: commentImage,
        owner: {
          connect: { id: userLoggedIn.id },
        },
        parentPost: parentPostObject,
        parentUpdate,
        parentComment,
      },
    },
    refetchQueries: () => [{ query: SINGLE_POST_QUERY, variables: { id: parentPost.id } }],
    onCompleted: () => {
      navigation.goBack();
    },
    onError: error => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to create this comment. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // EFFECTS
  useEffect(() => {
    // scrollViewRef.current.scrollResponderScrollToEnd();    // give me errors sometimes
  }, [showMentionList]);

  // Mentions stuff

  // const mentionAttemptFunction = (input, cursorSelection) => {
  //   const whiteRegEx = /\s/g;
  //   const mentionRegEx = /\s@\w*$/g; // ends with 'whitespace-@-zeroormorecharacters'
  //   const { start, end } = cursorSelection;
  //   const singleCursor = start === end;
  //   const stringBefore = input.slice(0, start); // slice off everything after the cursor
  //   const isMention = mentionRegEx.test(stringBefore);
  //   const nextCharacter = input[start];
  //   const nextIsWhite = whiteRegEx.test(nextCharacter) || nextCharacter === undefined; // check if next character is white or undefined (end of line)
  //   return !!(singleCursor && nextIsWhite && isMention);
  // };

  // const mentionCompare = (a, b) => {
  //   const aa = a.start;
  //   const bb = b.start;
  //   if (aa < bb) return -1;
  //   return 1;
  // };

  // const handleMentionSelect = user => {
  //   // know cursor position //selection.start
  //   const cursor = selection.start;

  //   // get position of @
  //   const beforeCursor = comment.slice(0, cursor);
  //   const atSymbolLocation = beforeCursor.lastIndexOf('@');

  //   // remove everthing back to the @ symbol
  //   const beforeMention = comment.slice(0, atSymbolLocation);
  //   const afterMention = comment.slice(cursor, comment.length);

  //   // insert name into the comment
  //   const trimmedName = user.name.trim();
  //   const newComment = beforeMention.concat(trimmedName, afterMention, ' ');

  //   // log mention into mention logs
  //   const newMention = {
  //     start: atSymbolLocation,
  //     end: atSymbolLocation + trimmedName.length - 1,
  //     length: trimmedName.length,
  //     name: trimmedName,
  //     id: user.id,
  //   };

  //   const newMentions = [...mentions, newMention];
  //   const sortedMentions = newMentions.sort(mentionCompare);
  //   console.log(sortedMentions);

  //   // save mention data into array
  //   setMentions(sortedMentions);

  //   // convert to formattedComment, save to state
  //   setComment(newComment);
  // };

  // const formatText = rawText => {
  //   if (mentions.length < 1) return rawText;

  //   const subStrings = [];

  //   mentions.forEach((mention, i) => {
  //     const isLast = mentions.length === i + 1;

  //     // make substrings of new formatted text w/ mentions
  //     if (i === 0) {
  //       // before mention
  //       subStrings.push(rawText.substring(0, mention.start));
  //       // mention
  //       subStrings.push(`@[${mention.name}](${mention.id})`);
  //       // after mention
  //       // if last mention...go to end. If another mention...go to start of that one.
  //       subStrings.push(rawText.substring(mention.end, isLast ? rawText.length : mentions[i + 1].start));
  //     } else {
  //       // mention
  //       subStrings.push(`@[${mention.name}](${mention.id})`);
  //       // after mention
  //       // if last mention...go to end. If another mention...go to start of that one.
  //       subStrings.push(rawText.substring(mention.end, isLast ? rawText.length : mentions[i + 1].start));
  //     }

  //     // concat together substrings
  //     const formattedText = subStrings.toString();
  //     console.log(formattedText);
  //   });
  // };

  const onChangeText = val => {
    // console.log('selection state', selection);
    // console.log(val);
    // console.log(mentions);

    // const isMentionAttempt = mentionAttemptFunction(val, selection);

    // if (isMentionAttempt) {
    //   setShowMentionList(true);
    //   getPossibleMentions();
    // } else {
    //   setShowMentionList(false);
    // }

    // convert to formattedComment, save to state

    setComment(val);
  };

  // const renderFormatedText = () => {
  //   // convert formatedComment to displayComment

  //   const mentionRegEx = /(@\[\w[\w\s]+\]\(\w{25}\))/g;
  //   const mentionRegExName = /@\[(\w[\w\s]+)\]\(\w{25}\)/g;

  //   // split the comment into slices of Text & Mentions
  //   const commentSplit = comment.split(mentionRegEx);

  //   return commentSplit.map((segment, i) => {
  //     // check if segment is a mention
  //     const isMention = mentionRegEx.test(segment);

  //     if (isMention) {
  //       const name = mentionRegExName.exec(segment);
  //       return (
  //         <Text key={i} style={{ ...defaultStyles.defaultMedium, color: colors.iosBlue }}>
  //           {name[1]}
  //         </Text>
  //       );
  //     }

  //     return (
  //       <Text key={i} style={defaultStyles.defaultText}>
  //         {segment}
  //       </Text>
  //     );
  //   });
  // };

  // CUSTOM FUNCTIONS

  // must pass this to camera roll modal
  // const handleMediaSelect = (uri, type) => {
  //   if (type === 'image') {
  //     setCommentImage(uri);
  //   }
  // };

  const uploadImage = async () => {
    setUploading(true);

    try {
      const uploadedImage = await postPicUpload(userLoggedIn, commentImage);
      setUploading(false);
      setCommentImage(uploadedImage);
    } catch (e) {
      setUploading(false);
      Alert.alert('Oh no!', 'We could not upload your picture. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  // const uploadImage = async () => {
  //   setUploading(true);
  //   try {
  //     const urls = await imageUpload(userLoggedIn.id, [commentImage]);
  //     setUploading(false);
  //     setCommentImage(urls[0]);
  //   } catch (e) {
  //     setUploading(false);
  //     setCommentImage('');
  //     Alert.alert('Oh no!', 'We could not upload your picture at this time. Try again later!', [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ]);
  //   }
  // };

  const handleCameraIconPress = () => {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
    })
      .then(img => {
        setCommentImage(img.path);
      })
      .catch(e => alert(e));
  };

  const validateInputs = () => {
    if (!comment && !commentImage) return 'Oops';
    return null;
  };

  const renderPost = () => {
    // if its just a stand-alone Post
    if (!isUpdate) {
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post })}>
          <Post post={post} currentTime={currentTime} navigation={navigation} hideButtons showLine />
        </TouchableOpacity>
      );
    }

    // if showing an update
    return (
      <PostGroupTL post={post} currentTime={currentTime} navigation={navigation} updateInd={updateInd} hideButtons hideTopLine />
    );
  };

  const renderComments = () => {
    // if the clicked comment is a stand-alone comment
    if (!hasParentComment) {
      return (
        <Comment comment={clicked} navigation={navigation} currentTime={currentTime} hideButtons hideTopMargin hideTopLine />
      );
    }

    // // if the clicked comment is a a sub-comment, show all comments
    const parComment = post.comments.find(com => com.id === clicked.parentComment.id);
    const subCommentIndex = parComment.comments.findIndex(element => element.id === clicked.id);

    return (
      <>
        <Comment
          key={parComment.id}
          comment={parComment}
          navigation={navigation}
          currentTime={currentTime}
          hideTopLine
          // isSubComment
          // showLine
          hideButtons
        />
        {parComment.comments.map((subComment, k) => {
          if (k <= subCommentIndex) {
            return (
              <Comment
                key={subComment.id}
                comment={subComment}
                navigation={navigation}
                currentTime={currentTime}
                isSubComment
                showLine
                hideButtons
              />
            );
          }
          return null;
        })}
      </>
    );
  };

  const loadingSubmit = uploading || loadingCreate;

  // const renderPossibleMentions = () => {
  //   if (loadingMentions) return <Loader loading={loadingMentions} full={false} />;

  //   if (dataMentions && dataMentions.users) {
  //     const possibleMentions = dataMentions.users;

  //     return possibleMentions.map(user => {
  //       return (
  //         <TouchableOpacity key={user.id} onPress={() => handleMentionSelect(user)}>
  //           <View style={styles.mentionListItem}>
  //             <View style={styles.mentionListItemPic}>
  //               <ProfilePic size={30} navigation={navigation} user={user} />
  //             </View>
  //             <View style={styles.mentionListItemDetails}>
  //               <Text style={defaultStyles.largeMedium}>{user.name}</Text>
  //               <Text style={defaultStyles.defaultText}>{user.location}</Text>
  //             </View>
  //           </View>
  //         </TouchableOpacity>
  //       );
  //     });
  //   }

  //   return (
  //     <View>
  //       <Text>No matching users</Text>
  //     </View>
  //   );
  // };

  return (
    <View style={styles.container}>
      <HeaderWhite handleLeft={navigation.goBack} handleRight={handleSubmit} textLeft="Back" textRight="Reply" title="Comment" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={{ flex: 1 }}>
          <ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
            {renderPost()}
            {isComment && renderComments()}

            <View style={[styles.commentInput, isComment && { paddingLeft: 48 }]}>
              <View style={styles.leftColumn}>
                <ProfilePic size={30} navigation={navigation} user={userLoggedIn} disableVideo />
              </View>
              <View style={styles.rightColumn}>
                {/* <Text style={defaultStyles.defaultSemibold} numberOfLines={1}>
                    {userLoggedIn.name}
                  </Text> */}
                <View style={{ paddingTop: 2, paddingBottom: 10 }}>
                  <TextInput
                    style={{ flex: 1, marginRight: 35, ...defaultStyles.largeRegular }}
                    onChangeText={onChangeText}
                    autoFocus
                    autoCompleteType="off"
                    // autoCorrect={false}
                    multiline
                    scrollEnabled={false}
                    textAlignVertical="top"
                    placeholder="Start your comment"
                    onSelectionChange={event => setSelection(event.nativeEvent.selection)}
                    inputAccessoryViewID="1"
                    // onBlur={() => setShowMentionList(false)}
                  />
                  {/* {renderFormatedText()} */}
                  {/* </TextInput> */}
                </View>
                {!!commentImage && (
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingRight: 10 }}>
                    <View style={{ ...styles.image, width: '100%' }}>
                      <FitImage source={{ uri: commentImage }} />
                      <View style={styles.removeImageButton}>
                        <Icon name="times" solid size={15} color="white" onPress={() => setCommentImage('')} />
                      </View>
                    </View>
                  </View>

                  // <View style={styles.media}>
                  //   <Image style={{ width: '100%', height: 160 }} source={{ uri: commentImage }} resizeMode="cover" />
                  // </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* {showMentionList && (
            <>
              <View style={{ width: '100%', height: 10, backgroundColor: colors.lightGray }} />
              <View style={{ flex: 2 }}>
                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
                  <View style={styles.mentionsList}>{renderPossibleMentions()}</View>
                </ScrollView>
              </View>
            </>
          )} */}

        <InputAccessoryView nativeID="1">
          <View style={styles.aboveKeyboard}>
            <View style={styles.aboveKeyboardLeft}>
              <TouchableOpacity
                onPress={handleCameraIconPress}
                // onPress={() => navigation.navigate('RollModal', { handleMediaSelect, selected: [...images, video] })}
                hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
              >
                <Icon name="image" size={22} color={colors.purp} style={{ paddingRight: 30, opacity: 0.6 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}>
                <IconM name="camera-outline" size={22} color={colors.purp} style={{ paddingRight: 32, opacity: 0.6 }} />
              </TouchableOpacity>
            </View>
          </View>
        </InputAccessoryView>

        {/* <InputAccessoryView nativeID="1">
            <View style={styles.aboveKeyboard}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RollModal', { handleMediaSelect, assetType: 'Photos' })}
                hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
              >
                <Icon name="image" size={24} color={colors.purp} style={{ paddingRight: 10 }} />
              </TouchableOpacity>
            </View>
          </InputAccessoryView> */}
      </KeyboardAvoidingView>

      {loadingSubmit && <Loader loading={loadingSubmit} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // copied in
  commentInput: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    borderRadius: 3,
  },
  leftColumn: {
    alignItems: 'center',
    width: 48,
  },
  // leftColumnSub: {
  //   alignItems: 'center',
  //   width: 64,
  // },
  rightColumn: {
    flex: 1,
    alignItems: 'stretch',
    paddingLeft: 8,
    paddingBottom: 20,
    // paddingRight: 15,
  },
  // media: {
  //   width: '100%',
  //   // height: 240,
  //   borderRadius: 10,
  //   borderWidth: StyleSheet.hairlineWidth,
  //   borderColor: colors.borderBlack,
  //   marginBottom: 10,
  //   overflow: 'hidden',
  // },
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
  },
  // mentionsList: {
  //   width: '100%',
  //   minHeight: 200,
  // },
  // mentionListItem: {
  //   flexDirection: 'row',
  //   borderTopWidth: StyleSheet.hairlineWidth,
  //   borderColor: colors.borderBlack,
  // },
  // mentionListItemPic: {
  //   width: 60,
  //   height: 60,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // mentionListItemDetails: {
  //   flexGrow: 1,
  //   height: 60,
  //   justifyContent: 'center',
  // },
});

CommentScreen.navigationOptions = {
  title: 'Comment',
};

export default CommentScreen;
