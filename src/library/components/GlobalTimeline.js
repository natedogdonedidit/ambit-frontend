import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-apollo';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';

import Loader from 'library/components/UI/Loader';
import PostGroupTL from 'library/components/PostGroupTL';

const GlobalTimeline = ({ requestRefresh, setRequestRefresh, refreshing, setRefreshing, navigation }) => {
  useEffect(() => {
    if (requestRefresh) {
      refetch();
      setRequestRefresh(false);
    }
  }, [requestRefresh]);

  // QUERIES
  const { loading, error, data, refetch } = useQuery(GLOBAL_POSTS_QUERY, {
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

  const posts = data.postsGlobal || [];

  return (
    <>
      <View style={styles.tasks} />
      <FlatList
        style={styles.timeline}
        data={posts}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => {
          return <PostGroupTL post={item} currentTime={currentTime} navigation={navigation} />;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: colors.lightGray,
    marginTop: 10,
    // height: 500,
  },
  tasks: {
    height: 140,
    width: '100%',
    backgroundColor: colors.purp,
    marginTop: 15,
    borderTopColor: colors.borderBlack,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default GlobalTimeline;

// {/* <View style={{ height: BANNER_HEIGHT, paddingHorizontal: 20, paddingVertical: 15, backgroundColor: 'white' }}>
//   {/* {userLoggedIn && <Text style={{ ...defaultStyles.largeLight }}>Hello, {userLoggedIn.firstName}!</Text>} */}
//   <Text style={styles.welcomeText}>Get started in 3 simple steps.</Text>
//   <TouchableOpacity onPress={() => null}>
//     <View style={{ ...styles.taskView, ...defaultStyles.shadowButton }}>
//       <LinearGradient
//         start={{ x: 0.2, y: 0.2 }}
//         end={{ x: 1, y: 6 }}
//         colors={[colors.purp, colors.purpGradient]}
//         style={{ ...styles.linearGradient }}
//       />
//       <View>
//         <Text style={{ ...defaultStyles.largeBold, color: 'white' }}>Learn how to use{'\n'}Ambit!</Text>
//       </View>

//       <View>
//         <Text style={{ ...defaultStyles.defaultMedium, color: 'white', textAlign: 'center' }}>Step{'\n'}1/3</Text>
//       </View>
//     </View>
//   </TouchableOpacity>
// </View>; */}
