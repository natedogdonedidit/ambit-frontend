import React, { useState, useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Text, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
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

const DROPDOWNS_HEIGHT = 40;

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

  // STATE
  const [scrollY] = useState(new Animated.Value(0));
  const [textInput, setTextInput] = useState(textToSearch || '');
  const [goal, setGoal] = useState(goalToSearch || null);
  const [topicIDs, setTopics] = useState([...topicIDsToSearch]);
  const [location, setLocation] = useState(locationToSearch);
  const [locationID, setLocationID] = useState(null);
  const [locationLat, setLocationLat] = useState(locationLatToSearch);
  const [locationLon, setLocationLon] = useState(locationLonToSearch);
  const [activeTab, setActiveTab] = useState('Top');

  // OTHER HOOKS
  const insets = useSafeAreaInsets();

  // ////////////////////////////////////////////////////////////////
  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  const { userLoggedIn } = dataUser;

  // ////////////////////////////////////////////////////////////////
  // CONSTANTS
  // const tabsHeight = 0; // set to 42 to use Tabs
  // const HEADER_HEIGHT_WITH_PADDING = HEADER_HEIGHT + insets.top;
  // const topic = getTopicFromID(topicID);
  // const topicSelectText = topic ? topic.name : 'Topic';

  const goalSelectText = goal ? goal.name : 'Goal';
  const locationSelectText = location || 'Location';

  // const SLIDE_HEIGHT = DROPDOWNS_HEIGHT;

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

  return (
    <View style={styles.container}>
      <HeaderSearch
        user={userLoggedIn}
        handleLeft={() => navigation.goBack()}
        textInput={textInput}
        setTextInput={setTextInput}
      />
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
                name={goal ? 'md-close' : 'md-arrow-dropdown'}
                size={goal ? 16 : 22}
                color={goal ? colors.white : colors.darkGray}
              />
            </TouchableOpacity>
          </TouchableOpacity>
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
              onPress={hasTopics ? () => clearTopic() : () => navigation.navigate('SelectSearchTopicsModal', { goal, setTopics })}
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            >
              <Ionicons
                name={hasTopics ? 'md-close' : 'md-arrow-dropdown'}
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
                name={location ? 'md-close' : 'md-arrow-dropdown'}
                size={location ? 16 : 22}
                color={location ? colors.white : colors.darkGray}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
        <SearchTimeline
          navigation={navigation}
          activeTab={activeTab}
          textInput={textInput}
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
    backgroundColor: colors.lightGray,
    // overflow: 'hidden',
  },
  // dropdowns
  selectors: {
    // width: '100%',
    flexDirection: 'row',
    paddingVertical: 5,
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
    borderRadius: 8,
    backgroundColor: colors.blueGray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginRight: 10,
  },
});

export default SearchScreen;
