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
}) => {
  const hasUpdates = post.updates.length > 0;

  const renderAllUpdates = () => {
    return post.updates.map((update, i) => {
      let showLine = false;
      if (i !== post.updates.length - 1) showLine = true;
      if (i === post.updates.length - 1 && showLastLine) showLine = true;
      return (
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
          <Update
            post={post}
            update={update}
            updateInd={i}
            currentTime={currentTime}
            navigation={navigation}
            hideButtons={hideButtons}
            showLine={showLine}
            hideTopLine={hideTopLine}
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
        />
      </TouchableOpacity>
    );
  }

  // if there are updates
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
        />
        <View style={styles.post}>
          <View style={styles.leftColumn}>
            <ProfilePic user={post.owner} navigation={navigation} disableVideo size={30} />
          </View>
          <View style={styles.rightColumn}>
            <Text style={{ ...defaultStyles.largeRegular, color: colors.iosBlue }}>Show latest updates</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  post: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 12,
  },
  leftColumn: {
    alignItems: 'center',
    width: 48,
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 8,
  },
});

export default PostGroupTL;
