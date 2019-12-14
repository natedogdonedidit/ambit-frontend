import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';

import TextButton from 'library/components/UI/buttons/TextButton';

const HeaderPic = ({ handleLeft, handleRight, textRight, title, user }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.leftSide} onPress={() => handleLeft()}>
        <ProfilePic user={user} size={30} disableVideo disableClick />
      </TouchableOpacity>
      <TouchableOpacity style={styles.middleSection} onPress={() => null}>
        <View style={styles.searchBar}>
          <Icon name="search" size={15} color={colors.iconGray} />
          <Text style={{ ...defaultStyles.defaultText, paddingLeft: 35 }}>Search for people</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightSide} onPres={() => null}>
        <Icon name="cog" size={20} color={colors.iconGray} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
    backgroundColor: 'white',
  },
  leftSide: {
    width: 60,
    alignItems: 'flex-start',
  },
  rightSide: {
    width: 60,
    alignItems: 'flex-end',
  },
  middleSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 10,
  },
  searchBar: {
    width: '100%',
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lightGray,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default HeaderPic;
