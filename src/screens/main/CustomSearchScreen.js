import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, ScrollView, Switch } from 'react-native';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import BigButton from 'library/components/UI/buttons/BigButton';

const CustomSearchScreen = ({ navigation }) => {
  const [switch1, setSwitch1] = useState(true);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(true);
  const [switch4, setSwitch4] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWhite
        handleLeft={() => navigation.goBack()}
        handleLeft={() => navigation.goBack()}
        textLeft="Back"
        textRight="Apply"
        title="Custom Search"
      />
      <ScrollView style={{ flex: 1, width: '100%' }}>
        {/* <View style={styles.header}>
          <Text
            style={{
              ...defaultStyles.largeDisplay,
              width: '100%',
              // color: colors.purp,
              textAlign: 'center',
              paddingVertical: 20,
            }}
          >
            Build custom searches for your timeline
          </Text>
        </View> */}
        <View style={styles.searchSection}>
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Text style={{ ...defaultStyles.defaultMute, paddingLeft: 15 }}>Add goals</Text>
            </View>
            <Icon name="plus-circle" size={30} color={colors.purp} />
          </View>
        </View>
        {/* <View style={styles.searchSection}>
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Text style={{ ...defaultStyles.defaultMute, paddingLeft: 15 }}>Add keywords</Text>
            </View>
            <Icon name="plus-circle" size={30} color={colors.purp} />
          </View>
        </View> */}
        <View style={styles.searchSection}>
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Text style={{ ...defaultStyles.defaultMute, paddingLeft: 15 }}>Add topics</Text>
            </View>
            <Icon name="plus-circle" size={30} color={colors.purp} />
          </View>
        </View>
        <View style={styles.searchSection}>
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Text style={{ ...defaultStyles.defaultMute, paddingLeft: 15 }}>Add locations</Text>
            </View>
            <Icon name="plus-circle" size={30} color={colors.purp} />
          </View>
        </View>
        {/* <View style={styles.switchRow}>
          <Text style={{ ...defaultStyles.largeLight, flex: 1 }}>Show goals</Text>
          <Switch
            trackColor={{ false: colors.iconGray, true: colors.purp }}
            onValueChange={val => setSwitch1(val)}
            value={switch1}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={{ ...defaultStyles.largeLight, flex: 1 }}>Show posts</Text>
          <Switch
            trackColor={{ false: colors.iconGray, true: colors.purp }}
            onValueChange={val => setSwitch2(val)}
            value={switch2}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={{ ...defaultStyles.largeLight, flex: 1 }}>Show meeting updates</Text>
          <Switch
            trackColor={{ false: colors.iconGray, true: colors.purp }}
            onValueChange={val => setSwitch3(val)}
            value={switch3}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={{ ...defaultStyles.largeLight, flex: 1 }}>Show new connections</Text>
          <Switch
            trackColor={{ false: colors.iconGray, true: colors.purp }}
            onValueChange={val => setSwitch4(val)}
            value={switch4}
          />
        </View>
        <View style={{ padding: 15, paddingTop: 30 }}>
          <BigButton buttonStyle={{ width: '100%' }}>Save</BigButton>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.lightLightGray,
    padding: 20,
  },
  header: {
    width: '100%',
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchSection: {
    padding: 15,
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 34,
    borderRadius: 15,
    backgroundColor: colors.lightGray,
    marginRight: 15,
    justifyContent: 'center',
  },
  switchRow: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

CustomSearchScreen.navigationOptions = {
  title: 'Custom Search',
};

export default CustomSearchScreen;
