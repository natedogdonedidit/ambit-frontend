/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBack from 'library/components/headers/HeaderBack';
import SINGLE_USER_FOLLOW_LIST from 'library/queries/SINGLE_USER_FOLLOW_LIST';

import Loader from 'library/components/UI/Loader';
import Error from 'library/components/UI/Error';
import UserListItem from 'library/components/lists/UserListItem';
import { useNavigation } from '@react-navigation/native';

const FollowingScreen = ({ route }) => {
  const { username, followingCount } = route.params;
  const navigation = useNavigation();

  // QUERIES
  const { error, data, refetch, networkStatus } = useQuery(SINGLE_USER_FOLLOW_LIST, {
    variables: { where: { username } },
    notifyOnNetworkStatusChange: true,
  });
  // useEffect(() => {
  //   refetch();
  // }, [followingCount]);

  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;
  const ok = networkStatus === 7;

  if (error) return <Error error={error} />;
  if (loading) {
    return (
      <View style={{ ...styles.container }}>
        <HeaderBack handleRight={() => null} title="Following" navigation={navigation} />
        <Loader loading={loading} size="small" full={false} backgroundColor={colors.lightGray} />
      </View>
    );
  }

  const { user } = data;

  return (
    <View style={{ ...styles.container }}>
      <HeaderBack handleRight={() => null} title="Following" navigation={navigation} />
      <FlatList
        onRefresh={refetch}
        refreshing={refetching}
        initialNumToRender={20} // speeds up load time
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={
          <View
            style={[
              { height: 15 },
              user.following.length > 0 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.borderBlack,
              },
            ]}
          />
        }
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>Not following anybody</Text>
        }
        data={user.following}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          // console.log(item);
          return <UserListItem navigation={navigation} user={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flatList: {
    backgroundColor: colors.lightGray,
    flex: 1,
    width: '100%',
  },
  flatListContainer: {
    paddingBottom: 20,
    backgroundColor: colors.lightGray,
  },
});

export default FollowingScreen;
