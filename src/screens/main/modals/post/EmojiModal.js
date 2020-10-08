import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';

const EmojiModal = ({ navigation, route }) => {
  const Categories = {
    all: {
      symbol: null,
      name: 'All',
    },
    nature: {
      symbol: '🦄',
      name: 'Animals & Nature',
    },
    food: {
      symbol: '🍔',
      name: 'Food & Drink',
    },
    activities: {
      symbol: '⚾️',
      name: 'Activities',
    },
    places: {
      symbol: '✈️',
      name: 'Travel & Places',
    },
    objects: {
      symbol: '💡',
      name: 'Objects',
    },
    symbols: {
      symbol: '🔣',
      name: 'Symbols',
    },
    flags: {
      symbol: '🏳️‍🌈',
      name: 'Flags',
    },
  };

  // ROUTE PARAMS
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <EmojiSelector category={Categories.all} onEmojiSelected={(emoji) => console.log(emoji)} />
    </SafeAreaView>
  );
};

export default EmojiModal;

const styles = StyleSheet.create({});
