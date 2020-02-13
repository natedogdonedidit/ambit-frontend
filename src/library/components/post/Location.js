import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const Location = ({ navigation, location, locationLat, locationLon }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Search', {
          locationToSearch: location,
          locationLatToSearch: locationLat,
          locationLonToSearch: locationLon,
        })
      }
      activeOpacity={0.9}
    >
      <View style={styles.topic}>
        <Text style={defaultStyles.smallMute}>{location}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Location;

const styles = StyleSheet.create({
  topic: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    borderRadius: 10,
    paddingHorizontal: 9,
    backgroundColor: colors.grayButton,
    marginRight: 6,
    marginBottom: 6,
  },
});
