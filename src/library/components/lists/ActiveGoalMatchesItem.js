import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useLazyQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import { getGoalInfo, getTopicFromID } from 'library/utils';
import POST_MATCHES_QUERY from 'library/queries/POST_MATCHES_QUERY';

const ActiveGoalMatchesItem = ({ navigation, post, loadingPost }) => {
  const [matches, setMatches] = useState([]);

  // get the matches for that goal
  const [getMatches, { loading: loadingMatches, error, data }] = useLazyQuery(POST_MATCHES_QUERY);

  useEffect(() => {
    if (!loadingPost && !!post && post.id) {
      getMatches({ variables: { id: post.id } });
    }
  }, [post, loadingPost]);

  useEffect(() => {
    if (data && data.singlePostMatches && data.singlePostMatches.length > 0) {
      setMatches(data.singlePostMatches);
    }
  }, [data]);

  const renderIcon = () => {
    if (loadingPost || !post) {
      return <View style={styles.skeletonCircle} />;
    }

    return (
      <Icon
        name={getGoalInfo(post.goal, 'icon')}
        size={24}
        color={getGoalInfo(post.goal, 'primaryColor')}
        solid
        style={{ paddingTop: 5 }}
      />
    );
  };

  const renderTitle = () => {
    if (loadingPost || !post) {
      return (
        <View style={{ paddingRight: 15 }}>
          <View style={{ ...styles.skeletonRectangle, width: '85%' }} />
          <View style={{ ...styles.skeletonRectangle, width: '65%' }} />
        </View>
      );
    }

    const { name } = post.subField ? getTopicFromID(post.subField.topicID) : '';

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

    if (matches.length > 0) {
      return (
        <Text style={{ paddingRight: 15 }}>
          <Text style={defaultStyles.defaultText}>
            Found {matches.length} potential match{matches.length > 1 && 'es'} for your goal to{' '}
          </Text>
          <Text
            style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}
          >{`${post.goal}`}</Text>
          <Text style={{ ...defaultStyles.defaultText }}>{` ${getGoalInfo(post.goal, 'adverb')} `}</Text>
          <Text style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}>{name}</Text>
        </Text>
      );
    }

    return null;
  };

  const renderProfilePics = () => {
    // render skeleton pics if loading
    if (loadingMatches || loadingPost) {
      const skel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      return skel.map((item, i) => {
        const top = (i % 2) * 5;
        const left = -i * 8;
        return (
          <View key={i} style={{ top, left }}>
            <View style={styles.skeletonCircleSmall} />
          </View>
        );
      });
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

  if ((data && data.singlePostMatches && data.singlePostMatches.length <= 0) || error) {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => {
        navigation.navigate('PostMatches', { post });
      }}
    >
      <View style={styles.iconView}>{renderIcon()}</View>

      <View style={styles.rightSide}>
        {renderTitle()}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexDirection: 'row', paddingVertical: 10, minHeight: 70 }}
        >
          {renderProfilePics()}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // paddingRight: 15,
    paddingTop: 12,
    paddingBottom: 8,
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

export default ActiveGoalMatchesItem;
