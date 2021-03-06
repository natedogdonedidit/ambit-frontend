import React, { useState, useEffect, useMemo, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import { getGoalInfo, buildSearchWhere } from 'library/utils';
import POSTS_WHERE_QUERY from 'library/queries/POSTS_WHERE_QUERY';
import { UserContext } from 'library/utils/UserContext';

const HatMatchesRow = ({ navigation, hats, type, triggerRefresh }) => {
  const { setHasNewMatches, currentUsername } = useContext(UserContext);

  const [matchingPosts, setMatchingPosts] = useState([]);

  const goal = useMemo(() => {
    if (type === 'invest') return 'Find Investors';
    if (type === 'freelance') return 'Find Freelancers';
    if (type === 'mentor') return 'Find Mentors';
    if (type === 'network') return 'Network';
    return '';
  }, [type]);

  const topicIDs = useMemo(() => {
    return hats.map((topic) => topic.id);
  }, [hats]);

  const where = buildSearchWhere({ goal, topicIDs, currentUsername });

  const { loading: loadingQuery, error, data, refetch, fetchMore, networkStatus } = useQuery(POSTS_WHERE_QUERY, {
    variables: {
      take: 50,
      where,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    refetch();
  }, [triggerRefresh]);

  // useEffect(() => {
  //   // send query
  //   getPostsMatchingHat({
  //     variables: {
  //       goal,
  //       topicIDs,
  //     },
  //   });
  // }, [hats]);

  useEffect(() => {
    if (data && data.postsWhere && data.postsWhere.posts.length > 0) {
      setMatchingPosts(data.postsWhere.posts);
      setHasNewMatches(true); // enables the notification dot on Tab
    }
  }, [data]);

  const foundMatches = data && data.postsWhere && matchingPosts.length > 0;

  const renderIcon = () => {
    if (type === 'freelance') {
      return <Icon name="briefcase" size={24} color={colors.peach} solid />;
    }
    if (type === 'invest') {
      return <Icon name="comment-dollar" size={24} color={colors.green} solid />;
    }
    if (type === 'mentor') {
      return <Icon name="user-friends" size={24} color={colors.purp} solid />;
    }
    if (type === 'network') {
      return <Icon name="users" size={24} color={colors.purp} solid />;
    }
  };

  const renderTitle = () => {
    if (!data) {
      if (type === 'invest') {
        return (
          <Text style={{ paddingRight: 12 }}>
            <Text style={defaultStyles.defaultMuteItalic}>Finding investment opportunities for you...</Text>
          </Text>
        );
      }
      if (type === 'freelance') {
        return (
          <Text style={{ paddingRight: 12 }}>
            <Text style={defaultStyles.defaultMuteItalic}>Finding freelance opportunities for you...</Text>
          </Text>
        );
      }
      if (type === 'mentor') {
        return (
          <Text style={{ paddingRight: 12 }}>
            <Text style={defaultStyles.defaultMuteItalic}>Finding mentorship opportunities for you...</Text>
          </Text>
        );
      }
      if (type === 'network') {
        return (
          <Text style={{ paddingRight: 12 }}>
            <Text style={defaultStyles.defaultMuteItalic}>Finding network opportunities for you...</Text>
          </Text>
        );
      }
    }

    if (matchingPosts.length > 0) {
      if (type === 'invest') {
        return (
          <Text style={{ paddingRight: 12 }}>
            <Text style={defaultStyles.defaultText}>
              Found {matchingPosts.length} potential{' '}
              <Text style={{ ...defaultStyles.defaultSemibold, color: colors.green }}>
                investment opportunit{matchingPosts.length > 1 ? 'ies' : 'y'}
              </Text>{' '}
              for you
            </Text>
          </Text>
        );
      }
      if (type === 'freelance') {
        return (
          <Text style={{ paddingRight: 12 }}>
            <Text style={defaultStyles.defaultText}>
              Found {matchingPosts.length} potential{' '}
              <Text style={{ ...defaultStyles.defaultSemibold, color: colors.peach }}>
                freelance opportunit{matchingPosts.length > 1 ? 'ies' : 'y'}
              </Text>{' '}
              for you
            </Text>
          </Text>
        );
      }
      if (type === 'mentor') {
        return (
          <Text style={{ paddingRight: 12 }}>
            <Text style={defaultStyles.defaultText}>
              Found {matchingPosts.length} potential{' '}
              <Text style={{ ...defaultStyles.defaultSemibold, color: colors.purp }}>
                mentorship opportunit{matchingPosts.length > 1 ? 'ies' : 'y'}
              </Text>{' '}
              for you
            </Text>
          </Text>
        );
      }
      if (type === 'network') {
        return (
          <Text style={{ paddingRight: 12 }}>
            <Text style={defaultStyles.defaultText}>
              Found {matchingPosts.length} potential{' '}
              <Text style={{ ...defaultStyles.defaultSemibold, color: colors.purp }}>
                network opportunit{matchingPosts.length > 1 ? 'ies' : 'y'}
              </Text>{' '}
              for you
            </Text>
          </Text>
        );
      }
    }

    // if we could not find any matches
    if (type === 'invest') {
      return (
        <Text style={{ paddingRight: 12 }}>
          <Text style={defaultStyles.defaultMuteItalic}>No new investment opportunities, check back later!</Text>
        </Text>
      );
    }
    if (type === 'freelance') {
      return (
        <Text style={{ paddingRight: 12 }}>
          <Text style={defaultStyles.defaultMuteItalic}>No new freelance opportunities, check back later!</Text>{' '}
        </Text>
      );
    }
    if (type === 'mentor') {
      return (
        <Text style={{ paddingRight: 12 }}>
          <Text style={defaultStyles.defaultMuteItalic}>No new mentorship opportunities, check back later!</Text>{' '}
        </Text>
      );
    }
    if (type === 'network') {
      return (
        <Text style={{ paddingRight: 12 }}>
          <Text style={defaultStyles.defaultMuteItalic}>No new network opportunities, check back later!</Text>{' '}
        </Text>
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      disabled={!foundMatches}
      onPress={() => {
        if (foundMatches) {
          navigation.navigate('Search', {
            goalToSearch: getGoalInfo(goal),
            topicIDsToSearch: topicIDs,
          });
        }
      }}
    >
      <View style={styles.iconView}>{renderIcon()}</View>
      <View style={styles.rightSide}>{renderTitle()}</View>
      {foundMatches && <Ionicons name="ios-chevron-forward" size={28} color={colors.iconGray} style={{}} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    // marginTop: 8,
    overflow: 'hidden',
  },
  iconView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 76,
    // paddingTop: 5,
    paddingLeft: 5,
  },
  rightSide: {
    flex: 1,
  },
  reasonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  skeletonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.lightGray,
  },
  skeletonCircleSmall: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.lightGray,
    borderWidth: 2,
    borderColor: 'white',
  },
  skeletonRectangle: {
    width: 150,
    height: 18,
    borderRadius: 3,
    backgroundColor: colors.lightGray,
    marginBottom: 4,
  },
});

export default HatMatchesRow;
