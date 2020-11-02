import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { investList } from 'library/utils/lists';

import Icon from 'react-native-vector-icons/FontAwesome5';
import TopicFollowButtonInvest from 'library/components/UI/buttons/TopicFollowButtonInvest';

// only uses handleTopicSelect if disableFollow is true
const InvestList = ({ handleTopicSelect, disableFollow = false }) => {
  return investList.map((mainTopic, i) => {
    const { name, icon, color, topicID } = mainTopic;

    return (
      <View key={topicID}>
        <View style={[styles.mainRow, i === investList.length - 1 && styles.addBottomBorder]}>
          <View style={styles.iconView}>
            <Icon name={icon} solid size={20} color={colors[color] || colors.blueGray} />
          </View>
          <Text style={styles.mainRowText}>{name}</Text>
          {disableFollow ? (
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(topicID)}>
              <View style={styles.addButton}>
                <Text style={{ ...defaultStyles.followButton, color: colors.green }}>Add</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TopicFollowButtonInvest topicID={topicID} />
          )}
        </View>
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
  // add button
  addButton: {
    height: 34,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.green,
    opacity: 0.9,
  },
  addedButton: {
    height: 34,
    width: 68,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    backgroundColor: colors.green,
  },
  addBottomBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default InvestList;
