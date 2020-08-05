import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POST_MATCHES_QUERY from 'library/queries/POST_MATCHES_QUERY';

import SuggestedConnection from 'library/components/lists/SuggestedConnection';
import TextButton from 'library/components/UI/buttons/TextButton';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import { getTopicFromID } from 'library/utils';

const PostMatches = ({ navigation, post }) => {
  // QUERIES
  const { loading, error, data } = useQuery(POST_MATCHES_QUERY, {
    variables: { id: post.id },
  });

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={defaultStyles.headerSmall}>Matches</Text>
        </View>
        <View style={styles.whiteView}>
          <Loader size="small" loading={loading} full backgroundColor={colors.white} />
        </View>
      </View>
    );
  }

  const matches = data.singlePostMatches || null;

  if (!matches) return null;

  if (matches.length < 1) {
    return (
      <View style={styles.emptyComponent}>
        <Text style={{ ...defaultStyles.defaultMuteItalic, textAlign: 'center' }}>No matches yet...check back later!</Text>
      </View>
    );
  }

  const renderReason = () => {
    // need goal and subfield
    const { goal, subField } = post;
    const { name } = getTopicFromID(subField.topicID);

    if (goal === 'Find Investors' && name) {
      return (
        <Text style={{ ...defaultStyles.defaultMute, paddingTop: 4, paddingRight: 15 }}>
          People interested in investing in <Text style={{ ...defaultStyles.defaultSemibold, color: colors.green }}>{name}</Text>
        </Text>
      );
    }
    if (goal === 'Find Freelancers' && name) {
      return (
        <Text style={{ ...defaultStyles.defaultMute, paddingTop: 4, paddingRight: 15 }}>
          People open to freelance for <Text style={{ ...defaultStyles.defaultSemibold, color: colors.peach }}>{name}</Text>
        </Text>
      );
    }
    if (goal === 'Find Mentors' && name) {
      return (
        <Text style={{ ...defaultStyles.defaultMute, paddingTop: 4, paddingRight: 15 }}>
          People open to mentor others in <Text style={{ ...defaultStyles.defaultSemibold, color: colors.purp }}>{name}</Text>
        </Text>
      );
    }

    return null;
  };

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={defaultStyles.hugeHeavy}>Matches</Text>
        {renderReason()}
      </View>
      {matches.map((user) => {
        return (
          <View key={user.id}>
            <SuggestedConnection user={user} navigation={navigation} />
          </View>
        );
      })}
    </>
  );
};

export default PostMatches;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  sectionHeader: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  emptyComponent: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    padding: 16,
  },
  whiteView: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    height: 60,
  },
});
