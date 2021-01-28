import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import Update from 'library/components/post/Update';
import Section from 'library/components/UI/Section';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import ButtonSmall from 'library/components/UI/buttons/ButtonSmall';
import TextButton from 'library/components/UI/buttons/TextButton';

const PostUpdates = ({ navigation, post, currentTime, isMyPost }) => {
  if (isMyPost && post.updates.length < 1) {
    return (
      <Section text="Updates">
        <View style={styles.emptyComponent}>
          <Text style={{ ...defaultStyles.defaultText, paddingBottom: 10 }}>Post updates along your journey!</Text>
          <ButtonDefault onPress={() => navigation.navigate('AddUpdateModal', { post })}>Add an update</ButtonDefault>
        </View>
      </Section>
    );
  }

  if (post.updates.length < 1) {
    return null;
  }

  return (
    <Section
      text="Updates"
      // rightComponent={<TextButton onPress={() => navigation.navigate('AddUpdateModal', { post })}>New</TextButton>}
      rightComponent={
        isMyPost && (
          <View style={{ position: 'absolute', top: 0, bottom: 0, right: 12, alignItems: 'center', justifyContent: 'center' }}>
            <ButtonSmall onPress={() => navigation.navigate('AddUpdateModal', { post })}>New</ButtonSmall>
          </View>
        )
      }
    >
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

const styles = StyleSheet.create({
  // container: {
  //   width: '100%',
  // },
  // loaderView: {
  //   backgroundColor: colors.white,
  //   borderTopWidth: StyleSheet.hairlineWidth,
  //   borderTopColor: colors.borderBlack,
  //   height: 60,
  // },
  // emptyComponent: {
  //   backgroundColor: colors.white,
  //   padding: 16,
  //   borderTopWidth: StyleSheet.hairlineWidth,
  //   borderTopColor: colors.borderBlack,
  // },
  emptyComponent: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,

    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
});
