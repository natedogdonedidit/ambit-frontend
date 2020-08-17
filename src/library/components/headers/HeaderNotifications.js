import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useQuery } from '@apollo/client';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';
import { HEADER_HEIGHT } from 'styles/constants';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';

const HeaderNotifications = ({ navigation, handleMiddle, handleRight }) => {
  // console.disableYellowBox = true;

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  if (loading) return null;

  const { userLoggedIn } = data;

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity style={styles.leftSide} onPress={() => navigation.openDrawer()}>
        <ProfilePic user={userLoggedIn} size="small" enableIntro={false} enableStory={false} enableClick={false} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.middleSection} onPress={handleMiddle}>
        <Text style={{ ...defaultStyles.headerSmall, color: colors.black }}>Notifications</Text>
      </TouchableOpacity>
      <View style={styles.rightSide} />
      {/* <TouchableOpacity style={styles.rightSide} onPress={handleRight} hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}> */}
      {/* <View style={styles.iconCircle}> */}
      {/* <Icon name="cog" size={20} color={colors.iconDark} /> */}
      {/* </View> */}
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    zIndex: 100,
  },
  leftSide: {
    width: 60,
    alignItems: 'flex-start',
  },
  rightSide: {
    width: 60,
    alignItems: 'flex-end',
  },
  middleSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    height: 34,
    width: 34,
    marginLeft: 5,
    borderRadius: 17,
    backgroundColor: colors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderNotifications;
