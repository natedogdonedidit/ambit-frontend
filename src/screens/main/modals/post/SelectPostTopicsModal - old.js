import React, { useState, useEffect } from 'react';
import { StyleSheet, Modal, View, ScrollView, StatusBar, SafeAreaView, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList, freelanceList, investList } from 'library/utils/lists';

// import HeaderWhite from 'library/components/headers/HeaderWhite';
// import GoalSelect from 'library/components/UI/GoalSelect';

const TOPIC_LIMIT = 3;

const SelectPostTopicsModal = ({ navigation }) => {
  const goal = navigation.getParam('goal', {
    modalType: 'topic',
    logo: 'comments',
    primaryColor: colors.blue,
    secondaryColor: colors.goalBlue,
    heading: 'Select a topic',
  });

  // if no goal is passed in, we're just selecting a topic
  const setGoal = navigation.getParam('setGoal');
  const setTopics = navigation.getParam('setTopics');
  const setSubField = navigation.getParam('setSubField');
  // this param only comes if there is no goal
  const topicsPassedIn = navigation.getParam('topics', []);
  // const multiple = navigation.getParam('multiple', false);
  const topicsOnly = navigation.getParam('topicsOnly', false);
  const fromGoalSelection = navigation.getParam('fromGoalSelection', false);

  const [selectedCategories, setSelectedCategories] = useState('');
  const [activeTopics, setActiveTopics] = useState(topicsPassedIn);
  const [warning, setWarning] = useState('');

  // CONSTANTS
  const multiple = !goal.name;
  const heading = goal.modalType === 'topic' || fromGoalSelection ? goal.heading : 'Select a topic';

  const handleTopicSelect = selectedTopicID => {
    // build an array of active topics with topicID only - for comparision reasons
    const activeTopicsIDonly = activeTopics.map(topic => topic.topicID);

    // if there is NOT a goal passed in, then multiple selections are allowed
    if (!goal.name) {
      // if (multiple) {
      // build the new array of topics
      let newArray = [...activeTopics];
      if (activeTopicsIDonly.includes(selectedTopicID)) {
        // remove it
        newArray = activeTopics.filter(topic => topic.topicID !== selectedTopicID);
        if (warning) setWarning('');
      } else if (newArray.length < TOPIC_LIMIT) {
        // add it
        // newArray = [...activeTopics, { topicID: selectedTopicID, name: selectedTopicName }];
        newArray = [...activeTopics, { topicID: selectedTopicID }];
      } else {
        setWarning('3 topics max');
      }

      setActiveTopics(newArray);
      setTopics(newArray);
      // setSubField({ topicID: null, name: null });
      setSubField('');

      // if we're only selecting ONE - navigate back after a short delay
      // if (!multiple) {
      //   const timeout = setTimeout(() => navigation.navigate('NewPostModal'), 300);
      // }

      // if there is a goal - select one topic.
    } else {
      setActiveTopics([{ topicID: selectedTopicID }]);

      // if coming from SelectGoalModal
      if (fromGoalSelection) {
        setGoal(goal);
        setSubField(selectedTopicID);
      }

      // if its a topic type goal - then set topic also
      if (goal.modalType === 'topic' || topicsOnly) {
        setTopics([{ topicID: selectedTopicID }]);
      }

      // setActiveTopics([{ topicID: selectedTopicID, name: selectedTopicName }]);
      // setSubField({ topicID: selectedTopicID, name: selectedTopicName });
      // setActiveTopics([{ topicID: selectedTopicID }]);
      // setSubField(selectedTopicID);
      // setGoal(goal);

      // navigate back after a short delay
      const timeout = setTimeout(() => navigation.navigate('NewPostModal'), 300);
    }
  };

  const handleCategorySelect = category => {
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

  const renderList = () => {
    const activeTopicsIDonly = activeTopics.map(topic => topic.topicID);

    if (goal.modalType === 'topic' || topicsOnly) {
      return topicsList.map((mainTopic, i) => {
        const { name, topicID, children } = mainTopic;

        const isSelected = activeTopicsIDonly.includes(topicID);
        const isExpanded = selectedCategories.includes(topicID);

        return (
          <View key={`${topicID}-${i}`} style={styles.categorySection}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategorySelect(topicID)}>
              <View style={{ ...styles.mainRow }}>
                <Text style={{ ...defaultStyles.hugeSemibold, color: colors.purp, paddingRight: 15, flex: 1 }}>{name}</Text>
                <Ionicons name={isExpanded ? 'ios-arrow-down' : 'ios-arrow-forward'} size={24} color={colors.iconGray} />
              </View>
            </TouchableOpacity>
            {isExpanded && children.length > 0 && (
              <View style={styles.subTopicsView}>
                <TouchableOpacity key={`${i}-${topicID}`} activeOpacity={0.7} onPress={() => handleTopicSelect(topicID)}>
                  <View style={{ ...styles.subRow }}>
                    <Text style={{ ...defaultStyles.largeMedium, color: colors.blueGray, paddingRight: 15, flex: 1 }}>
                      {name} (general)
                    </Text>
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
    }

    if (goal.modalType === 'specialist') {
      return freelanceList.map((mainTopic, i) => {
        const { name, topicID, children } = mainTopic;

        const isSelected = activeTopicsIDonly.includes(topicID);
        const isExpanded = selectedCategories.includes(topicID);

        return (
          <View key={`${topicID}-${i}`} style={styles.categorySection}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategorySelect(topicID)}>
              <View style={{ ...styles.mainRow }}>
                <Text style={{ ...defaultStyles.hugeSemibold, color: colors.peach, paddingRight: 15, flex: 1 }}>{name}</Text>
                <Ionicons name={isExpanded ? 'ios-arrow-down' : 'ios-arrow-forward'} size={24} color={colors.iconGray} />
              </View>
            </TouchableOpacity>
            {isExpanded && children.length > 0 && (
              <View style={styles.subTopicsView}>
                <TouchableOpacity key={`${i}-${topicID}`} activeOpacity={0.7} onPress={() => handleTopicSelect(topicID)}>
                  <View style={{ ...styles.subRow }}>
                    <Text style={{ ...defaultStyles.largeMedium, color: colors.blueGray, paddingRight: 15, flex: 1 }}>
                      {name} (general)
                    </Text>
                    {isSelected ? (
                      <View style={{ ...styles.addedButton, borderColor: colors.peach, backgroundColor: colors.peach }}>
                        <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
                      </View>
                    ) : (
                      <View style={{ ...styles.addButton, borderColor: colors.peach }}>
                        <Text style={{ ...defaultStyles.defaultMedium, color: colors.peach }}>Add</Text>
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
    }

    if (goal.modalType === 'invest') {
      return investList.map((mainTopic, i) => {
        const { name, topicID } = mainTopic;

        const isSelected = activeTopicsIDonly.includes(topicID);

        return (
          <View key={`${topicID}-${i}`} style={styles.categorySection}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleTopicSelect(topicID)}>
              <View style={{ ...styles.mainRow }}>
                <Text style={{ ...defaultStyles.hugeSemibold, color: colors.green, paddingRight: 15, flex: 1 }}>{name}</Text>
                {isSelected ? (
                  <View style={{ ...styles.addedButton, borderColor: colors.green, backgroundColor: colors.green }}>
                    <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
                  </View>
                ) : (
                  <View style={{ ...styles.addButton, borderColor: colors.green }}>
                    <Text style={{ ...defaultStyles.defaultMedium, color: colors.green }}>Add</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        );
      });
    }
  };

  const renderSubtopics = subTopics => {
    const activeTopicsIDonly = activeTopics.map(topic => topic.topicID);

    return subTopics.map((subTopic, i) => {
      const { name, topicID } = subTopic;
      const isSelected = activeTopicsIDonly.includes(topicID);

      return (
        <TouchableOpacity key={`${subTopic}-${i + 10}`} activeOpacity={0.7} onPress={() => handleTopicSelect(topicID)}>
          <View style={{ ...styles.subRow }}>
            <Text style={{ ...defaultStyles.largeMedium, color: colors.blueGray, paddingRight: 15, flex: 1 }}>{name}</Text>
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
      );
    });
  };

  // const renderSubtopics = subTopics => {
  //   return subTopics.map((subTopic, i) => {
  //     const isSelected = activeTopics.includes(subTopic);

  //     return (
  //       <TouchableOpacity key={`${subTopic}-${i + 10}`} activeOpacity={0.7} onPress={() => handleTopicSelect(subTopic)}>
  //         <View style={{ ...styles.subRow }}>
  //           <Text style={{ ...defaultStyles.largeMedium, color: colors.blueGray, paddingRight: 15, flex: 1 }}>{subTopic}</Text>
  //           {isSelected ? (
  //             <View style={styles.addedButton}>
  //               <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
  //             </View>
  //           ) : (
  //             <View style={styles.addButton}>
  //               <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
  //             </View>
  //           )}
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   });
  // };

  // // for freelance  & agency stuff
  // const renderFreelanceCat = () => {
  //   return freelanceList.map((item, i) => {
  //     const { category, logo, list } = item;
  //     const isExpanded = selectedCategories.includes(category);

  //     return (
  //       <View key={i} style={styles.categorySection}>
  //         <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategorySelect(category)}>
  //           <View style={{ ...styles.mainRow }}>
  //             <Text style={{ ...defaultStyles.hugeSemibold, color: colors.peach, paddingRight: 15, flex: 1 }}>{category}</Text>
  //             <Ionicons name={isExpanded ? 'ios-arrow-down' : 'ios-arrow-forward'} size={24} color={colors.iconGray} />
  //           </View>
  //         </TouchableOpacity>
  //         {isExpanded && list.length > 0 && <View style={styles.subTopicsView}>{renderFreelanceSubtopics(list)}</View>}
  //       </View>
  //     );
  //   });
  // };

  // const renderFreelanceSubtopics = list => {
  //   return list.map(subTopic => {
  //     const isSelected = activeTopics.includes(subTopic);

  //     return (
  //       <TouchableOpacity key={subTopic} activeOpacity={0.7} onPress={() => handleTopicSelect(subTopic)}>
  //         <View style={{ ...styles.subRow }}>
  //           <Text style={{ ...defaultStyles.largeMedium, color: colors.blueGray, paddingRight: 15, flex: 1 }}>{subTopic}</Text>
  //           {isSelected ? (
  //             <View style={styles.addedButton}>
  //               <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
  //             </View>
  //           ) : (
  //             <View style={styles.addButton}>
  //               <Text style={{ ...defaultStyles.defaultMedium, color: colors.peach }}>Add</Text>
  //             </View>
  //           )}
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   });
  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View
          style={{
            height: 46,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 15,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Icon name="chevron-left" size={22} color={colors.iosBlue} />
            <Text style={{ ...defaultStyles.largeMedium, color: colors.iosBlue, paddingLeft: 5 }}>Done</Text>
          </TouchableOpacity>
          <Text style={defaultStyles.defaultWarning}>{warning}</Text>
        </View>
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: goal.secondaryColor,
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            <Icon name={goal.logo} solid size={40} color={goal.primaryColor} />
          </View>
          <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  ...defaultStyles.headerMedium,
                }}
              >
                {multiple ? 'Select some topics' : heading}
              </Text>
              {/* <Icon name="question-circle" size={22} color={colors.iconDark} /> */}
            </View>

            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 12, paddingBottom: 20 }}>
              {goal.name
                ? 'This info will be used to connect you with the right people'
                : `Your post will appear on these\ntopic timelines (3 max)`}
            </Text>
          </View>

          <View>{renderList()}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectPostTopicsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flex: 1,
    width: '100%',
    paddingTop: 30,
  },
  categorySection: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  mainRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    // paddingRight: 10,
  },
  subTopicsView: {
    paddingLeft: 15,
  },
  subRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
  // items
  itemRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    paddingHorizontal: 15,
  },

  // categories
  categoryRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    paddingHorizontal: 10,
  },
  // add button
  addButton: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.purp,
    opacity: 0.9,
  },
  addedButton: {
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: colors.purp,
  },
});
