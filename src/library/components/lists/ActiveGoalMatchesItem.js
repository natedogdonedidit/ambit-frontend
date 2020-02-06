import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import ProfilePic from 'library/components/UI/ProfilePic';
import { getGoalInfo } from 'library/utils';

const ActiveGoalMatchesItem = ({ navigation, item }) => {
  const { post, matches } = item;
  console.log(post);
  console.log(matches);

  if (!matches || matches.length < 1) return null;

  const renderProfilePics = () => {
    return matches.map(({ user }, i) => {
      const top = (i % 2) * 5;
      const left = -i * 8;
      return (
        <View key={i} style={{ top, left }}>
          <ProfilePic navigation={navigation} user={user} size={40} border borderWidth={2} disableVideo />
        </View>
      );
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => navigation.navigate('PostMatches', { post, matches })}
    >
      <View style={styles.iconView}>
        <Icon name={getGoalInfo(post.goal, 'logo')} size={24} color={getGoalInfo(post.goal, 'primaryColor')} solid />
      </View>
      <View style={styles.rightSide}>
        <Text>
          <Text style={defaultStyles.defaultText}>
            Found {matches.length} potential match{matches.length > 1 && 'es'} for your goal to{' '}
          </Text>
          <Text
            style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}
          >{`${post.goal}`}</Text>
          <Text style={{ ...defaultStyles.defaultText }}>{` ${getGoalInfo(post.goal, 'adverb')} `}</Text>
          <Text style={{ ...defaultStyles.defaultSemibold, color: getGoalInfo(post.goal, 'primaryColor') }}>
            {post.subField.name}
          </Text>
        </Text>
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>{renderProfilePics()}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    // marginTop: 8,
    overflow: 'hidden',
  },
  iconView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 5,
    width: 70,
  },
  rightSide: {
    flex: 1,
    paddingRight: 15,
  },
  reasonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default ActiveGoalMatchesItem;