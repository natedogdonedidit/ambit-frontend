import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery } from '@apollo/client';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import { HEADER_HEIGHT } from 'styles/constants';
import { useNavigation } from '@react-navigation/native';
import StoriesHome from 'library/components/stories/StoriesHome';
import HomeTimelineTabs from 'library/components/UI/HomeTimelineTabs';
import MessagesDot from '../UI/icons/MessagesDot';

const HeaderHome = ({ handleMiddle, activeTimeline, setActiveTimeline }) => {
  const navigation = useNavigation();

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = data;

  return (
    <View>
      <View style={{ ...styles.header }}>
        <TouchableOpacity style={styles.leftSide} onPress={() => navigation.openDrawer()}>
          <ProfilePic user={userLoggedIn} size="small" enableIntro={false} enableStory={false} enableClick={false} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.middleSection} onPress={handleMiddle}>
          <Text style={{ ...defaultStyles.ambitLogo }}>ambit</Text>
        </TouchableOpacity>
        <View style={styles.rightSide}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MyTopicsList')}
            hitSlop={{ top: 5, bottom: 5, right: 5, left: 5 }}
          >
            <View style={styles.iconCircle}>
              <Icon name="star" solid size={16} color={colors.black} style={{ paddingLeft: 1 }} />
            </View>
          </TouchableOpacity>
          <MessagesDot />
        </View>
      </View>
      <StoriesHome />
      <HomeTimelineTabs activeTimeline={activeTimeline} setActiveTimeline={setActiveTimeline} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 10,
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
  leftSide: {
    width: 60,
    // alignItems: 'flex-start',
  },
  rightSide: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  middleSection: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  iconCircle: {
    height: 34,
    width: 34,
    marginLeft: 8,
    borderRadius: 17,
    backgroundColor: colors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderHome;
