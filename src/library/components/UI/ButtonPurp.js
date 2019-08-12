import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import colors from 'res/colors';

const ButtonDefault = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, { width: props.width, height: props.height }]}>
        <Text style={{ color: 'white' }}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.purp,
    borderRadius: 10,
  },
});

export default ButtonDefault;
