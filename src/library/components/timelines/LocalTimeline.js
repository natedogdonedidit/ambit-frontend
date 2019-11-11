import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, FlatList } from 'react-native';
import { useQuery } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import LOCAL_POSTS_QUERY from 'library/queries/LOCAL_POSTS_QUERY';
import TextButton from 'library/components/UI/TextButton';

import PostGroupTL from 'library/components/post/PostGroupTL';

const LocalTimeline = ({ requestRefresh, setRequestRefresh, refreshing, setRefreshing, userLoggedIn, navigation }) => {
  const [locationLat, setLocationLat] = useState(userLoggedIn.locationLat || 37.77713);
  const [locationLon, setLocationLon] = useState(userLoggedIn.locationLon || -122.41964);
  const [location, setLocation] = useState(userLoggedIn.location || 'San Francisco, CA');
  const [radius, setRadius] = useState('50');
  const [locModalVisible, setLocModalVisible] = useState(false);

  useEffect(() => {
    if (requestRefresh) {
      refetch();
      setRequestRefresh(false);
    }
  }, [requestRefresh]);

  // QUERIES
  const { loading, error, data, refetch } = useQuery(LOCAL_POSTS_QUERY, {
    variables: {
      lat: locationLat,
      lon: locationLon,
      radius: parseInt(radius, 10),
    },
    fetchPolicy: 'cache-and-network',
  });

  const currentTime = new Date();

  if (loading) {
    setRefreshing(true);
  }
  if (!loading && !requestRefresh && refreshing) {
    setRefreshing(false);
  }

  if (error) {
    console.log('ERROR LOADING POSTS:', error.message);
    return (
      <View style={styles.timeline}>
        <Text style={{ textAlign: 'center', width: '100%', color: 'red' }}>Error loading posts</Text>
      </View>
    );
  }

  const posts = data.postsLocal || [];
  const noPosts = posts.length < 1 && !loading;

  // must pass this to location modal
  const handleLocationSelect = locObject => {
    if (locObject) {
      setLocation(locObject.location);
      setLocationLat(locObject.locationLat);
      setLocationLon(locObject.locationLon);
    }
  };

  return (
    <>
      <View style={styles.locationSelect}>
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

      {!noPosts && (
        <FlatList
          style={styles.timeline}
          data={posts}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            return <PostGroupTL post={item} currentTime={currentTime} navigation={navigation} />;
          }}
        />
      )}

      {noPosts && (
        <View style={{ height: 100, width: '100%', alignItems: 'center', marginVertical: 40 }}>
          <Text style={defaultStyles.defaultText}>No posts in this area</Text>
        </View>
      )}

      {/* <EditLocationRadiusModal
        locModalVisible={locModalVisible}
        setLocModalVisible={setLocModalVisible}
        location={location}
        setLocation={setLocation}
        locationLat={locationLat}
        setLocationLat={setLocationLat}
        locationLon={locationLon}
        setLocationLon={setLocationLon}
        radius={radius}
        setRadius={setRadius}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: colors.lightGray,
    // marginTop: 10,
    // height: 500,
  },
  locationSelect: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: 'white',
    marginTop: 13,
    // marginBottom: -3,
    // marginHorizontal: 6,
    borderRadius: 3,
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
