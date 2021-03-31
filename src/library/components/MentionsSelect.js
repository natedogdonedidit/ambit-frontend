import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import { useQuery } from '@apollo/client';
import USERS_QUERY from 'library/queries/USERS_QUERY';
import ProfilePic from 'library/components/UI/ProfilePic';

const MentionsSelect = ({ mentionText, handleMentionSelect }) => {
  const [searchResults, setSearchResults] = useState([]);

  const { loading, error, data } = useQuery(USERS_QUERY, {
    variables: {
      first: 10,
      where: {
        OR: [
          { username: { startsWith: mentionText, mode: 'insensitive' } },
          { name: { startsWith: mentionText, mode: 'insensitive' } },
        ],
      },
    },
  });

  useEffect(() => {
    if (!loading) {
      if (data && data.users) {
        setSearchResults(data.users);
      } else {
        setSearchResults([]);
      }
    }
  }, [data, loading, error]);

  if (error || !mentionText) return <View />;

  if (searchResults.length > 0) {
    const renderMentions = () => {
      return searchResults.map((user) => {
        return (
          <TouchableOpacity
            key={user.id}
            style={styles.mention}
            activeOpacity={0.7}
            onPress={() => handleMentionSelect(user.username)}
          >
            <ProfilePic size="xsmall" user={user} enableIntro={false} enableStory={false} enableClick={false} />
            <Text style={{ ...defaultStyles.defaultMedium, paddingLeft: 10 }}>
              {user.name}
              <Text style={{ ...defaultStyles.defaultMute, paddingLeft: 5 }}> @{user.username}</Text>
            </Text>
          </TouchableOpacity>
        );
      });
    };

    return <View style={styles.container}>{renderMentions()}</View>;
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    maxHeight: 120,
    paddingHorizontal: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  mention: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    // backgroundColor: 'pink',
  },
});

export default MentionsSelect;
