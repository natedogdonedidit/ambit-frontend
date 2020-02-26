import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import ProfilePic from 'library/components/UI/ProfilePic';

const NotificationListItem = ({ navigation, notification }) => {
  const { style, createdAt } = notification;

  // for dates
  const currentTime = new Date();
  const created = new Date(createdAt);
  const { timeDiff, period } = timeDifference(currentTime, created);
  // const formatedDate = format(created, 'M/d/yy h:mm a');

  if (style === 'LIKE_POST') {
    const { user, post } = notification;

    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={() => navigation.navigate('Post', { post })}>
        <View style={styles.connection}>
          <View style={styles.profilePicView}>
            <ProfilePic navigation={navigation} user={user} />
          </View>
          <View style={styles.rightSide}>
            <View style={styles.headlineRow}>
              <Text>
                <Text style={defaultStyles.largeSemibold}>{user.name}</Text>
                <Text style={defaultStyles.largeRegular}> liked your post</Text>
              </Text>
              <Text style={{ ...defaultStyles.smallMute }}>
                {timeDiff}
                {period}
              </Text>
            </View>

            <Text style={defaultStyles.defaultMute}>{post.content}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
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
    width: 64,
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
