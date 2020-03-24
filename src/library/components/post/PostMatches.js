import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import POST_MATCHES_QUERY from 'library/queries/POST_MATCHES_QUERY';

import SuggestedConnection from 'library/components/lists/SuggestedConnection';
import TextButton from 'library/components/UI/buttons/TextButton';
import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';

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

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={defaultStyles.headerSmall}>Matches</Text>
        {matches.length > 3 && (
          <TextButton textStyle={styles.editButton} onPress={() => navigation.navigate('PostMatches', { matches })}>
            Show All
          </TextButton>
        )}
      </View>
      {matches.map((item, i) => {
        if (i > 2) return null;
        return (
          <View key={item.user.id}>
            <SuggestedConnection item={item} navigation={navigation} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
