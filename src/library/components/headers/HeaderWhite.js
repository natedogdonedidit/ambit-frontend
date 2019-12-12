import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSafeArea } from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import TextButton from 'library/components/UI/TextButton';

const HeaderWhite = ({ handleLeft, handleRight, textLeft, textRight, title }) => {
  const insets = useSafeArea();
  return (
    <View style={{ ...styles.container, paddingTop: insets.top, height: 44 + insets.top }}>
      <TextButton textStyle={styles.closeButtonText} onPress={handleLeft}>
        {textLeft}
      </TextButton>
      <Text style={{ ...defaultStyles.headerTitle, ...styles.headerTitle }}>{title}</Text>
      <TextButton textStyle={styles.saveButtonText} onPress={handleRight}>
        {textRight}
      </TextButton>
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    backgroundColor: colors.lightLightGray,
  },
  closeButtonText: {
    width: 60,
    textAlign: 'left',
    ...defaultStyles.largeMedium,
    color: colors.iosBlue,
  },
  saveButtonText: {
    width: 60,
    textAlign: 'right',
    ...defaultStyles.largeMedium,
    color: colors.iosBlue,
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: 'center',
  },
});

export default HeaderWhite;
