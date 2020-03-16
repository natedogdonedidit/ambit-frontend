import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import HeaderBack from 'library/components/headers/HeaderBack';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import Comment from 'library/components/post/Comment';
import Post from 'library/components/post/Post';
import Update from 'library/components/post/Update';
import PostComments from 'library/components/post/PostComments';

const UpdateScreen = ({ navigation, route }) => {
  // PARAMS
  const { updatePassedIn } = route.params;

  // CONSTANTS

  // QUERIES - this gets the comments for a POST
  // this could be optimized to only retrieve comments of clicked on Post/Update
  // right now it queries ALL comments in the Post & down stream updates
  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { id: updatePassedIn.parentPost.id },
  });

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderBack navigation={navigation} title="Update" />
        <Loader loading={loading} full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }
  const currentTime = new Date();
  const post = data.singlePost || null;
  const update = post ? post.updates.find(u => u.id === updatePassedIn.id) : null;
  const updateInd = update ? post.updates.findIndex(u => u.id === updatePassedIn.id) : 0;

  // CUSTOM FUNCTIONS
  const renderUpdate = () => {
    return (
      <>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Post', { post })}>
          <Post post={post} currentTime={currentTime} navigation={navigation} showLine hideButtons />
        </TouchableOpacity>
        <Update
          post={post}
          update={update}
          updateInd={updateInd}
          currentTime={currentTime}
          navigation={navigation}
          showDetails
          hideTopLine
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="Update" />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        {renderUpdate()}
        <PostComments navigation={navigation} post={post} updateInd={updateInd} />
      </ScrollView>

      {/* <HeaderWhite handleLeft={() => navigation.goBack()} handleRight={() => null} textLeft="Back" textRight="" title="Update" />
      {loading ? (
        <Loader loading={loading} full={false} />
      ) : (
        <ScrollView style={styles.scrollView}>
          {!loading && renderUpdate()}
          {!loading && <View style={styles.commentsView}>{renderComments()}</View>}
        </ScrollView>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    backgroundColor: colors.lightGray,
  },
  commentsView: {
    width: '100%',
    marginBottom: 15,
  },
});

export default UpdateScreen;
