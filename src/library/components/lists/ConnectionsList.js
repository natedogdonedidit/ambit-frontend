import React from 'react';
import { StyleSheet, View, Text, Animated, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import mapTabToQuery from 'library/queries/CONNECTION_QUERIES'; // comes in as an object
import Loader from 'library/components/UI/Loader';

import SuggestedConnection from './SuggestedConnection';

const ConnectionsList = ({ activeTab, navigation, scrollY, paddingTop }) => {
  const currentTime = new Date();
  const activeQuery = mapTabToQuery(activeTab);

  // QUERIES
  const { loading: loadingQuery, error, data, refetch, fetchMore, networkStatus } = useQuery(activeQuery, {
    // fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  // networkStatus states: 1: loadin, 3: fetchMore, 4: refetch, 7: no loading, no refetch, everything OK!
  // LOADING STATES
  const refetching = networkStatus === 4;
  const loading = networkStatus === 1;
  const ok = networkStatus === 7;

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={{ ...styles.timeline, paddingTop: paddingTop + 10, paddingBottom: 20 }}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading connections</Text>
        <TouchableOpacity onPress={refetch}>
          <Text>Refetch</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!data || loading) {
    return <Loader backgroundColor={colors.lightGray} />;
  }

  const users = data.usersForYou || [];
  // console.log(users);

  // CUSTOM FUNCTIONS
  const onRefresh = () => {
    refetch();
  };

  // RENDER
  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} tintColor="transparent" />}
        onRefresh={onRefresh}
        refreshing={refetching}
        contentContainerStyle={{ paddingTop: paddingTop + 2.5, paddingBottom: 20 }}
        style={styles.timeline}
        ListEmptyComponent={
          <Text style={{ ...defaultStyles.largeMuteItalic, textAlign: 'center', paddingTop: 40 }}>
            Sorry, no suggested connections
          </Text>
        }
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
        data={users}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return <SuggestedConnection item={item} navigation={navigation} />;
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
          justifyContent: 'flex-end',
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-800, 0],
                outputRange: [800, 0],
                extrapolate: 'clamp',
              }),
            },
          ],
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
    width: '100%',
  },
});

export default ConnectionsList;
