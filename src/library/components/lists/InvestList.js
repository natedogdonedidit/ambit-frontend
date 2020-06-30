import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { investList } from 'library/utils/lists';

import Icon from 'react-native-vector-icons/FontAwesome5';

const InvestList = ({ activeTopicIDs = [], handleTopicSelect }) => {
  // RETURN FUNCTION

  return investList.map((mainTopic, i) => {
    const { name, icon, color, topicID } = mainTopic;

    const isSelected = activeTopicIDs.includes(topicID);

    return (
      <TouchableOpacity key={topicID} activeOpacity={0.8} onPress={() => handleTopicSelect(topicID, name)}>
        <View style={[styles.mainRow, i === investList.length - 1 && styles.addBottomBorder]}>
          <View style={styles.iconView}>
            <Icon name={icon} solid size={20} color={colors[color] || colors.blueGray} />
          </View>
          <Text style={styles.mainRowText}>{name}</Text>
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
  addBottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default InvestList;
