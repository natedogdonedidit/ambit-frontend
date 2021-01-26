import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import SINGLE_POST_QUERY from 'library/queries/SINGLE_POST_QUERY';
import ProfilePic from 'library/components/UI/ProfilePic';
import { getTopicFromID } from 'library/utils';

const SharedTopic = ({ topicID, navigation }) => {
  const { name, image } = getTopicFromID(topicID);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={() => navigation.navigate({ name: 'Topic', key: `Topic:${topicID}`, params: { topicID } })}
    >
      {!!image && (
        <View style={styles.top}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
              }}
              resizeMode="cover"
              source={{
                uri: image,
              }}
            />
          </View>
        </View>
      )}
      <View>
        <Text numberOfLines={6} style={defaultStyles.hugeSemibold}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    maxWidth: '60%',
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

export default SharedTopic;
