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
        const showLine = post.updates.length > 1 && i < post.updates.length - 1;
        const hideTopLine = post.updates.length > 1 && i > 0;

        return (
          <TouchableOpacity
            key={update.id}
            activeOpacity={1}
            onPress={() => {
              navigation.navigate({
                name: 'Update',
                key: `Update:${update.id}`,
                params: { updatePassedIn: update },
              });
            }}
          >
            <Update
              post={post}
              update={update}
              updateInd={i}
              currentTime={currentTime}
              navigation={navigation}
              showLine={showLine}
              hideTopLine={hideTopLine}
            />
          </TouchableOpacity>
        );
      })}
    </Section>
  );
};

export default PostUpdates;

const styles = StyleSheet.create({});
