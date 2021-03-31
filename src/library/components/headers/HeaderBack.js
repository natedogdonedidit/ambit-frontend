import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { HEADER_HEIGHT } from 'styles/constants';

import TextButton from 'library/components/UI/buttons/TextButton';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';
import { useNavigation } from '@react-navigation/native';

const HeaderBack = ({ handleRight, textRight, title, solidRight, showTopicSearch }) => {
  const insets = useSafeAreaInsets();
  const [top, setTop] = useState(insets.top); // had to do this to save initial insets.top to state. otherwise top padding jumps after you close a modal
  const navigation = useNavigation();

  useEffect(() => {
    if (insets.top > 0) {
      setTop(insets.top);
    }
  }, [insets.top]);

  const renderRightSide = () => {
    if (showTopicSearch) {
      // return <ComponentRight />;
      return (
        <TouchableOpacity
          style={styles.iconCircle}
          onPress={() => navigation.navigate('SelectTopicsFocusModal')}
          hitSlop={{ top: 15, bottom: 15, right: 15, left: 15 }}
        >
          <Icon name="search" size={16} color={colors.black} style={{ paddingLeft: 1 }} />
        </TouchableOpacity>
      );
    }

    if (solidRight) {
      return <ButtonHeader onPress={handleRight}>{textRight}</ButtonHeader>;
    }

    if (textRight) {
      return (
        <TextButton textStyle={styles.rightText} onPress={handleRight}>
          {textRight}
        </TextButton>
      );
    }

    return null;
  };

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

      <View style={styles.rightSide}>{renderRightSide()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    // paddingLeft: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    backgroundColor: colors.white,
    // backgroundColor: colors.white,
  },
  leftSide: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  middle: {
    flexDirection: 'row',
    flex: 1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSide: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  // contents
  leftText: {
    ...defaultStyles.largeMedium,
    color: colors.iosBlue,
  },
  rightText: {
    width: 80,
    textAlign: 'right',
    ...defaultStyles.largeMedium,
    color: colors.iosBlue,
  },
  headerText: {
    flexGrow: 1,
    textAlign: 'center',
  },
  iconCircle: {
    height: 34,
    width: 34,
    marginRight: 4,
    borderRadius: 17,
    backgroundColor: colors.systemGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderBack;
