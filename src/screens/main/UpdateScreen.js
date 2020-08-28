import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import HeaderBack from 'library/components/headers/HeaderBack';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import Post from 'library/components/post/Post';
import Update from 'library/components/post/Update';
import PostComments from 'library/components/post/PostComments';

const UpdateScreen = ({ navigation, route }) => {
  // PARAMS
  const { updatePassedIn } = route.params;

  if (!updatePassedIn) {
    navigation.goBack();
    return null;
  }

  // QUERIES - this gets the comments for a POST
  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { where: { id: updatePassedIn.parentPost.id } },
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
  const post = data.post || null;

  if (!post) {
    navigation.goBack();
    return null;
  }

  const update = post.updates.find((u) => u.id === updatePassedIn.id);

  if (!update) {
    navigation.goBack();
    return null;
  }

  const updateInd = post.updates.findIndex((u) => u.id === updatePassedIn.id);

  // CUSTOM FUNCTIONS
  const renderUpdate = () => {
    return (
      <View
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: colors.borderBlack,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.borderBlack,
        }}
      >
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="Update" />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20, marginTop: 10 }}>
        {renderUpdate()}
        <PostComments navigation={navigation} post={post} updateInd={updateInd} />
      </ScrollView>
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
});

export default UpdateScreen;
