import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import { useNavigation } from '@react-navigation/native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const CoolText = ({ children, style = {}, isStory = false }) => {
  const navigation = useNavigation();

  const handleHashtagPress = (hashtag) => {
    console.log('hashtag pressed:', hashtag);
    navigation.navigate('Search', { textToSearch: hashtag });
  };

  const handleUsernamePress = (username) => {
    console.log('username pressed:', username);
    const usernameNoSymbol = username.substr(1);

    navigation.navigate({
      name: 'Profile',
      key: `Profile:${usernameNoSymbol}`,
      params: { username: usernameNoSymbol },
    });
  };

  if (isStory) {
    return (
      <ParsedText
        style={[defaultStyles.defaultText, style]}
        parse={[
          {
            pattern: /\B#[a-z0-9_]+/gi,
            style: { ...defaultStyles.defaultSemibold, color: 'white' },
            // onPress: handleHashtagPress,
          },
          {
            // pattern: /@(\w+)/,
            pattern: /\B@[a-z0-9_]+/gi,
            style: { ...defaultStyles.defaultSemibold, color: 'white' },
            onPress: handleUsernamePress,
          },
        ]}
      >
        {children}
      </ParsedText>
    );
  }

  return (
    <ParsedText
      style={[defaultStyles.defaultText, style]}
      parse={[
        {
          pattern: /\B#[a-z0-9_]+/gi,
          style: { ...defaultStyles.defaultMedium, color: colors.purp },
          onPress: handleHashtagPress,
        },
        {
          // pattern: /@(\w+)/,
          pattern: /\B@[a-z0-9_]+/gi,
          style: { ...defaultStyles.defaultMedium, color: colors.purp },
          onPress: handleUsernamePress,
        },
      ]}
    >
      {children}
    </ParsedText>
  );
};

// const styles = StyleSheet.create({
// text: {
//   ...defaultStyles.defaultText,
// },
// hashtag: {
//   ...defaultStyles.defaultMedium,
//   color: colors.purp,
// },
// username: {
//   ...defaultStyles.defaultMedium,
//   color: colors.purp,
// },
// });

export default CoolText;
