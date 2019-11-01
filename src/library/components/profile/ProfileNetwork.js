import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const ProfileNetwork = () => {
  return (
    <View style={styles.content}>
      <Text style={{ ...defaultStyles.defaultMute, fontSize: 16, textAlign: 'center', paddingTop: 30 }}>
        Pictures & videos grid
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    height: 650,
  },
});

export default ProfileNetwork;
