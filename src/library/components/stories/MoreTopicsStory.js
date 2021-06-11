import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import { useNavigation } from '@react-navigation/native';

const MoreTopicsStory = ({ followsTopics = false }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('MyTopicsList')} style={styles.storyBox}>
      <Text style={{ ...defaultStyles.largeSemibold, color: colors.white, paddingBottom: 10, textAlign: 'left' }}>
        Follow {followsTopics ? 'more' : 'some'} topics
      </Text>
      <Icon name="arrow-forward-outline" size={26} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  storyBox: {
    // justifyContent: 'space-between',
    height: 120,
    width: 80,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.purp,
    overflow: 'hidden',
    marginLeft: 6,
    backgroundColor: colors.purp,
    position: 'relative',
    paddingVertical: 15,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MoreTopicsStory;
