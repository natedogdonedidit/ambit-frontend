import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

import { getTopicFromID } from 'library/utils';
import TopicFollowButtonFreelance from 'library/components/UI/buttons/TopicFollowButtonFreelance';

const TopicsOfFreelance = ({ navigation, myTopics }) => {
  const { topicsFreelance: topics } = myTopics;

  const renderTopics = () => {
    return topics.map(({ id }) => {
      const { name, topicID } = getTopicFromID(id);

      return (
        <View key={id} style={{ ...styles.topicRow }}>
          <Ionicons name="ios-chatbubbles" size={22} color={colors.blueGray} />

          <Text style={{ ...defaultStyles.largeMedium, color: colors.darkGray, paddingLeft: 10, paddingRight: 15, flex: 1 }}>
            {name}
          </Text>
          <TopicFollowButtonFreelance topicID={topicID} showX />
        </View>
      );
    });
  };

  return (
    <View style={styles.section}>
      <Text style={{ ...defaultStyles.headerHat, textAlign: 'center', paddingBottom: 10 }}>Are you a freelancer?</Text>
      <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center', paddingBottom: 20 }}>
        Select your specialties and we will send you freelance opportunities from other users
      </Text>
      {topics.length > 0 && <View style={styles.topicsSection}>{renderTopics()}</View>}
      <ButtonDefault
        buttonStyle={{ backgroundColor: colors.peach }}
        onPress={() => navigation.navigate('SelectTopicsFreelanceModal')}
      >
        Add specialities
      </ButtonDefault>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  topicsSection: {
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    marginBottom: 30,
  },
  topicRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  // add button
  addButton: {
    height: 32,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.peach,
    opacity: 0.9,
  },
  addedButton: {
    height: 32,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: colors.peach,
  },
});

export default TopicsOfFreelance;
