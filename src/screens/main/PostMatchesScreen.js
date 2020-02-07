import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import HeaderBack from 'library/components/headers/HeaderBack';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import SuggestedConnection from 'library/components/lists/SuggestedConnection';
import Post from 'library/components/post/Post';

const PostMatchesScreen = ({ navigation }) => {
  // PARAMS
  const post = navigation.getParam('post', null);
  const matches = navigation.getParam('matches', []);

  const currentTime = new Date();

  // RENDER FUNCTIONS

  const renderMatches = () => {
    if (!matches) return null;

    if (matches.length < 1) {
      return (
        <>
          <View style={styles.sectionHeader}>
            <Text style={defaultStyles.headerSmall}>Matches</Text>
            <Text style={{ ...defaultStyles.defaultMuteItalic, paddingTop: 15, paddingLeft: 2 }}>No matches yet</Text>
          </View>
        </>
      );
    }

    return (
      <>
        <View style={styles.sectionHeader}>
          <Text style={defaultStyles.headerSmall}>Matches</Text>
        </View>
        {matches.map((item, i) => {
          // if (i > 2) return null;
          return (
            <View key={item.user.id}>
              <SuggestedConnection item={item} navigation={navigation} />
            </View>
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="Goal Matches" />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 20 }}>
        {post && (
          <>
            <View style={{ height: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.borderBlack }} />
            <Post post={post} currentTime={currentTime} navigation={navigation} hideButtons />
          </>
        )}
        {renderMatches()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 10,
    backgroundColor: 'white',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});

export default PostMatchesScreen;
