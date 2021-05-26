import React from 'react';
import {StyleSheet, View, Text, Dimensions, LogBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {SafeAreaView} from 'react-native-safe-area-context';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import StoryTapRegions from 'library/components/stories/StoryTapRegions';

function NoMoreStories({tryGoToPrevStory}) {
  const {width} = Dimensions.get('window');

  const navigation = useNavigation();

  LogBox.ignoreLogs([
    'VirtualizedList: missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor.',
  ]);

  return (
    <SafeAreaView style={{...styles.container, width}}>
      <View style={{flex: 1, backgroundColor: colors.black}}>
        <Text
          style={{
            paddingTop: 200,
            ...defaultStyles.hugeBold,
            textAlign: 'center',
            color: 'white',
          }}>
          You've seen it all
        </Text>
        <Text
          style={{
            ...defaultStyles.hugeBold,
            textAlign: 'center',
            color: 'white',
          }}>
          Check back soon!
        </Text>
        <Text
          style={{
            ...defaultStyles.hugeBold,
            textAlign: 'center',
            color: 'white',
          }}>
          ✌🏻
        </Text>

        {/* absolute positioned stuff */}
        <StoryTapRegions
          decrementIndex={() => tryGoToPrevStory()}
          incrementIndex={() => navigation.goBack()}
          handleDoubleTap={() => null}
          setPaused={() => null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});

export default React.memo(NoMoreStories);
