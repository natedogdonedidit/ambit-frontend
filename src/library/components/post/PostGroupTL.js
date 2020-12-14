import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';

import Post from 'library/components/post/Post';
import Update from 'library/components/post/Update';
import ShowUpdatesButton from './ShowUpdatesButton';

function PostGroupTL({
  navigation,
  post,
  showLastLine = false,
  hideButtons = false,
  showDetails = false,
  updateInd = null,
  showAll = false,
  disableVideo = false,
  showTopBorder = false,
  showRepost = false,
}) {
  const hasUpdates = post.updates.length > 0;

  const renderAllUpdates = () => {
    return post.updates.map((update, i) => {
      let showThread = false;
      if (i !== post.updates.length - 1) showThread = true;
      if (i === post.updates.length - 1 && showLastLine) showThread = true;
      return (
        <TouchableOpacity
          key={update.id}
          activeOpacity={1}
          onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
        >
          <Update
            post={post}
            update={update}
            updateInd={i}
            navigation={navigation}
            hideButtons={hideButtons}
            showThread={showThread}
            disableVideo={disableVideo}
            lessTopPadding
          />
        </TouchableOpacity>
      );
    });
  };

  // if the showAll prop was passed in as True
  if (showAll) {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
        >
          <Post
            post={post}
            navigation={navigation}
            showThread
            hideButtons={hideButtons}
            showDetails={showDetails}
            disableVideo={disableVideo}
            showTopBorder={showTopBorder}
            showRepost={showRepost}
          />
        </TouchableOpacity>
        {post.updates.length > 0 && renderAllUpdates()}
      </>
    );
  }

  // if an updateInd is provided (probably means we're on the create comment screen)
  if (updateInd === 0 || updateInd) {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
        >
          <Post
            post={post}
            navigation={navigation}
            showThread
            hideButtons={hideButtons}
            showDetails={showDetails}
            disableVideo={disableVideo}
            showTopBorder={showTopBorder}
            showRepost={showRepost}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
        >
          <Update
            post={post}
            update={post.updates[updateInd]}
            updateInd={updateInd}
            navigation={navigation}
            hideButtons={hideButtons}
            disableVideo={disableVideo}
            showThread
            lessTopPadding
          />
        </TouchableOpacity>
      </>
    );
  }

  // if there are no updates - just show the post
  if (!hasUpdates) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
      >
        <Post
          post={post}
          navigation={navigation}
          showThread={showLastLine}
          hideButtons={hideButtons}
          showDetails={showDetails}
          disableVideo={disableVideo}
          showTopBorder={showTopBorder}
          showRepost={showRepost}
        />
      </TouchableOpacity>
    );
  }

  // if there are updates

  // if there is only one update - show it
  if (post.updates.length === 1) {
    return (
      <View style={{ borderBottomColor: colors.borderBlack, borderBottomWidth: StyleSheet.hairlineWidth }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
        >
          <Post
            post={post}
            navigation={navigation}
            showThread
            hideButtons={hideButtons}
            showDetails={showDetails}
            disableVideo={disableVideo}
            showTopBorder={showTopBorder}
            showRepost={showRepost}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
        >
          <Update
            post={post}
            update={post.updates[0]}
            updateInd={0}
            navigation={navigation}
            hideButtons={hideButtons}
            disableVideo
            lessTopPadding
          />
        </TouchableOpacity>
      </View>
    );
  }

  // if there is multiple updates - show latest one w/ "show more" button
  return (
    <View style={{ borderBottomColor: colors.borderBlack, borderBottomWidth: StyleSheet.hairlineWidth }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
      >
        <Post
          post={post}
          navigation={navigation}
          showThread
          hideButtons={hideButtons}
          showDetails={showDetails}
          disableVideo={disableVideo}
          showTopBorder={showTopBorder}
          showRepost={showRepost}
        />
      </TouchableOpacity>
      <ShowUpdatesButton navigation={navigation} post={post} />
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate({ name: 'Post', key: `Post:${post.id}`, params: { post } })}
      >
        <Update
          post={post}
          update={post.updates[post.updates.length - 1]}
          updateInd={post.updates.length - 1}
          navigation={navigation}
          hideButtons={hideButtons}
          disableVideo
          lessTopPadding
        />
      </TouchableOpacity>
    </View>
  );
}

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  if (prevProps.post === nextProps.posts) return true;

  return false;
}

export default React.memo(PostGroupTL, areEqual);
