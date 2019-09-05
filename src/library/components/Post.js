import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';

import MediumProfilePic from 'library/components/UI/MediumProfilePic';
import Goal from 'library/components/UI/Goal';
import Tag from 'library/components/UI/Tag';
import Heart from 'library/components/UI/Heart';
import Comment from 'library/components/UI/Comment';
import Coffee from 'library/components/UI/Coffee';
import Share from 'library/components/UI/Share';

const Post = ({ post, currentTime }) => {
  const containsMedia = post.video || post.images.length > 0;

  const postTime = new Date(post.lastUpdated);
  const { timeDiff, period } = timeDifference(currentTime, postTime);

  const renderTags = () => {
    return post.tags.map((tag, i) => (
      <Tag key={i} onPress={() => null}>
        {tag}
      </Tag>
    ));
  };

  const renderMedia = () => {};

  return (
    <View style={styles.post}>
      <View style={styles.leftColumn}>
        <MediumProfilePic pic={post.owner.profilePic} pitch={post.pitch} intro={post.owner.intro} />
        {!!post.pitch && (
          <View style={{ alignItems: 'center', paddingTop: 1 }}>
            <Text style={{ ...defaultStyles.smallText, color: colors.peach }}>View</Text>
            <Text style={{ ...defaultStyles.smallText, color: colors.peach }}>Pitch</Text>
          </View>
        )}
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.topRow}>
          <View style={styles.leftSide}>
            <Text style={defaultStyles.largeMedium}>{post.owner.name}</Text>
            <View style={{ flex: 1 }}>{post.isGoal && <Text style={defaultStyles.smallThinMute}>is looking to:</Text>}</View>
          </View>
          <View style={styles.rightSide}>
            {post.location && post.isGoal && <Text style={defaultStyles.smallThinMute}>{post.location}</Text>}
            <Text style={defaultStyles.smallThinMute}>
              {timeDiff} {period}
            </Text>
          </View>
        </View>
        {post.isGoal && (
          <View style={styles.goal}>
            <Goal goal={post.goal} />
          </View>
        )}
        <View style={styles.content}>
          <Text style={defaultStyles.defaultText}>{post.content}</Text>
        </View>
        {post.tags.length > 0 && <View style={styles.tags}>{renderTags()}</View>}
        {/* {containsMedia && <View style={styles.media}>{renderMedia()}</View>} */}
        <View style={styles.buttons}>
          <Comment onPress={() => null} />
          <Coffee onPress={() => null} />
          <Share onPress={() => null} />
          <Heart onPress={() => null} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flexDirection: 'row',
    paddingTop: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  leftColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 74,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingRight: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  leftSide: {},
  rightSide: {
    alignItems: 'flex-end',
  },
  goal: {
    alignSelf: 'flex-start',
    paddingTop: 5,
    paddingBottom: 15,
  },
  content: {
    paddingBottom: 12,
    paddingRight: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 11,
    paddingRight: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingBottom: 10,
  },
});

export default Post;
