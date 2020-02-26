import React from 'react';
import { StyleSheet } from 'react-native';

import colors from 'styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Bell = ({ color }) => {
  return <Icon name="bell" size={22} color={color} solid />;
};

const styles = StyleSheet.create({});

export default Bell;
