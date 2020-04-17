import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeArea } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { HEADER_HEIGHT } from 'styles/constants';

const HeaderBackBlank = ({ navigation, title, rightComponent, leftText = '' }) => {
  const insets = useSafeArea();
  return (
    <View style={{ ...styles.container, paddingTop: insets.top, height: HEADER_HEIGHT + insets.top }}>
      <View style={styles.leftSide}>
        <TouchableOpacity style={styles.leftSide} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-back" size={28} color={colors.purp} style={{}} />
          <Text style={{ ...defaultStyles.largeMedium, color: colors.purp, paddingLeft: 5, paddingBottom: 2 }}>{leftText}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.middle}>
        <Text style={{ ...defaultStyles.headerSmall, ...styles.headerText }}>{title}</Text>
      </View>

      <View style={styles.rightSide}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 44,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  leftSide: {
    width: 60,
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
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // contents
  headerText: {
    flexGrow: 1,
    textAlign: 'center',
  },
});

export default HeaderBackBlank;
