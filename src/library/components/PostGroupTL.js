import React, { useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';
import SmallProfilePic from 'library/components/UI/SmallProfilePic';

import Post from 'library/components/Post';
import Update from 'library/components/Update';

const PostGroupTL = ({ navigation, currentTime, post }) => {
  const [showAll, setShowMore] = useState(false);

  const hasUpdates = !!post.updates;

  // if there are no updates
  if (!hasUpdates) {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post })}>
          <Post post={post} currentTime={currentTime} navigation={navigation} />
        </TouchableOpacity>
      </View>
    );
  }

  // if there are updates
  const numUpdates = post.updates.length;
  const multipleUpdates = numUpdates > 1;

  // if there is 1 update only
  if (!multipleUpdates) {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post })}>
          <Post post={post} currentTime={currentTime} navigation={navigation} showLine />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Post', { post, isUpdate: true, whichUpdate: post.updates[0].id })}
        >
          <Update post={post} update={post.updates[0]} currentTime={currentTime} navigation={navigation} />
        </TouchableOpacity>
      </View>
    );
  }

  const renderUpdates = () => {
    if (showAll) {
      return post.updates.map((update, i) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Post', { post, isUpdate: true, whichUpdate: update.id })}
          >
            <Update
              post={post}
              update={update}
              currentTime={currentTime}
              navigation={navigation}
              showLine={i !== numUpdates - 1}
            />
          </TouchableOpacity>
        );
      });
    }

    return (
      <>
        {/* <View style={styles.showMoreButton}>
          <View style={styles.leftColumn}>
            <View style={styles.threadLine} />
            <View style={{ paddingVertical: 5 }}>
              <SmallProfilePic pic={post.owner.profilePic} />
            </View>

            <View style={styles.threadLine} />
          </View>
          <View style={styles.rightColumn}>
            <TextButton onPress={() => setShowMore(true)}>Show more updates</TextButton>
          </View>
        </View> */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Post', { post, isUpdate: true, whichUpdate: post.updates[numUpdates - 1].id })}
        >
          <Update post={post} update={post.updates[numUpdates - 1]} currentTime={currentTime} navigation={navigation} />
        </TouchableOpacity>
      </>
    );
  };

  // if there are multiple updates
  return (
    <View>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post })}>
        <Post post={post} currentTime={currentTime} navigation={navigation} showLine />
      </TouchableOpacity>
      {renderUpdates()}
    </View>
  );
};

const styles = StyleSheet.create({
  showMoreButton: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    // height: 40,
  },
  threadLine: {
    flex: 1,
    width: 5,
    // borderRadius: 3,
    backgroundColor: 'black',
    opacity: 0.2,
  },
  leftColumn: {
    alignItems: 'center',
    width: 64,
    height: '100%',
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingRight: 15,
    // paddingVertical: 10,
  },
});

export default PostGroupTL;
