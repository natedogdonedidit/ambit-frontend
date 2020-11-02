import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { freelanceList } from 'library/utils/lists';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopicFollowButtonFreelance from 'library/components/UI/buttons/TopicFollowButtonFreelance';

// only uses handleTopicSelect if disableFollow is true
const FreelanceList = ({ handleTopicSelect, disableFollow = false }) => {
  const [selectedCategories, setSelectedCategories] = useState('');

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      const index = selectedCategories.indexOf(category);
      if (index > -1) {
        const newArray = [...selectedCategories];
        newArray.splice(index, 1);
        setSelectedCategories(newArray);
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const renderSubtopics = (subTopics) => {
    return subTopics.map((subTopic) => {
      const { name, topicID } = subTopic;

      return (
        <View key={topicID} style={styles.subRow}>
          <Text style={styles.subRowText}>{name}</Text>
          {disableFollow ? (
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(topicID)}>
              <View style={styles.addButton}>
                <Text style={{ ...defaultStyles.followButton, color: colors.peach }}>Add</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TopicFollowButtonFreelance topicID={topicID} />
          )}
        </View>
      );
    });
  };

  // RETURN FUNCTION
  return freelanceList.map((mainTopic, i) => {
    const { name, icon, color, topicID, children } = mainTopic;

    const isExpanded = selectedCategories.includes(topicID);

    return (
      <View key={topicID}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleCategorySelect(topicID)}>
          <View style={[styles.mainRow, i === freelanceList.length - 1 && styles.addBottomBorder]}>
            <View style={styles.iconView}>
              <Icon name={icon} solid size={20} color={colors[color] || colors.peach} />
            </View>

            <Text style={styles.mainRowText}>{name}</Text>
            <Ionicons name={isExpanded ? 'ios-chevron-down' : 'ios-chevron-forward'} size={22} color={colors.iconGray} />
          </View>
        </TouchableOpacity>
        {isExpanded && children.length > 0 && <View style={styles.subRowView}>{renderSubtopics(children)}</View>}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  mainRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    paddingRight: 15,
  },
  mainRowText: {
    ...defaultStyles.largeRegular,
    flex: 1,
  },
  iconView: {
    width: 55,
    alignItems: 'center',
    paddingRight: 5,
  },
  subRowView: {
    paddingLeft: 50,
  },
  subRow: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 15,
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  subRowText: {
    ...defaultStyles.defaultMedium,
    color: colors.blueGray,
    paddingRight: 15,
    flex: 1,
  },
  // add button
  addButton: {
    height: 34,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.peach,
    opacity: 0.9,
  },
  addedButton: {
    height: 34,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: colors.peach,
  },
  addBottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default FreelanceList;
