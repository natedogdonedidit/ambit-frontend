import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import SmallProfilePic from 'library/components/UI/SmallProfilePic';

const HeaderHome = ({ navigation, activeTimeline, setActiveTimeline, setNewPostModalVisible }) => {
  const selectBorder = () => {
    if (activeTimeline === 0) return { ...styles.timelineButton, borderRightColor: 'white', borderRightWidth: 1 };
    if (activeTimeline === 1) return { ...styles.timelineButtonActive };
    if (activeTimeline === 2) return { ...styles.timelineButton, borderLeftColor: 'white', borderLeftWidth: 1 };
    return styles.timelineButton;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <SmallProfilePic />
      </TouchableOpacity>

      <View style={styles.timelineSelector}>
        <View style={activeTimeline === 0 ? { ...styles.timelineButtonActive } : { ...styles.timelineButton }}>
          <TouchableOpacity onPress={() => setActiveTimeline(0)} style={styles.timelineSelectorTouchable} activeOpacity={0.7}>
            <Icon name="globe-americas" size={15} color={activeTimeline === 0 ? colors.darkGray : 'white'} />
          </TouchableOpacity>
        </View>
        <View style={selectBorder()}>
          <TouchableOpacity onPress={() => setActiveTimeline(1)} style={styles.timelineSelectorTouchable} activeOpacity={0.7}>
            <Icon name="map-marker-alt" size={15} color={activeTimeline === 1 ? colors.darkGray : 'white'} />
          </TouchableOpacity>
        </View>
        <View style={activeTimeline === 2 ? { ...styles.timelineButtonActive } : { ...styles.timelineButton }}>
          <TouchableOpacity onPress={() => setActiveTimeline(2)} style={styles.timelineSelectorTouchable} activeOpacity={0.7}>
            <Icon name="user" solid size={15} color={activeTimeline === 2 ? colors.darkGray : 'white'} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => setNewPostModalVisible(true)}>
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
    height: 44,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  timelineSelector: {
    width: '60%', // make this more responsive later
    height: 28,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  timelineSelectorTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineButtonActive: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  borderLeftRight: {
    borderRightColor: 'white',
    borderRightWidth: 1,
    borderLeftColor: 'white',
    borderLeftWidth: 1,
  },
});

export default HeaderHome;
