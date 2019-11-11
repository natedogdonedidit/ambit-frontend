import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Location = ({ location }) => {
  return (
    <View style={styles.locationView}>
      <Icon name="map-marker" size={15} color={colors.iconGray} />
      <Text numberOfLines={1} ellipsizeMode="tail" style={{ ...defaultStyles.smallMute, ...styles.locationText }}>
        {location}
      </Text>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  locationView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    paddingLeft: 5,
  },
});
