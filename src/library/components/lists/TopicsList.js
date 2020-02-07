import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopicsList = ({ activeTopicIDs = [], selectedCategories, handleTopicSelect, handleCategorySelect }) => {
  const renderSubtopics = subTopics => {
    return subTopics.map(subTopic => {
      const { name, topicID } = subTopic;
      const isSelected = activeTopicIDs.includes(topicID);

      return (
        <TouchableOpacity key={topicID} activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
          <View style={styles.subRow}>
            <Text style={styles.subRowText}>{name}</Text>
            {isSelected ? (
              <View style={styles.addedButton}>
                <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
              </View>
            ) : (
              <View style={styles.addButton}>
                <Text style={{ ...defaultStyles.defaultMedium, color: colors.blueGray }}>Add</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  // RETURN FUNCTION
  return topicsList.map(mainTopic => {
    const { name, icon, color, topicID, children } = mainTopic;

    const isSelected = activeTopicIDs.includes(topicID);
    const isExpanded = selectedCategories.includes(topicID);

    return (
      <View key={topicID}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleCategorySelect(topicID)}>
          <View style={styles.mainRow}>
            <View style={styles.iconView}>
              <Icon name={icon} solid size={20} color={color || colors.blueGray} />
            </View>

            <Text style={styles.mainRowText}>{name}</Text>
            <Ionicons name={isExpanded ? 'ios-arrow-down' : 'ios-arrow-forward'} size={22} color={colors.iconGray} />
          </View>
        </TouchableOpacity>
        {isExpanded && children.length > 0 && (
          <View style={styles.subRowView}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
              <View style={styles.subRow}>
                <Text style={styles.subRowText}>{name} (general)</Text>
                {isSelected ? (
                  <View style={styles.addedButton}>
                    <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
                  </View>
                ) : (
                  <View style={styles.addButton}>
                    <Text style={{ ...defaultStyles.defaultMedium, color: colors.blueGray }}>Add</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            {renderSubtopics(children)}
          </View>
        )}
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
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.blueGray,
    opacity: 0.9,
  },
  addedButton: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.blueGray,
  },
});

export default TopicsList;
