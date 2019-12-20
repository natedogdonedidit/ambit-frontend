import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { HEADER_HEIGHT } from 'styles/constants';

// Header Height is 44 !!!
// insets.top is used as padding under the StatusBar

const HeaderSearch = ({ user, handleLeft, handleRight }) => {
  const insets = useSafeArea();
  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftSide} onPress={handleLeft}>
          <Ionicons name="ios-arrow-back" size={28} color={colors.iosBlue} style={{}} />
        </TouchableOpacity>

        <View style={styles.middle}>
          <View style={styles.searchBarView} />
        </View>

        <TouchableOpacity style={styles.rightSide} onPress={handleRight}>
          <Ionicons name="ios-rocket" size={24} color={colors.iconGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
    backgroundColor: colors.lightLightGray,
  },
  // top portion
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSide: {
    width: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  middle: {
    flexDirection: 'row',
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    width: 35,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchBarView: {
    width: '100%',
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.searchGray,
  },
});

export default HeaderSearch;
