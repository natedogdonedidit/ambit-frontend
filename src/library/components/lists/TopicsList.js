import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { allNormalTopics, topicsList } from 'library/utils/lists';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

// import { getIconID, getTopicFromID } from 'library/utils';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecommendedTopic from 'library/components/topics/RecommendedTopic';
import { useQuery } from '@apollo/client';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

const TopicsList = ({ activeTopicIDs = [], handleTopicSelect, showFollowButton = false, topicType }) => {
  const [selectedCategories, setSelectedCategories] = useState('');
  const [searchText, setSearchText] = useState('');

  const { data: dataTopics, loading: loadingTopics, error: errorTopics } = useQuery(CURRENT_USER_TOPICS);

  const myTopics = useMemo(() => {
    if (dataTopics && dataTopics.userLoggedIn && dataTopics.userLoggedIn.topicsFocus) {
      // return combineFavoriteTopics(dataTopics.myTopics);
      return dataTopics.userLoggedIn.topicsFocus.map((topic) => {
        return {
          topicID: topic.id,
        };
      });
    }

    return [];
  }, [dataTopics]);

  console.log(myTopics);

  const matchingTopics = useMemo(() => {
    // if search text changes - find matching topics
    return allNormalTopics.filter((t) => t.name.includes(searchText));
  }, [searchText]);

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

  // RENDER FUNCTIONS
  const renderSubtopics = (subTopics) => {
    return subTopics.map((subTopic) => {
      const { topicID } = subTopic;

      return (
        <RecommendedTopic
          key={topicID}
          showPic={false}
          topicID={topicID}
          activeTopicIDs={activeTopicIDs}
          handleTopicSelect={handleTopicSelect}
          showAddButton={!showFollowButton}
          showFollowButton={showFollowButton}
          topicType={topicType}
        />
      );
    });
  };

  const renderList = () => {
    // IF WE ARE SEARCHING - SHOW ONLY MATCHING TOPICS
    if (searchText) {
      return matchingTopics.map((matchingTop, i) => {
        const { topicID } = matchingTop;

        return (
          <RecommendedTopic
            key={topicID}
            showPic={false}
            topicID={topicID}
            activeTopicIDs={activeTopicIDs}
            handleTopicSelect={handleTopicSelect}
            showBottomBorder={i === matchingTopics.length - 1}
            showAddButton={!showFollowButton}
            showFollowButton={showFollowButton}
          />
        );
      });
    }

    // IF NO SEARCH TEXT - RENDER THE FULL TOPICS LIST
    const myTopicsExpanded = selectedCategories.includes('following');
    const hasTopicsFollowing = myTopics && myTopics.length > 0;

    return (
      <View>
        {/* My Topics Section */}
        {hasTopicsFollowing && (
          <View>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleCategorySelect('following')}>
              <View style={styles.mainRow}>
                <View style={styles.iconView}>
                  <Icon name="star" solid size={20} color={colors.yellow} />
                </View>
                <Text style={styles.mainRowText}>Following</Text>
                <View style={{ flex: 1 }} />
                <Ionicons
                  name={myTopicsExpanded ? 'ios-chevron-down' : 'ios-chevron-forward'}
                  size={22}
                  color={colors.iconGray}
                  style={{ paddingTop: 2 }}
                />
              </View>
            </TouchableOpacity>
            {myTopicsExpanded && myTopics.length > 0 && <View style={styles.subRowView}>{renderSubtopics(myTopics)}</View>}
          </View>
        )}

        {/* All Topics Sections */}
        {topicsList.map((mainTopic) => {
          const { name, topicID, children, icon, color } = mainTopic;

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
                  <View style={{ flex: 1 }} />
                  {countSelected > 0 && (
                    <View style={styles.countCircle}>
                      <Text style={{ ...defaultStyles.smallMedium, textAlign: 'center', color: colors.white }}>
                        {countSelected}
                      </Text>
                    </View>
                  )}

                  <Ionicons
                    name={isExpanded ? 'ios-chevron-down' : 'ios-chevron-forward'}
                    size={22}
                    color={colors.iconGray}
                    style={{ paddingTop: 2 }}
                  />
                </View>
              </TouchableOpacity>
              {isExpanded && children.length > 0 && <View style={styles.subRowView}>{renderSubtopics(children)}</View>}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <View style={{ paddingHorizontal: 6 }}>
        <View style={styles.searchBar}>
          <Icon name="search" size={18} color={colors.black} />
          <TextInput
            style={{ ...styles.searchBarInput, ...defaultStyles.largeRegular, color: colors.darkGray }}
            onChangeText={(val) => setSearchText(val)}
            value={searchText}
            placeholder="Search Ambit"
            maxLength={50}
          />
        </View>
      </View>
      {renderList()}
    </>
  );
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
    paddingLeft: 40,
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
  countCircle: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.purp,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  searchBar: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.searchGray,
    height: 36,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  searchBarInput: {
    paddingLeft: 12,
    flex: 1,
  },
});

export default TopicsList;
