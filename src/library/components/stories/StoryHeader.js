import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { timeDifference } from 'library/utils';
import ProfilePic from 'library/components/UI/ProfilePic';

const StoryHeader = ({ activeStory, activeIndex, isPreview, navigation }) => {
  const [timeOfDay] = useState(new Date());
  const { items } = activeStory;
  const activeItem = { ...items[activeIndex] };

  const { owner } = activeItem;

  if (!owner) return null;

  const createdAt = new Date(activeItem.createdAt);
  const { timeDiff, period } = timeDifference(timeOfDay, createdAt);

  return (
    <View style={styles.absoluteTop}>
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            if (!isPreview) navigation.navigate('Profile', { profileId: owner.id });
          }}
        >
          <View style={styles.header}>
            <ProfilePic size="small" user={owner} navigation={navigation} disableVideo />
            <View>
              <Text style={{ ...defaultStyles.defaultBold, color: 'white', paddingLeft: 8 }}>{owner.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 8 }}>
                {owner.headline && (
                  <Text style={{ ...defaultStyles.smallRegular, fontSize: 13, color: 'white' }}>{owner.headline}</Text>
                )}
                {owner.headline && (
                  <Icon name="circle" solid size={2} color={colors.white} style={{ alignSelf: 'center', paddingHorizontal: 5 }} />
                )}
                <Text style={{ ...defaultStyles.smallRegular, fontSize: 13, color: 'white' }}>
                  {timeDiff} {period}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteTop: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
});

export default StoryHeader;
