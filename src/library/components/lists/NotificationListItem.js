import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference, getGoalInfo, getTopicFromID } from 'library/utils';
import ProfilePic from 'library/components/UI/ProfilePic';
import { DAYS_TILL_INACTIVE } from 'styles/constants';
import CoolText from 'library/components/UI/CoolText';

const NotificationListItem = ({ navigation, notification }) => {
  const { style, createdAt, user, users, post, update, comment } = notification;

  // CONSTANTS for dates
  const currentTime = new Date();
  const created = new Date(createdAt);
  const { timeDiff, period } = timeDifference(currentTime, created);

  // CUSTOM FUNCTIONS
  const getNotificationOnPress = () => {
    if (style === 'LIKE_POST') {
      return navigation.navigate('Post', { post });
    }
    if (style === 'LIKE_GOAL') {
      return navigation.navigate('Post', { post });
    }
    if (style === 'LIKE_UPDATE') {
      return navigation.navigate('Update', { updatePassedIn: update });
    }
    if (style === 'LIKE_COMMENT') {
      const isOnPost = !!comment.parentPost;
      const isOnUpdate = !!comment.parentUpdate;

      if (isOnPost) return navigation.navigate('Post', { post: comment.parentPost });
      if (isOnUpdate) return navigation.navigate('Update', { updatePassedIn: comment.parentUpdate });

      return null;
    }
    if (style === 'COMMENT_GOAL') {
      return navigation.navigate('Post', { post: comment.parentPost });
    }
    if (style === 'COMMENT_POST') {
      return navigation.navigate('Post', { post: comment.parentPost });
    }
    if (style === 'COMMENT_UPDATE') {
      return navigation.navigate('Update', { updatePassedIn: comment.parentUpdate });
    }
    if (style === 'COMMENT_COMMENT') {
      return navigation.navigate('Post', { post: comment.parentPost });
    }
    if (style === 'NEW_FOLLOWER') {
      return navigation.navigate('Profile', { profileId: user.id });
    }
    if (style === 'MENTIONED_IN_POST') {
      return navigation.navigate('Post', { post });
    }
    if (style === 'MENTIONED_IN_COMMENT') {
      return navigation.navigate('Post', { post: comment.parentPost });
    }
    if (style === 'MENTIONED_IN_UPDATE') {
      return navigation.navigate('Post', { post });
    }

    return null;
  };

  const getNotificationTitle = () => {
    if (style === 'LIKE_POST') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> liked your post</Text>
        </Text>
      );
    }
    if (style === 'LIKE_GOAL') {
      const name = post.subField ? getTopicFromID(post.subField.topicID).name : '';

      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> liked your goal</Text>
          <Text>
            <Text style={{ ...defaultStyles.defaultLight }}> to</Text>
            <Text
              style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}
            >{` ${post.goal}`}</Text>
            {post.subField && (
              <>
                <Text style={{ ...defaultStyles.defaultLight }}>{` ${getGoalInfo(post.goal, 'adverb')} `}</Text>
                <Text style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}>{name}</Text>
              </>
            )}
          </Text>
        </Text>
      );
    }
    if (style === 'LIKE_UPDATE') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultText}> liked your update</Text>
        </Text>
      );
    }
    if (style === 'LIKE_COMMENT') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> liked your comment</Text>
        </Text>
      );
    }
    if (style === 'COMMENT_GOAL') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> commented on your goal</Text>
        </Text>
      );
    }
    if (style === 'COMMENT_POST') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> commented on your post</Text>
        </Text>
      );
    }
    if (style === 'COMMENT_UPDATE') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> commented on your update</Text>
        </Text>
      );
    }
    if (style === 'COMMENT_COMMENT') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> replied to your comment</Text>
        </Text>
      );
    }

    if (style === 'NEW_FOLLOWER') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> followed you</Text>
        </Text>
      );
    }

    if (style === 'MENTIONED_IN_POST') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> mentioned you in a {post.goal ? 'goal' : 'post'}</Text>
        </Text>
      );
    }

    if (style === 'MENTIONED_IN_COMMENT') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> mentioned you in a comment</Text>
        </Text>
      );
    }

    if (style === 'MENTIONED_IN_UPDATE') {
      return (
        <Text>
          <Text style={defaultStyles.defaultSemibold}>{user.name}</Text>
          <Text style={defaultStyles.defaultLight}> mentioned you in an update</Text>
        </Text>
      );
    }

    return '';
  };

  const getNotificationContent = () => {
    if (style === 'LIKE_POST') {
      return post.content;
    }
    if (style === 'LIKE_GOAL') {
      return '';
    }
    if (style === 'LIKE_UPDATE') {
      return update.content;
    }
    if (style === 'LIKE_COMMENT') {
      return comment.content;
    }
    if (style === 'COMMENT_GOAL') {
      return comment.content;
    }
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
    // if (style === 'MENTIONED_IN_UPDATE') {
    //   return post.content;
    // }

    return '';
  };

  // RETURN STATEMENT PULLS DATA FROM ABOVE FUNCTIONS
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={getNotificationOnPress}>
      <View style={styles.connection}>
        <View style={styles.profilePicView}>
          <ProfilePic size="medium" navigation={navigation} user={user} />
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
