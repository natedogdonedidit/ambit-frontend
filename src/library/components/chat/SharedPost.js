import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import ProfilePic from 'library/components/UI/ProfilePic';

const SharedPost = ({ message, navigation }) => {
  const { text } = message;

  // separate TYPE and ID from text
  const textSplit = text.split(':');
  const type = textSplit[0];
  const id = textSplit[1];

  const { loading, error, data } = useQuery(SINGLE_POST_QUERY, {
    variables: { where: { id } },
  });

  if (loading || error || !data) return null;

  const { post } = data;
  const { owner, content } = post;

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => navigation.navigate('Post', { post })}>
      <View style={styles.top}>
        <ProfilePic user={owner} size="small" navigation={navigation} enableIntro={false} enableStory={false} />
        <View style={{ paddingLeft: 12 }}>
          <Text style={defaultStyles.largeMedium}>{owner.name}</Text>
          <Text style={defaultStyles.largeMute}>@{owner.username}</Text>
        </View>
      </View>
      <View>
        <Text numberOfLines={6} style={defaultStyles.largeMute}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '60%',
    // backgroundColor: colors.lightLightGray,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    borderRadius: 15,
    padding: 10,
    marginVertical: 2,
  },
  top: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
});

export default SharedPost;
