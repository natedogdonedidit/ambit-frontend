import React from 'react';
import { TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Update from 'library/components/post/Update';
import Section from 'library/components/UI/Section';

const PostUpdates = ({ navigation, post, currentTime }) => {
  if (post.updates.length < 1) return null;

  return (
    <Section text="Updates">
      {post.updates.map((update, i) => {
        const showThread = post.updates.length > 1 && i < post.updates.length - 1;

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
              showThread={showThread}
              showTopBorder={i === 0}
              lessTopPadding={i !== 0}
            />
          </TouchableOpacity>
        );
      })}
    </Section>
  );
};

export default PostUpdates;
