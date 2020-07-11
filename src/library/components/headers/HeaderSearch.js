import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { HEADER_HEIGHT } from 'styles/constants';

// Header Height is 44 !!!
// insets.top is used as padding under the StatusBar

const HeaderSearch = ({ user, handleLeft, handleRight, textInput, setTextInput }) => {
  const insets = useSafeArea();
  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftSide} onPress={handleLeft}>
          <Ionicons name="ios-arrow-back" size={28} color={colors.iosBlue} style={{}} />
        </TouchableOpacity>

        <View style={styles.middle}>
          <Icon name="search" size={18} color={colors.blueGray} />
          <TextInput
            style={{ ...styles.searchBarView, ...defaultStyles.defaultText, color: colors.darkGray }}
            onChangeText={val => setTextInput(val)}
            value={textInput}
            placeholder="Search Ambit"
            maxLength={50}
          />
        </View>

        {/* <TouchableOpacity style={styles.rightSide} onPress={handleRight}>
          <Ionicons name="ios-rocket" size={24} color={colors.iconGray} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderBlack,
    backgroundColor: colors.white,
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
    backgroundColor: colors.searchGray,
    height: 36,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  rightSide: {
    width: 35,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchBarView: {
    flex: 1,
    // backgroundColor: colors.searchGray,
    paddingLeft: 10,
  },
});

export default HeaderSearch;
