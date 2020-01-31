import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useSafeArea } from 'react-native-safe-area-context';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchTimeline from 'library/components/timelines/SearchTimeline';
import HeaderSearch from 'library/components/headers/HeaderSearch';
import Error from 'library/components/UI/Error';
import SearchTabs from 'library/components/search/SearchTabs';
import { HEADER_HEIGHT } from 'styles/constants';
import TimelineTabs from 'library/components/timelines/TimelineTabs';
import { getTopicFromID } from 'library/utils';

const DROPDOWNS_HEIGHT = 40;

const SearchScreen = ({ navigation }) => {
  // PARAMS
  const topicToSearch = navigation.getParam('topicToSearch', '');

  // STATE
  const [scrollY] = useState(new Animated.Value(0));
  const [textInput, setTextInput] = useState('');
  const [goal, setGoal] = useState(null);
  const [topicID, setTopic] = useState(topicToSearch);
  const [location, setLocation] = useState(null);
  const [locationLat, setLocationLat] = useState(null);
  const [locationLon, setLocationLon] = useState(null);
  const [activeTab, setActiveTab] = useState('Top');

  // OTHER HOOKS
  const insets = useSafeArea();

  // ////////////////////////////////////////////////////////////////
  // QUERIES
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  if (errorUser) return <Error error={errorUser} />;
  const { userLoggedIn } = dataUser;

  // ////////////////////////////////////////////////////////////////
  // CONSTANTS
  const tabsHeight = 0; // set to 42 to use Tabs
  const HEADER_HEIGHT_WITH_PADDING = HEADER_HEIGHT + insets.top;
  const topic = getTopicFromID(topicID);
  const goalSelectText = goal || 'Goal';
  const topicSelectText = topic ? topic.name : 'Topic';
  const locationSelectText = location || 'Location';

  const SLIDE_HEIGHT = DROPDOWNS_HEIGHT;

  // ////////////////////////////////////////////////////////////////
  // CUSTOM FUNCTIONS

  const clearGoal = () => {
    setGoal('');
  };

  const clearTopic = () => {
    setTopic('');
  };

  const clearLocation = () => {
    setLocation(null);
    setLocationLat(null);
    setLocationLon(null);
  };

  // must pass this to location modal
  const handleLocationSelect = locObject => {
    if (locObject) {
      setLocation(locObject.location);
      setLocationLat(locObject.locationLat);
      setLocationLon(locObject.locationLon);
    }
  };

  // must pass this to goal modal
  const handleGoalSelect = goalInput => {
    setGoal(goalInput);
  };

  return (
    <View style={styles.container}>
      <HeaderSearch
        user={userLoggedIn}
        handleLeft={() => navigation.goBack()}
        textInput={textInput}
        setTextInput={setTextInput}
      />
      <View style={{ width: '100%', height: DROPDOWNS_HEIGHT, backgroundColor: colors.lightLightGray }}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ ...styles.selectors }} horizontal>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => navigation.navigate('SelectGoalModalSearch', { handleGoalSelect })}
          >
            <Text style={{ ...defaultStyles.defaultText, color: colors.darkGray, paddingRight: 10 }}>{goalSelectText}</Text>
            <TouchableOpacity
              onPress={goal ? () => clearGoal() : () => navigation.navigate('SelectGoalModalSearch', { handleGoalSelect })}
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            >
              <Ionicons name={goal ? 'md-close' : 'md-arrow-dropdown'} size={goal ? 16 : 22} color={colors.blueGray} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selector} onPress={() => navigation.navigate('SelectSearchTopicsModal', { setTopic })}>
            <Text style={{ ...defaultStyles.defaultText, color: colors.darkGray, paddingRight: 10 }}>{topicSelectText}</Text>
            <TouchableOpacity
              onPress={topicID ? () => clearTopic() : () => navigation.navigate('SelectSearchTopicsModal', { setTopic })}
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            >
              <Ionicons name={topicID ? 'md-close' : 'md-arrow-dropdown'} size={topicID ? 16 : 22} color={colors.blueGray} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selector}
            onPress={() => navigation.navigate('EditLocationModal', { initialLocation: location, handleLocationSelect })}
          >
            <Text style={{ ...defaultStyles.defaultText, color: colors.darkGray, paddingRight: 10 }}>{locationSelectText}</Text>
            <TouchableOpacity
              onPress={
                location
                  ? () => clearLocation()
                  : () => navigation.navigate('EditLocationModal', { initialLocation: location, handleLocationSelect })
              }
              hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
            >
              <Ionicons name={location ? 'md-close' : 'md-arrow-dropdown'} size={location ? 16 : 22} color={colors.blueGray} />
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
        <SearchTimeline
          navigation={navigation}
          activeTab={activeTab}
          textInput={textInput}
          goal={goal}
          topicID={topicID}
          locationLat={locationLat}
          locationLon={locationLon}
          scrollY={scrollY}
          paddingTop={0}
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
    width: '100%',
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
});

export default SearchScreen;
