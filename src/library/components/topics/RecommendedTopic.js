import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { getTopicFromID } from 'library/utils/index';
import TopicFollowButton from 'library/components/UI/buttons/TopicFollowButton';
import TopicFollowButtonMentor from 'library/components/UI/buttons/TopicFollowButtonMentor';
import TopicFollowButtonNetwork from 'library/components/UI/buttons/TopicFollowButtonNetwork';
import { UserContext } from 'library/utils/UserContext';

const picExample =
  'https://images.unsplash.com/photo-1592320937521-84c88747a68a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80';

const RecommendedTopic = ({
  topicID, // required
  showPic = true,

  // if you want to be able to navigate to the topic
  allowNavigation = false,

  // if recommended topic
  showFollowButton = false,
  topicType = 'focus', // focus, invest, freelance, mentor, network

  // if on newPostModal or newProject
  showAddButton = false,
  handleTopicSelect = () => null, // required if showAddButton
  activeTopicIDs = [], // required if showAddButton

  showTopBorder = true,
  showBottomBorder = false,
}) => {
  const navigation = useNavigation();
  const { name, icon, color, image } = getTopicFromID(topicID);
  const { activeTab } = useContext(UserContext);

  // this makes it so reads "following" immediately after follow
  // const [showFollowing, setShowFollowing] = useState(false);

  const renderRightSide = () => {
    if (showFollowButton) {
      if (topicType === 'mentor') {
        return <TopicFollowButtonMentor topicID={topicID} />;
      }

      if (topicType === 'network') {
        return <TopicFollowButtonNetwork topicID={topicID} />;
      }

      // defaults to topics of focus
      return <TopicFollowButton topicID={topicID} onRow />;
    }

    if (showAddButton) {
      const isSelected = activeTopicIDs.includes(topicID);

      if (isSelected) {
        return (
          <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
            <View style={styles.addedButton}>
              <Text style={defaultStyles.followButton}>Added</Text>
            </View>
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
          <View style={styles.addButton}>
            <Text style={{ ...defaultStyles.followButton, color: colors.purp }}>Add</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return <Ionicons name="ios-chevron-forward" size={15} color={colors.blueGray} style={{ paddingLeft: 10, opacity: 0.6 }} />;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        showTopBorder && { borderTopWidth: StyleSheet.hairlineWidth },
        showBottomBorder && { borderBottomWidth: StyleSheet.hairlineWidth },
      ]}
      activeOpacity={0.7}
      disabled={!allowNavigation}
      onPress={() =>
        navigation.navigate(activeTab || 'HomeStack', {
          screen: 'Topic',
          key: `Topic:${topicID}`,
          params: { topicID },
        })
      }
      // onPress={() => navigation.navigate({ name: 'Topic', key: `Topic:${topicID}`, params: { topicID } })}
    >
      {showPic && (
        <View style={{ paddingRight: 15 }}>
          <View style={{ width: 36, height: 36, borderRadius: 18, ...defaultStyles.shadowButton }}>
            <Image
              style={{ width: 36, height: 36, borderRadius: 18 }}
              resizeMode="cover"
              source={{
                uri: image || picExample,
              }}
            />
          </View>
        </View>
      )}

      <Text
        style={{
          ...defaultStyles.largeMedium,
          color: colors.blueGray,
          flex: 1,
        }}
      >
        {name}
      </Text>
      {renderRightSide()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    // borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    paddingLeft: 15,
    paddingRight: 6,
    backgroundColor: 'white',
  },
  // add button
  addButton: {
    height: 34,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.purp,
    opacity: 0.9,
  },
  addedButton: {
    height: 34,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: colors.purp,
  },
});

export default RecommendedTopic;
