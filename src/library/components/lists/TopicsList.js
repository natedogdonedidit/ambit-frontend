import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';
import { getIconID, getTopicFromID } from 'library/utils';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TopicsList = ({ activeTopicIDs = [], selectedCategories, handleTopicSelect, handleCategorySelect }) => {
  console.log(activeTopicIDs);
  const renderSubtopics = (subTopics) => {
    return subTopics.map((subTopic) => {
      const { name, topicID } = subTopic;
      const isSelected = activeTopicIDs.includes(topicID);

      return (
        <TouchableOpacity key={topicID} activeOpacity={1} onPress={() => handleTopicSelect(topicID, name)}>
          <View style={styles.subRow}>
            <Text style={styles.subRowText}>{name}</Text>
            {isSelected ? (
              <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
                <View style={styles.addedButton}>
                  <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
                <View style={styles.addButton}>
                  <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  // RETURN FUNCTION
  return topicsList.map((mainTopic) => {
    const { name, topicID, children, icon, color } = mainTopic;
    // const parent = getIconFromID(topicID);
    // const { icon, color } = parent;

    const isSelected = activeTopicIDs.includes(topicID);
    const isExpanded = selectedCategories.includes(topicID);
    const countSelected = activeTopicIDs.reduce((acc, val) => {
      if (val.startsWith(topicID)) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return (
      <View key={topicID}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleCategorySelect(topicID)}>
          <View style={styles.mainRow}>
            <View style={styles.iconView}>
              <Icon name={icon} solid size={20} color={colors[color] || colors.blueGray} />
            </View>
            <Text style={styles.mainRowText}>{name}</Text>
            {countSelected > 0 && (
              <View style={styles.countCircle}>
                <Text style={{ ...defaultStyles.smallMedium, textAlign: 'center', color: colors.white }}>{countSelected}</Text>
              </View>
            )}
            <View style={{ flex: 1 }} />
            <Ionicons
              name={isExpanded ? 'ios-chevron-down' : 'ios-chevron-forward'}
              size={22}
              color={colors.iconGray}
              style={{ paddingTop: 2 }}
            />
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
                    <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
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
    // flex: 1,
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
    height: 32,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.purp,
    opacity: 0.9,
  },
  addedButton: {
    height: 32,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.purp,
  },
  countCircle: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purp,
    borderRadius: 12,
    marginHorizontal: 12,
  },
});

export default TopicsList;
