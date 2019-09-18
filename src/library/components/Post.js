import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { UserContext } from 'library/utils/UserContext';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';

import MediumProfilePic from 'library/components/UI/MediumProfilePic';
import Goal from 'library/components/UI/Goal';
import Tag from 'library/components/UI/Tag';
import Heart from 'library/components/UI/Heart';
import Comment from 'library/components/UI/Comment';
import Options from 'library/components/UI/Options';
import Share from 'library/components/UI/Share';
import Location from 'library/components/UI/Location';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const Post = ({ post, currentTime, setModalVisibleEditPost, setPostToEdit, editable = false }) => {
  const { currentUserId } = useContext(UserContext);
  const isMyPost = post.owner.id === currentUserId;

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
            <Text style={{ ...defaultStyles.smallLight, color: colors.peach }}>View</Text>
            <Text style={{ ...defaultStyles.smallLight, color: colors.peach }}>Pitch</Text>
          </View>
        )}
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.topRow}>
          <View style={styles.leftSide}>
            <Text style={defaultStyles.defaultMedium} numberOfLines={1}>
              {post.owner.name}
              {'   '}
              <Text style={{ ...defaultStyles.smallThinMute }}>
                <Icon name="map-marker-alt" solid size={10} color={colors.darkGray} style={{ opacity: 0.3 }} /> {post.location}
              </Text>
            </Text>
            <View style={{ flex: 1 }}>{post.isGoal && <Text style={defaultStyles.smallThinMute}>is looking to:</Text>}</View>
          </View>
          <View style={styles.rightSide}>
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

        {/* {post.tags.length > 0 && <View style={styles.tags}>{renderTags()}</View>} */}
        {/* {containsMedia && <View style={styles.media}>{renderMedia()}</View>} */}
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Comment onPress={() => null} />
            <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{getRandomInt(100)}</Text>
          </View>
          <View style={styles.button}>
            <Heart onPress={() => null} />
            <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{getRandomInt(100)}</Text>
          </View>
          <View style={styles.button}>
            <Share onPress={() => null} />
            <Text style={{ ...defaultStyles.smallMute, marginLeft: 3 }}>{getRandomInt(100)}</Text>
          </View>
        </View>
      </View>
      {isMyPost && editable && (
        <View style={{ position: 'absolute', top: 30, right: 10 }}>
          <Options
            onPress={() => {
              setPostToEdit({ id: post.id, owner: post.owner.id });
              setModalVisibleEditPost(true);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    flexDirection: 'row',
    paddingTop: 12,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
    backgroundColor: 'white',
    marginTop: 6,
    // marginHorizontal: 6,
    borderRadius: 3,
  },
  leftColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 64,
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
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  goal: {
    alignSelf: 'flex-start',
    paddingTop: 5,
    paddingBottom: 15,
  },
  content: {
    paddingBottom: 15,
    paddingRight: 15,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 11,
    paddingRight: 20,
  },
  buttons: {
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center',
  },
  button: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Post;
