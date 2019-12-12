import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StatusBar,
  FlatList,
  Animated,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';
import TextButton from 'library/components/UI/TextButton';
import Loader from 'library/components/UI/Loader';

import PostGroupTL from 'library/components/post/PostGroupTL';

const LocalTimeline = ({ userLoggedIn, navigation, scrollY, paddingTop }) => {
  const [locationLat, setLocationLat] = useState(userLoggedIn.locationLat || 37.77713);
  const [locationLon, setLocationLon] = useState(userLoggedIn.locationLon || -122.41964);
  const [location, setLocation] = useState(userLoggedIn.location || 'San Francisco, CA');
  const [radius, setRadius] = useState('50');

  const currentTime = new Date();

  // QUERIES
  const { loading: loadingQuery, error, data, refetch, fetchMore, networkStatus } = useQuery(LOCAL_POSTS_QUERY, {
    // fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables: {
      lat: locationLat,
      lon: locationLon,
      radius: parseInt(radius, 10),
    },
  });

  // networkStatus states:
  // 1: loading
  // 2: setVariables called (changed one of the variables)
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  // console.log('loading', loadingQuery);
  // console.log('error', error);
  // console.log('data', data);
  // console.log('networkStatus', networkStatus);

  // ///////////////////
  // LOADING STATES
  // ///////////////////
  const refetching = networkStatus === 4;
  const loading = networkStatus === 1 || networkStatus === 2;
  const ok = networkStatus === 7;

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  if (!data || loading) {
    return <Loader backgroundColor={colors.lightGray} />;
  }

  const posts = data.postsLocal.edges || [];
  // const noPosts = posts.length < 1 && ok;
  // console.log('posts', posts);

  // ////////////////////////
  // CUSTOM FUNCTIONS
  // ////////////////////////

  const onRefresh = () => {
    // console.log('running refetch');
    refetch();
  };

  // must pass this to location modal
  const handleLocationSelect = locObject => {
    if (locObject) {
      setLocation(locObject.location);
      setLocationLat(locObject.locationLat);
      setLocationLon(locObject.locationLon);
    }
  };

  // ////////////////////////
  // RENDER
  // ////////////////////////

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={refetching}
        // initialNumToRender={10} // speeds up load time
        contentContainerStyle={{ paddingTop: paddingTop + 2.5, paddingBottom: 20 }}
        ListHeaderComponent={
          <View style={{ ...styles.locationSelect }}>
            <View style={styles.leftColumn}>
              <Icon name="map-marker-alt" size={15} color={colors.iconGray} style={{ opacity: 0.3 }} />
            </View>
            <View style={styles.rightColumn}>
              <Text style={defaultStyles.defaultMedium}>{location}</Text>
              <Text style={defaultStyles.smallMute}>within {radius} mile radius</Text>
            </View>
            <View style={styles.editButton}>
              <TextButton
                onPress={() =>
                  navigation.navigate('EditLocationRadiusModal', {
                    initialLocation: location,
                    handleLocationSelect,
                    radius,
                    setRadius,
                  })
                }
              >
                Change
              </TextButton>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
            Sorry, no posts yet in this area
          </Text>
        }
        style={{ ...styles.timeline }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        data={posts}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return <PostGroupTL post={item.node} currentTime={currentTime} navigation={navigation} />;
        }}
        onEndReachedThreshold={1.2}
        onEndReached={info => {
          // console.log('onEndReached triggered', info);
          // sometimes triggers on distanceToEnd -598 on initial render. Could add this check to if statment
          if (data.postsLocal.pageInfo.hasNextPage && networkStatus === 7 && info.distanceFromEnd > -300) {
            // console.log('fetching more');
            fetchMore({
              query: LOCAL_POSTS_QUERY,
              variables: {
                cursor: data.postsLocal.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                // console.log('prev', previousResult);
                // console.log('fetched', fetchMoreResult);

                const newEdges = fetchMoreResult.postsLocal.edges;
                const { pageInfo } = fetchMoreResult.postsLocal;

                return newEdges.length
                  ? {
                      postsLocal: {
                        __typename: previousResult.postsLocal.__typename,
                        edges: [...previousResult.postsLocal.edges, ...newEdges],
                        pageInfo,
                      },
                    }
                  : previousResult;
              },
            });
          }
        }}
      />
      {/* This is the loading animation */}
      <Animated.View
        style={{
          position: 'absolute',
          top: -400,
          left: 0,
          width: '100%',
          height: paddingTop + 7 + 400,
          // backgroundColor: colors.purp,
          justifyContent: 'flex-end',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-800, 0],
                outputRange: [800, 0],
                extrapolate: 'clamp',
              }),
              // scale: scrollY.interpolate({
              //   inputRange: [-1000, 0],
              //   outputRange: [23, 1],
              //   extrapolate: 'clamp',
              // }),
            },
          ],
          // opacity: scrollY.interpolate({
          //   inputRange: [-400, 0],
          //   outputRange: [1, 0],
          //   extrapolate: 'clamp',
          // }),
        }}
      >
        <View style={{ width: '100%', height: 60 }}>
          <ActivityIndicator
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
            }}
            size="small"
            color={colors.purp}
            animating={refetching}
          />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: colors.lightGray,
    flex: 1,
  },
  locationSelect: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: 'white',
    marginTop: 5,
  },
  leftColumn: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingRight: 10,
  },
  editButton: {
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocalTimeline;
