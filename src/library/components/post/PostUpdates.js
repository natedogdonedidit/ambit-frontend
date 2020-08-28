import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Update from 'library/components/post/Update';
import Section from 'library/components/UI/Section';

const PostUpdates = ({ navigation, post, currentTime }) => {
  if (post.updates.length < 1) return null;

  return (
    <Section text="Updates">
      {post.updates.map((update, i) => {
        return (
          <TouchableOpacity
            key={update.id}
            activeOpacity={1}
            onPress={() => {
              navigation.navigate('Update', { updatePassedIn: update });
            }}
          >
            <Update post={post} update={update} updateInd={i} currentTime={currentTime} navigation={navigation} />
          </TouchableOpacity>
        );
      })}
    </Section>
  );
};

export default PostUpdates;

const styles = StyleSheet.create({});
