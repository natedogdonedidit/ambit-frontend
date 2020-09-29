import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import { useQuery } from '@apollo/client';

// user is from SINGLE_USER_BASIC
const FollowStatsDrawer = ({ username, navigation }) => {
  // const [followingCount, setFollowingCount] = useState(user.followingCount);
  // const [followersCount, setFollowersCount] = useState(user.followersCount);

  // QUERIES
  const { loading, error, data, refetch } = useQuery(SINGLE_USER_BIO, {
    variables: { where: { username } },
  });

  const followersCount = data && data.user ? data.user.followersCount || 0 : 0;
  const followingCount = data && data.user ? data.user.followingCount || 0 : 0;

  // sync state with SINGLE_USER_QUERY
  // useEffect(() => {
  //   setFollowingCount(user.followingCount);
  // }, [user.followingCount]);

  // // sync state with SINGLE_USER_QUERY
  // useEffect(() => {
  //   setFollowersCount(user.followersCount);
  // }, [user.followersCount]);

  return (
    <View style={styles.stats}>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate('Followers', { username, followersCount })}
      >
        <Text style={{ ...defaultStyles.largeSemibold, marginRight: 5, marginLeft: 0, color: colors.iosBlue }}>
          {followersCount}
        </Text>
        <Text style={{ ...defaultStyles.largeMute, marginRight: 20 }}>Followers</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => navigation.navigate('Following', { username, followingCount })}
      >
        <Text style={{ ...defaultStyles.largeSemibold, marginRight: 5, marginLeft: 0, color: colors.iosBlue }}>
          {followingCount}
        </Text>
        <Text style={{ ...defaultStyles.largeMute, marginRight: 10 }}>Following</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FollowStatsDrawer;

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginTop: 2,
    marginBottom: 15,
    paddingTop: 2,
  },
});
