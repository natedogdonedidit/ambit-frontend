import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';

import Post from 'library/components/post/Post';
import Update from 'library/components/post/Update';

const PostGroupTL = ({
  navigation,
  currentTime,
  post,
  showLastLine = false,
  hideButtons = false,
  hideTopLine = false,
  showDetails = false,
  updateInd = null,
  showAll = false,
  disableVideo = false,
}) => {
  const hasUpdates = post.updates.length > 0;

  const renderAllUpdates = () => {
    return post.updates.map((update, i) => {
      let showLine = false;
      if (i !== post.updates.length - 1) showLine = true;
      if (i === post.updates.length - 1 && showLastLine) showLine = true;
      return (
        <TouchableOpacity key={update.id} activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
          <Update
            post={post}
            update={update}
            updateInd={i}
            currentTime={currentTime}
            navigation={navigation}
            hideButtons={hideButtons}
            showLine={showLine}
            hideTopLine={hideTopLine}
            disableVideo={disableVideo}
          />
        </TouchableOpacity>
      );
    });
  };

  // if the showAll prop was passed in as True
  if (showAll) {
    return (
      <>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
          <Post
            post={post}
            currentTime={currentTime}
            navigation={navigation}
            showLine
            hideButtons={hideButtons}
            showDetails={showDetails}
            disableVideo={disableVideo}
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
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
          <Post
            post={post}
            currentTime={currentTime}
            navigation={navigation}
            showLine
            hideButtons={hideButtons}
            showDetails={showDetails}
            disableVideo={disableVideo}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
          <Update
            post={post}
            update={post.updates[updateInd]}
            updateInd={updateInd}
            currentTime={currentTime}
            navigation={navigation}
            hideButtons={hideButtons}
            hideTopLine={hideTopLine}
            disableVideo={disableVideo}
            showLine
          />
        </TouchableOpacity>
      </>
    );
  }

  // if there are no updates
  if (!hasUpdates) {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
        <Post
          post={post}
          currentTime={currentTime}
          navigation={navigation}
          showLine={showLastLine}
          hideButtons={hideButtons}
          showDetails={showDetails}
          disableVideo={disableVideo}
        />
      </TouchableOpacity>
    );
  }

  // if there are updates, show latest one
  // return (
  //   <View style={{ borderBottomColor: colors.borderBlack, borderBottomWidth: StyleSheet.hairlineWidth }}>
  //     <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
  //       <Post
  //         post={post}
  //         currentTime={currentTime}
  //         navigation={navigation}
  //         showLine
  //         hideButtons={hideButtons}
  //         showDetails={showDetails}
  //         disableVideo={disableVideo}
  //       />
  //     </TouchableOpacity>
  //     <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
  //       <Update
  //         post={post}
  //         update={post.updates[post.updates.length - 1]}
  //         updateInd={post.updates.length - 1}
  //         currentTime={currentTime}
  //         navigation={navigation}
  //         hideButtons={hideButtons}
  //         hideTopLine
  //         disableVideo
  //       />
  //     </TouchableOpacity>
  //   </View>
  // );
  return (
    <>
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
        <Post
          post={post}
          currentTime={currentTime}
          navigation={navigation}
          showLine
          hideButtons={hideButtons}
          showDetails={showDetails}
          disableVideo={disableVideo}
        />
        <View style={styles.showLatestButton}>
          <View style={styles.leftColumn}>
            <ProfilePic size="small" user={post.owner} navigation={navigation} disableVideo />
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Post', { post })} style={styles.rightColumn}>
            <Text style={{ ...defaultStyles.largeRegular, color: colors.iosBlue }}>
              Show {post.updates.length} update{post.updates.length > 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  showLatestButton: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    paddingBottom: 6,
    paddingRight: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  leftColumn: {
    alignItems: 'center',
    paddingLeft: 4,
    width: 76,
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    // paddingLeft: 8,
  },
});

export default PostGroupTL;
