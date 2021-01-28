import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import { getGoalInfo, getTopicFromID } from 'library/utils';
import POST_MATCHES_QUERY from 'library/queries/POST_MATCHES_QUERY';
import Loader from 'library/components/UI/Loader';
import { UserContext } from 'library/utils/UserContext';

const ActiveGoalMatchesItem = ({ navigation, post, triggerRefresh }) => {
  const { setHasNewMatches } = useContext(UserContext);

  const [matches, setMatches] = useState([]);

  if (!post) {
    return null;
  }

  // get the matches for that goal
  const { loading, error, data, refetch, networkStatus } = useQuery(POST_MATCHES_QUERY, {
    variables: {
      postId: post.id,
    },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });
  // networkStatus states:
  // 1: loading
  // 3: fetchMore
  // 4: refetch
  // 7: no loading, no refetch, everything OK!

  const loadingMatches = networkStatus === 1;
  const refetching = networkStatus === 4;

  useEffect(() => {
    refetch();
  }, [triggerRefresh]);

  useEffect(() => {
    if (data && data.singlePostMatches && data.singlePostMatches.length >= 0) {
      setMatches(data.singlePostMatches);
      setHasNewMatches(true); // enables the notification dot on Tab
    }
  }, [data]);

  if (!data || !data.singlePostMatches) {
    return null;
  }

  const renderIcon = () => {
    return <Text style={{ fontSize: 32 }}>{getGoalInfo(post.goal, 'emoji')}</Text>;
    // return (
    //   <Icon
    //     name={getGoalInfo(post.goal, 'icon')}
    //     size={24}
    //     color={getGoalInfo(post.goal, 'primaryColor')}
    //     solid
    //     style={{ paddingTop: 5 }}
    //   />
    // );
  };

  const renderTitle = () => {
    const { name } = post.subField ? getTopicFromID(post.subField) : '';

    if (loadingMatches) {
      return (
        <Text style={{ paddingRight: 15 }}>
          <Text style={defaultStyles.defaultText}>Finding matches for your goal to </Text>
          <Text
            style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}
          >{`${post.goal}`}</Text>
          <Text style={{ ...defaultStyles.defaultText }}>{` ${getGoalInfo(post.goal, 'adverb')} `}</Text>
          <Text style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}>{name}</Text>
        </Text>
      );
    }

    return (
      <Text style={{ paddingRight: 15 }}>
        <Text style={defaultStyles.defaultText}>
          Found {matches.length} potential match{matches.length > 1 && 'es'} for your goal to{' '}
        </Text>
        <Text style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}>{`${post.goal}`}</Text>
        <Text style={{ ...defaultStyles.defaultText }}>{` ${getGoalInfo(post.goal, 'adverb')} `}</Text>
        <Text style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}>{name}</Text>
      </Text>
    );
  };

  const renderProfilePics = () => {
    // render skeleton pics if loading
    if (loadingMatches) {
      return (
        <View style={{ height: 70, width: '100%' }}>
          <Loader active size="small" full={false} backgroundColor={colors.white} />
        </View>
      );
    }

    return matches.map((user, i) => {
      const top = (i % 2) * 5;
      const left = -i * 8;
      return (
        <View key={i} style={{ top, left }}>
          <ProfilePic
            navigation={navigation}
            user={user}
            size={40}
            border
            borderWidth={2}
            enableIntro={false}
            enableStory={false}
          />
        </View>
      );
    });
  };

  if (error) {
    return null;
  }

  // if (matches.length <= 0) {
  //   return null;
  // }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => {
        navigation.navigate({ name: 'PostMatches', key: `PostMatches:${post.id}`, params: { post } });
      }}
    >
      <View style={styles.iconView}>{renderIcon()}</View>

      <View style={styles.rightSide}>
        {renderTitle()}
        {matches && matches.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row', paddingVertical: 10, minHeight: 70 }}
          >
            {renderProfilePics()}
          </ScrollView>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 12,
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
  emptyComponent: {
    backgroundColor: colors.white,
    paddingTop: 16,
  },
});

export default ActiveGoalMatchesItem;
