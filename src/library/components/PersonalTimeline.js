import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useQuery } from 'react-apollo';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GLOBAL_POSTS_QUERY from 'library/queries/GLOBAL_POSTS_QUERY';
import ALL_USERS_QUERY from 'library/queries/ALL_USERS_QUERY';
import ProfilePic from 'library/components/UI/ProfilePic';

import Loader from 'library/components/UI/Loader';
import PostGroupTL from 'library/components/PostGroupTL';

const FollowingTimeline = ({ requestRefresh, setRequestRefresh, refreshing, setRefreshing, navigation }) => {
  const taskRef = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showTasks, setShowTasks] = useState(true);
  useEffect(() => {
    if (requestRefresh) {
      refetch();
      setRequestRefresh(false);
    }
  }, [requestRefresh]);

  // QUERIES
  const { loading, error, data, refetch } = useQuery(ALL_USERS_QUERY);

  // const { loading, error, data, refetch } = useQuery(GLOBAL_POSTS_QUERY, {
  //   fetchPolicy: 'cache-and-network',
  // });

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

  // const posts = data.postsGlobal || [];

  if (loading) {
    return null;
  }

  const { users } = data;
  const posts = [];

  const tasks = [{ title: 'Learn how to use Ambit!' }, { title: 'Setup your profile' }, { title: 'View suggested connections' }];
  const sliderWidth = Dimensions.get('window').width;

  const renderTask = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: item.id })}>
        <View style={{ ...styles.userCard, ...defaultStyles.shadow6 }}>
          <ProfilePic user={item} size={70} navigation={navigation} intro={item.intro} />
          <Text style={{ ...defaultStyles.defaultMedium, width: '100%', textAlign: 'center', paddingTop: 10, paddingBottom: 15 }}>
            {item.name}
          </Text>
          <Text style={{ ...defaultStyles.defaultText, width: '100%', textAlign: 'center' }}>{item.jobTitle}</Text>
          <Text style={{ ...defaultStyles.defaultText, width: '100%', textAlign: 'center' }}>{item.location}</Text>
          <TouchableOpacity onPress={() => null}>
            <View style={styles.followButton}>
              <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Follow</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDots = () => {
    if (!data.users) return null;
    return users.map((task, i) => {
      return (
        <View
          key={i}
          style={[{ ...styles.dot }, slideIndex === i ? { backgroundColor: colors.purp } : { backgroundColor: colors.darkGrayO }]}
        />
      );
    });
  };

  return (
    <>
      {showTasks && (
        <View style={styles.tasks}>
          <Text style={{ ...defaultStyles.largeDisplay, width: '100%', textAlign: 'center' }}>Suggestions to follow</Text>
          <Carousel
            contentContainerCustomStyle={{ paddingTop: 10, paddingBottom: 15 }}
            ref={taskRef}
            data={data.users}
            renderItem={renderTask}
            sliderWidth={sliderWidth}
            itemWidth={180}
            layout="default"
            // layoutCardOffset={20}
            onSnapToItem={ind => setSlideIndex(ind)}
          />
          {/* <View style={styles.slideIndicator}>{renderDots()}</View> */}

          <View style={styles.xOut}>
            <TouchableOpacity onPress={() => setShowTasks(false)}>
              <Icon name="times" size={15} color={colors.darkGrayO} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {posts.length > 0 ? (
        <FlatList
          style={styles.timeline}
          data={posts}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            return <PostGroupTL post={item} currentTime={currentTime} navigation={navigation} />;
          }}
        />
      ) : (
        <View style={{ height: 100, width: '100%', alignItems: 'center', marginVertical: 40 }}>
          <Text style={defaultStyles.defaultText}>Posts from people you follow will appear here!</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  timeline: {
    backgroundColor: colors.lightGray,
    marginTop: 10,
  },
  tasks: {
    marginTop: 15,
    width: '100%',
    // height: 120,
    justifyContent: 'center',
    paddingTop: 10,
    // backgroundColor: colors.lightLightGray,
    // borderTopColor: colors.borderBlack,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  userCard: {
    // height: 160,
    borderRadius: 10,
    // backgroundColor: colors.purp,
    backgroundColor: colors.lightLightGray,
    alignItems: 'center',
    padding: 15,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'SFProDisplay-Thin',
    color: colors.darkGray,
    // marginTop: 2,
    width: '100%',
    textAlign: 'center',
  },
  slideIndicator: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    marginHorizontal: 6,
  },
  xOut: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  followButton: {
    width: 120,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    marginTop: 15,
  },
});

export default FollowingTimeline;

// if (posts.length < 1) {
//   return (
// {/* <View style={{ height: 100, width: '100%', alignItems: 'center', marginVertical: 40 }}>
//   <Text style={defaultStyles.defaultText}>You don't follow anybody yet</Text>
//   <BigButton onPress={() => navigation.navigate('Suggestions')} buttonStyle={{ ...defaultStyles.shadow3, marginTop: 20 }}>
//     Find connections
//   </BigButton>
// </View>; */}
//   );
// }
