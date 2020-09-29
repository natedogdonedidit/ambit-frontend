import React, { useMemo, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import POST_RETWEETS_QUERY from 'library/queries/POST_RETWEETS_QUERY';
import CURRENT_USER_FOLLOWING from 'library/queries/CURRENT_USER_FOLLOWING';

const RepostedBy = ({ postId }) => {
  // 1. get current user's network from cache
  const { data: dataFollowing } = useQuery(CURRENT_USER_FOLLOWING);
  const network = useMemo(() => {
    if (dataFollowing && dataFollowing.iFollow) {
      return [...dataFollowing.iFollow];
    }

    return [];
  }, [dataFollowing]);

  const [getReposts, { loading, error, data }] = useLazyQuery(POST_RETWEETS_QUERY, {
    variables: {
      where: { id: postId },
      network,
    },
  });

  // 2. everytime network changes - check to see who from your network re-tweeted this
  useEffect(() => {
    getReposts();
  }, [network]);

  // if (loading || error || !data) return null;
  // console.log(data.post.reposts);

  if (data && data.post && data.post.reposts && data.post.reposts.length > 0) {
    // if reposted by 1 person
    return (
      <View style={styles.container}>
        <Ionicons name="repeat-outline" size={12} color={colors.blueGray} />
        <Text style={{ ...defaultStyles.smallMute, paddingLeft: 5 }}>Re-posted by {data.post.reposts[0].username}</Text>
      </View>
    );
    // if reposted by multiple people
  }

  // if nobody from your network retweeted
  return null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 58,
    paddingBottom: 5,
  },
});

export default RepostedBy;
