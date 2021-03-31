import React, { useState, useMemo, useEffect, useContext, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Text, ScrollView, Keyboard } from 'react-native';
import { useQuery } from '@apollo/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { useIsFocused } from '@react-navigation/native';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import USERS_QUERY from 'library/queries/USERS_QUERY';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
// import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchTimeline from 'library/components/timelines/SearchTimeline';
import HeaderSearch from 'library/components/headers/HeaderSearch';
import Error from 'library/components/UI/Error';
// import SearchTabs from 'library/components/search/SearchTabs';
import { HEADER_HEIGHT } from 'styles/constants';
import { getTopicFromID } from 'library/utils';
import { allNormalTopics } from 'library/utils/lists';
import ProfilePic from 'library/components/UI/ProfilePic';
import UserListItemSmall from 'library/components/lists/UserListItemSmall';
import { UserContext } from 'library/utils/UserContext';
import TopicListItemSmall from '../../library/components/lists/TopicListItemSmall';

const DROPDOWNS_HEIGHT = 44;

const SearchScreen = ({ navigation, route }) => {
  // PARAMS
  const {
    textToSearch,
    goalToSearch,
    topicIDsToSearch = [],
    locationToSearch,
    locationLatToSearch,
    locationLonToSearch,
  } = route.params;

  const searchInputRef = useRef(null);
  const insets = useSafeAreaInsets();
  const { activeTab } = useContext(UserContext);

  // STATE
  const [top, setTop] = useState(insets.top); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal
  const [scrollY] = useState(new Animated.Value(0));
  const [searchText, setSearchText] = useState(textToSearch || '');
  const [goal, setGoal] = useState(goalToSearch || null);
  const [topicIDs, setTopics] = useState([...topicIDsToSearch]);
  const [location, setLocation] = useState(locationToSearch);
  const [locationID, setLocationID] = useState(null);
  const [locationLat, setLocationLat] = useState(locationLatToSearch);
  const [locationLon, setLocationLon] = useState(locationLonToSearch);
  const [showFilters, setShowFilters] = useState(locationToSearch || topicIDsToSearch.length > 0 || goalToSearch);
  const [userMatches, setUserMatches] = useState([]);
  const [topicMatches, setTopicMatches] = useState([]);
  const [keyboardShowing, setKeyboardShowing] = useState(false);

  // ////////////////////////////////////////////////////////////////
  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  const { userLoggedIn } = dataUser;

  // SEARCH ALL USERS THAT MATCH SEARCHTEXT
  const { data: userMatchesAll, loading: loadingUsers } = useQuery(USERS_QUERY, {
    variables: {
      first: 10,
      where: {
        OR: [
          { username: { startsWith: searchText, mode: 'insensitive' } },
          { name: { startsWith: searchText, mode: 'insensitive' } },
        ],
      },
    },
  });

  // OTHER HOOKS
  useEffect(() => {
    if (insets.top > 0) {
      setTop(insets.top);
    }
  }, [insets.top]);

  // sync route params w/ state
  useEffect(() => {
    setSearchText(textToSearch || '');
    setGoal(goalToSearch || '');
    setTopics([...topicIDsToSearch]);
    setLocation(locationToSearch || '');
    setLocationLat(locationLatToSearch || '');
    setLocationLon(locationLonToSearch || '');

    // if filters - show filter bar
    const hasActiveFilters = locationToSearch || goalToSearch || topicIDsToSearch.length > 0;

    if (hasActiveFilters) {
      setShowFilters(true);
    }
  }, [route.params]);

  // find topics that start with search criteria
  useEffect(() => {
    const tMatches = allNormalTopics.filter((t) => {
      const { name } = t;
      return name.startsWith(searchText);
    });

    if (searchText.length > 0 && tMatches.length > 0) {
      if (tMatches.length > 1) {
        // if 2 or more mathces
        setTopicMatches([tMatches[0], tMatches[1]]);
      } else {
        // if 1 match
        setTopicMatches([tMatches[0]]);
      }
    } else {
      // if no matches
      setTopicMatches([]);
    }
  }, [searchText]);

  // find users that start with search criteria
  useEffect(() => {
    if (!loadingUsers) {
      if (searchText.length > 0 && userMatchesAll && userMatchesAll.users) {
        setUserMatches(userMatchesAll.users);
      } else {
        setUserMatches([]);
      }
    }

    // if loading, do nothing
  }, [userMatchesAll, loadingUsers]);

  // keep track if keyboard is open
  // useEffect(() => {
  //   Keyboard.addListener('keyboardWillShow', keyboardWillShow);
  //   Keyboard.addListener('keyboardWillHide', keyboardWillHide);

  //   // cleanup function
  //   return () => {
  //     Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
  //     Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
  //   };
  // }, []);

  // const keyboardWillShow = () => {
  //   setKeyboardShowing(true);
  // };

  // const keyboardWillHide = () => {
  //   setKeyboardShowing(false);
  // };

  // ////////////////////////////////////////////////////////////////
  // CONSTANTS
  // const tabsHeight = 0; // set to 42 to use Tabs
  // const HEADER_HEIGHT_WITH_PADDING = HEADER_HEIGHT + insets.top;
  // const topic = getTopicFromID(topicID);
  // const topicSelectText = topic ? topic.name : 'Topic';

  const goalSelectText = goal ? goal.name : 'Goal';
  const locationSelectText = location || 'Location';

  // const SLIDE_HEIGHT = DROPDOWNS_HEIGHT;

  const showSuggestions = keyboardShowing && (topicMatches.length > 0 || userMatches.length > 0);

  const hasTopics = topicIDs.length > 0;

  const topicSelectText = useMemo(() => {
    if (hasTopics) {
      const topicNames = topicIDs.map((topicID) => getTopicFromID(topicID).name);

      // make a string with all topic names, sepearted by comma
      return topicNames.join(', ');
    }

    return 'Topics';
  }, [hasTopics, topicIDs]);

  // ////////////////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS

  const handleRight = () => {
    const hasActiveFilters = location || goal || topicIDs.length > 0;

    // if no filters - hide filter bar
    if (!hasActiveFilters) {
      setShowFilters((prev) => !prev);
    }
  };

  const clearGoal = () => {
    setGoal(null);
    setTopics([]);
  };

  const clearTopic = () => {
    setTopics([]);
  };

  const clearLocation = () => {
    setLocation(null);
    setLocationLat(null);
    setLocationLon(null);
    setLocationID(null);
  };

  // must pass this to location modal
  const handleLocationSelect = (locObject) => {
    if (locObject) {
      setLocation(locObject.location);
      setLocationID(locObject.locationID);
      setLocationLat(locObject.locationLat);
      setLocationLon(locObject.locationLon);
    }
  };

  // must pass this to goal modal
  const handleGoalSelect = (goalInput) => {
    setGoal(goalInput);
    setTopics([]);
  };

  const renderSearchResultsTopics = () => {
    if (!topicMatches || topicMatches.length === 0) return null;

    // if topics - render top two
    return topicMatches.map((t) => {
      return (
        <TopicListItemSmall
          key={t.topicID}
          topic={t}
          onPress={() =>
            navigation.navigate(activeTab || 'HomeStack', {
              screen: 'Topic',
              key: `Topic:${t.topicID}`,
              params: { topicID: t.topicID },
            })
          }
        />
      );
    });
  };

  const renderSearchResultsUsers = () => {
    if (!userMatches || userMatches.length === 0) return null;

    // if users - render all (can scroll for more)
    return userMatches.map((user) => {
      return (
        <UserListItemSmall
          key={user.username}
          user={user}
          onPress={() =>
            navigation.navigate(activeTab || 'HomeStack', {
              screen: 'Profile',
              key: `Profile:${user.username}`,
              params: { username: user.username },
            })
          }
        />
      );
    });
  };

  const suggestionsViewHeight = Math.min(topicMatches.length + userMatches.length, 4) * 52;

  return (
    <View style={{ ...styles.container, paddingTop: top }}>
      <HeaderSearch
        searchText={searchText}
        setSearchText={setSearchText}
        handleRight={handleRight}
        setKeyboardShowing={setKeyboardShowing}
        searchInputRef={searchInputRef}
      />
      {showFilters && !showSuggestions && (
        <View
          style={{
            width: '100%',
            height: DROPDOWNS_HEIGHT,
            backgroundColor: colors.white,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: colors.borderBlack,
          }}
        >
          <ScrollView
            style={{ width: '100%' }}
            contentContainerStyle={styles.selectors}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={hasTopics ? styles.selectorFilled : styles.selector}
              onPress={() => navigation.navigate('SelectSearchTopicsModal', { goal, setTopics, topicsPassedIn: [...topicIDs] })}
            >
              <Text
                activeOpacity={0.7}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  ...defaultStyles.defaultText,
                  color: hasTopics ? colors.white : colors.darkGray,
                  paddingRight: 10,
                  maxWidth: 240,
                  overflow: 'hidden',
                }}
              >
                {topicSelectText}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={
                  hasTopics ? () => clearTopic() : () => navigation.navigate('SelectSearchTopicsModal', { goal, setTopics })
                }
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Ionicons
                  name={hasTopics ? 'close' : 'chevron-down'}
                  size={hasTopics ? 16 : 22}
                  color={hasTopics ? colors.white : colors.darkGray}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={location ? styles.selectorFilled : styles.selector}
              onPress={() => navigation.navigate('EditLocationModal', { initialLocation: location, handleLocationSelect })}
            >
              <Text style={{ ...defaultStyles.defaultText, color: location ? colors.white : colors.darkGray, paddingRight: 10 }}>
                {locationSelectText}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={
                  location
                    ? () => clearLocation()
                    : () => navigation.navigate('EditLocationModal', { initialLocation: location, handleLocationSelect })
                }
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Ionicons
                  name={location ? 'close' : 'chevron-down'}
                  size={location ? 16 : 22}
                  color={location ? colors.white : colors.darkGray}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={goal ? styles.selectorFilled : styles.selector}
              onPress={() => navigation.navigate('SelectGoalModalSearch', { handleGoalSelect })}
            >
              <Text style={{ ...defaultStyles.defaultText, color: goal ? colors.white : colors.darkGray, paddingRight: 10 }}>
                {goalSelectText}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={goal ? () => clearGoal() : () => navigation.navigate('SelectGoalModalSearch', { handleGoalSelect })}
                hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
              >
                <Ionicons
                  name={goal ? 'close' : 'chevron-down'}
                  size={goal ? 16 : 22}
                  color={goal ? colors.white : colors.darkGray}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
      {/* show top 4 results - users & topics */}
      {showSuggestions && (
        <View style={{ ...styles.suggestionsView, height: suggestionsViewHeight }}>
          <ScrollView
            style={{ flex: 1, top: -1 }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            disableScrollViewPanResponder
          >
            {renderSearchResultsTopics()}
            {renderSearchResultsUsers()}
          </ScrollView>
        </View>
      )}
      <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
        <SearchTimeline
          navigation={navigation}
          searchText={searchText}
          goal={goal ? goal.name : ''}
          topicIDs={topicIDs}
          locationLat={locationLat}
          locationLon={locationLon}
          scrollY={scrollY}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // overflow: 'hidden',
  },
  // dropdowns
  selectors: {
    // width: '100%',
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  selector: {
    borderRadius: 8,
    backgroundColor: colors.searchGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 10,
  },
  selectorFilled: {
    borderRadius: 10,
    backgroundColor: colors.purp,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 10,
  },
  suggestionsView: {
    backgroundColor: 'white',
    height: 52,
    maxHeight: 208,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});

export default SearchScreen;
