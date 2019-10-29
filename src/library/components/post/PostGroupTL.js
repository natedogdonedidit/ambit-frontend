import React, { useState, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Post from 'library/components/post/Post';
import Update from 'library/components/post/Update';
import ThreadLine from 'library/components/UI/ThreadLine';

const PostGroupTL = ({
  navigation,
  currentTime,
  post,
  showAll = false,
  lastOne,
  showLastLine = false,
  editable = false,
  hideButtons = false,
  setModalVisibleEditPost,
  setPostToEdit,
  showDetails = false,
}) => {
  // const [showAll, setShowMore] = useState(false);

  // if (post.id === 'ck0zm1lcv40ka0b40x4qk2ol2') console.log(post);

  const hasUpdates = post.updates.length > 0;

  // if there are no updates
  if (!hasUpdates) {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post, isUpdate: false })}>
          <Post
            post={post}
            currentTime={currentTime}
            navigation={navigation}
            editable={editable}
            showLine={showLastLine}
            setModalVisibleEditPost={setModalVisibleEditPost}
            setPostToEdit={setPostToEdit}
            hideButtons={hideButtons}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // if there are updates
  const numUpdates = post.updates.length;
  const multipleUpdates = numUpdates > 1;

  // if there is only one update
  if (!multipleUpdates) {
    return (
      <>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post, isUpdate: false })}>
          <Post
            post={post}
            currentTime={currentTime}
            navigation={navigation}
            showLine
            setModalVisibleEditPost={setModalVisibleEditPost}
            setPostToEdit={setPostToEdit}
            editable={editable}
            hideButtons={hideButtons}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post, isUpdate: true, updateInd: 0 })}>
          {/* <ThreadLine /> */}
          <Update
            post={post}
            update={post.updates[0]}
            currentTime={currentTime}
            navigation={navigation}
            showLine={showLastLine}
            hideButtons={hideButtons}
            showDetails={showDetails}
            updateInd={0}
          />
        </TouchableOpacity>
      </>
    );
  }

  // if there are multiple updates
  const renderUpdates = () => {
    if (showAll) {
      return post.updates.map((update, i) => {
        return (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Post', { post, isUpdate: true, updateInd: i })}
          >
            {/* <ThreadLine /> */}
            <Update
              post={post}
              update={update}
              currentTime={currentTime}
              navigation={navigation}
              showLine={i !== numUpdates - 1 || showLastLine}
              hideButtons={hideButtons}
              updateInd={i}
            />
          </TouchableOpacity>
        );
      });
    }

    // if a last indice was specified, only render those
    if (lastOne >= 0) {
      return post.updates.map((update, i) => {
        if (i <= lastOne) {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Post', { post, isUpdate: true, updateInd: i })}
            >
              {/* <ThreadLine /> */}
              <Update
                post={post}
                update={update}
                currentTime={currentTime}
                navigation={navigation}
                showLine={i !== lastOne}
                hideButtons={hideButtons}
                showDetails={i === lastOne}
                updateInd={i}
              />
            </TouchableOpacity>
          );
        }
        return null;
      });
    }

    // otherwise only show the most recent Update (with broken threadline)
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Post', { post, isUpdate: true, updateInd: numUpdates - 1 })}
        >
          {/* <ThreadLine broke /> */}
          <Update
            post={post}
            update={post.updates[numUpdates - 1]}
            currentTime={currentTime}
            navigation={navigation}
            hideButtons={hideButtons}
            updateInd={numUpdates - 1}
          />
        </TouchableOpacity>
      </>
    );
  };

  // if there are multiple updates
  return (
    <>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Post', { post, isUpdate: false })}>
        <Post
          post={post}
          currentTime={currentTime}
          navigation={navigation}
          showLine
          broke={!showAll && !lastOne}
          setModalVisibleEditPost={setModalVisibleEditPost}
          setPostToEdit={setPostToEdit}
          editable={editable}
          hideButtons={hideButtons}
        />
      </TouchableOpacity>
      {renderUpdates()}
    </>
  );
};

const styles = StyleSheet.create({});

export default PostGroupTL;
