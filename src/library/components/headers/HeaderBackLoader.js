import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { HEADER_HEIGHT } from 'styles/constants';
import Loader from 'library/components/UI/Loader';

import TextButton from 'library/components/UI/buttons/TextButton';

const HeaderBackLoader = ({ navigation, handleRight, textRight, title, loading }) => {
  const insets = useSafeAreaInsets();
  const [top, setTop] = useState(insets.top); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal

  useEffect(() => {
    if (insets.top > 0) {
      setTop(insets.top);
    }
  }, [insets.top]);

  return (
    <View style={{ ...styles.container, paddingTop: top, height: HEADER_HEIGHT + top }}>
      <View style={styles.leftSide}>
        <TouchableOpacity style={styles.leftSide} onPress={() => navigation.goBack()}>
          <Ionicons name="ios-chevron-back" size={28} color={colors.purp} style={{}} />
        </TouchableOpacity>
      </View>

      <View style={styles.middle}>
        <Text style={{ ...defaultStyles.headerSmall, ...styles.headerText }}>{title}</Text>
      </View>

      <View style={styles.rightSide}>
        {loading ? (
          <Loader loading={loading} size="small" paddingLeft={40} />
        ) : (
          <TextButton textStyle={styles.rightText} onPress={handleRight}>
            {textRight}
          </TextButton>
        )}
      </View>
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
    paddingHorizontal: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    backgroundColor: colors.white,
  },
  leftSide: {
    width: 100,
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
    width: 100,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 5,
  },
  // contents
  leftText: {
    ...defaultStyles.largeMedium,
    color: colors.iosBlue,
  },
  rightText: {
    width: 100,
    textAlign: 'right',
    ...defaultStyles.largeMedium,
    color: colors.iosBlue,
  },
  headerText: {
    flexGrow: 1,
    textAlign: 'center',
  },
});

export default HeaderBackLoader;
