import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference, getGoalInfo, getTopicFromID } from 'library/utils';
import ProfilePic from 'library/components/UI/ProfilePic';
import { DAYS_TILL_INACTIVE } from 'styles/constants';
import CoolText from 'library/components/UI/CoolText';

const NotificationListItem = ({ navigation, notification }) => {
  const { style, createdAt, from, post, update, comment } = notification;

  // incase the post/comment/update has been deleted
  if (style === 'LIKE_POST' && !post) return null;
  if (style === 'LIKE_UPDATE' && !update) return null;
  if (style === 'LIKE_COMMENT' && !comment) return null;
  if (style === 'COMMENT_POST' && !comment) return null;
  if (style === 'COMMENT_UPDATE' && !comment) return null;
  if (style === 'COMMENT_COMMENT' && !comment) return null;
  if (style === 'NEW_FOLLOWER' && !from) return null;
  if (style === 'MENTIONED_IN_POST' && !post) return null;
  if (style === 'MENTIONED_IN_COMMENT' && !comment) return null;
  if (style === 'MENTIONED_IN_UPDATE' && !post) return null;

  // CONSTANTS for dates
  const currentTime = new Date();
  const created = new Date(createdAt);
  const { timeDiff, period } = timeDifference(currentTime, created);

  // CUSTOM FUNCTIONS
  const getNotificationOnPress = () => {
    if (style === 'LIKE_POST') {
      if (post) {
        return navigation.navigate('Post', { post });
      }
      // if post is missing from cache
      Alert.alert('Oh no!', `We could not find that post`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    if (style === 'LIKE_UPDATE') {
      if (update) {
        return navigation.navigate('Update', { updatePassedIn: update });
      }
      // if update is missing from cache
      Alert.alert('Oh no!', `We could not find that update`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    if (style === 'LIKE_COMMENT') {
      const isOnPost = !!comment && !!comment.parentPost;
      const isOnUpdate = !!comment && !!comment.parentUpdate;

      if (isOnPost) return navigation.navigate('Post', { post: comment.parentPost });
      if (isOnUpdate) return navigation.navigate('Update', { updatePassedIn: comment.parentUpdate });

      // if update is missing from cache
      Alert.alert('Oh no!', `We could not find that comment or post`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    if (style === 'COMMENT_POST') {
      if (!!comment && !!comment.parentPost) {
        return navigation.navigate('Post', { post: comment.parentPost });
      }
      // if parentPost is missing from cache
      if (!comment.parentPost) {
        Alert.alert('Oh no!', `We could not find that post`, [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
            },
          },
        ]);
      }
      // if comment is missing from cache
      if (!comment) {
        Alert.alert('Oh no!', `We could not find that comment`, [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressed');
            },
          },
        ]);
      }
    }
    if (style === 'COMMENT_UPDATE') {
      if (!!comment && !!comment.parentUpdate) {
        return navigation.navigate('Update', { updatePassedIn: comment.parentUpdate });
      }
      // if comment is missing from cache
      Alert.alert('Oh no!', `We could not find that comment or update`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    if (style === 'COMMENT_COMMENT') {
      if (!!comment && !!comment.parentPost) {
        return navigation.navigate('Post', { post: comment.parentPost });
      }
      // if comment is missing from cache
      Alert.alert('Oh no!', `We could not find that comment or post`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    if (style === 'NEW_FOLLOWER') {
      if (from && from.id) {
        return navigation.navigate('Profile', { username: from.username });
      }
      // if user is missing from cache
      Alert.alert('Oh no!', `We could not find that user`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    if (style === 'MENTIONED_IN_POST') {
      if (post) {
        return navigation.navigate('Post', { post });
      }
      // if post is missing from cache
      Alert.alert('Oh no!', `We could not find that post`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    if (style === 'MENTIONED_IN_COMMENT') {
      if (!!comment && !!comment.parentPost) {
        return navigation.navigate('Post', { post: comment.parentPost });
      }
      // if post is missing from cache
      Alert.alert('Oh no!', `We could not find that comment or post`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }
    if (style === 'MENTIONED_IN_UPDATE') {
      if (post) {
        return navigation.navigate('Post', { post });
      }
      // if post is missing from cache
      Alert.alert('Oh no!', `We could not find that update or post`, [
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
          },
        },
      ]);
    }

    return null;
  };

  const getNotificationTitle = () => {
    if (style === 'LIKE_POST') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> liked your post</Text>
        </Text>
      );
    }
    if (style === 'LIKE_UPDATE') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> liked your update</Text>
        </Text>
      );
    }
    if (style === 'LIKE_COMMENT') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> liked your comment</Text>
        </Text>
      );
    }
    if (style === 'COMMENT_POST') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> commented on your post</Text>
        </Text>
      );
    }
    if (style === 'COMMENT_UPDATE') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> commented on your update</Text>
        </Text>
      );
    }
    if (style === 'COMMENT_COMMENT') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> replied to your comment</Text>
        </Text>
      );
    }

    if (style === 'NEW_FOLLOWER') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> followed you</Text>
        </Text>
      );
    }

    if (style === 'MENTIONED_IN_POST') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> mentioned you in a {post.goal ? 'goal' : 'post'}</Text>
        </Text>
      );
    }

    if (style === 'MENTIONED_IN_COMMENT') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> mentioned you in a comment</Text>
        </Text>
      );
    }

    if (style === 'MENTIONED_IN_UPDATE') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{from.name}</Text>
          <Text style={defaultStyles.defaultLight}> mentioned you in an update</Text>
        </Text>
      );
    }

    return '';
  };

  const getNotificationContent = () => {
    if (style === 'COMMENT_POST') {
      return comment.content;
    }
    if (style === 'COMMENT_UPDATE') {
      return comment.content;
    }
    if (style === 'COMMENT_COMMENT') {
      return comment.content;
    }
    if (style === 'MENTIONED_IN_POST') {
      return post.content;
    }
    if (style === 'MENTIONED_IN_COMMENT') {
      return comment.content;
    }

    return '';
  };

  // RETURN STATEMENT PULLS DATA FROM ABOVE FUNCTIONS
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={getNotificationOnPress}>
      <View style={styles.connection}>
        <View style={styles.profilePicView}>
          <ProfilePic size="medium" navigation={navigation} user={from} />
        </View>
        <View style={styles.rightSide}>
          <View style={styles.headlineRow}>
            <View style={{ flex: 1 }}>{getNotificationTitle()}</View>
            <View style={{ paddingLeft: 5 }}>
              <Text style={{ ...defaultStyles.smallMute }}>
                {timeDiff}
                {period}
              </Text>
            </View>
          </View>
          {!!getNotificationContent() && <CoolText>{getNotificationContent()}</CoolText>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  connection: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  profilePicView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 76,
    alignSelf: 'flex-start',
    paddingLeft: 4,
    // paddingRight: 15,
  },
  rightSide: {
    flex: 1,
    paddingRight: 15,
  },
  headlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
});

export default NotificationListItem;
