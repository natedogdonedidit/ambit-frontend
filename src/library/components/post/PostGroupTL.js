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
  showDetails = false,
  updateInd = null,
}) => {
  const hasUpdates = post.updates.length > 0;

  // if an updateInd is provided (probably means were on the create comment screen)
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
  },
  leftColumn: {
    alignItems: 'center',
    width: 64,
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 15,
  },
});

export default PostGroupTL;
