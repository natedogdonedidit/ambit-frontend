import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { getTopicFromID } from 'library/utils/index';
import TopicFollowButton from 'library/components/UI/buttons/TopicFollowButton';

const picExample =
  'https://images.unsplash.com/photo-1592320937521-84c88747a68a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80';

const TopicRow = ({ topicID }) => {
  const { name, icon, color, image } = getTopicFromID(topicID);

  // this makes it so reads "following" immediately after follow
  // const [showFollowing, setShowFollowing] = useState(false);

  return (
    <View
      style={styles.container}
      // onPress={() => navigation.navigate('Topic', { topicID })}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 36, height: 36, borderRadius: 18, ...defaultStyles.shadowButton, marginRight: 12 }}>
          <Image
            style={{ width: 36, height: 36, borderRadius: 18 }}
            resizeMode="cover"
            source={{
              uri: image || picExample,
            }}
          />
        </View>
      </View>

      <Text
        style={{
          ...defaultStyles.largeMedium,
          color: colors.blueGray,
          flex: 1,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    // height: 50,
    alignItems: 'center',
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.borderBlack,
    paddingRight: 6,
    backgroundColor: 'white',
  },
  // add button
  addButton: {
    height: 32,
    width: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.purp,
    opacity: 0.9,
  },
  addedButton: {
    height: 32,
    width: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.purp,
  },
});

export default TopicRow;
