import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Modal, SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';
import HeaderWhite from 'library/components/headers/HeaderWhite';

const EditLocationModal = ({
  user,
  locModalVisible,
  setLocModalVisible,
  location,
  setLocation,
  locationCord,
  setLocationCord,
}) => {
  const didMountRef = useRef(false);
  const [locationInput, setLocationInput] = useState(location);
  const [locationList, setLocationList] = useState([]);

  async function getLocationsFromAPI() {
    const app_id = 'h9qumdLXOxidgnOtyADi';
    const app_code = 'AeO_1-X9yngGRO4RHd_IsQ';
    const url = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${app_id}&app_code=${app_code}&query=${locationInput}&maxresults=20&country=USA&resultType=areas`;

    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const resJson = await res.json();
        let cities = [];
        if (resJson.suggestions) {
          cities = resJson.suggestions.filter(loc => loc.matchLevel === 'city');
        }
        console.log(cities);
        setLocationList(cities);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (didMountRef.current) {
      getLocationsFromAPI();
    } else {
      didMountRef.current = true;
    }
  }, [locationInput]);

  const handleCancel = () => {
    // set these back to whats in the database
    setLocation(user.location);
    setLocationCord(user.locationCord);
    setLocationInput(location);
    setLocationList([]);
    setLocModalVisible(false);
  };

  const handleDone = () => {
    setLocModalVisible(false);
  };

  const renderLocations = () => {
    if (locationList.length < 1) return null;

    return locationList.map((loc, i) => {
      return (
        <View key={i} style={styles.location}>
          <Text style={defaultStyles.defaultText}>
            {loc.address.city}, {loc.address.state}
          </Text>
        </View>
      );
    });
  };

  return (
    <Modal animationType="slide" visible={locModalVisible}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <HeaderWhite handleLeft={handleCancel} handleRight={handleDone} textLeft="Cancel" textRight="Done" title="Location" />
          <View style={styles.inputRow}>
            <TextInput
              style={{ ...styles.input, ...defaultStyles.defaultText }}
              onChangeText={val => setLocationInput(val)}
              value={locationInput}
              placeholder="Search for location"
              autoFocus
            />
            <TouchableOpacity onPress={() => setLocationInput('')} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
              <Icon name="times-circle" solid size={15} color={colors.darkGray} />
            </TouchableOpacity>
          </View>
          <View style={styles.grayBox} />
          <ScrollView style={styles.locationList}>{renderLocations()}</ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default EditLocationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,

    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingRight: 20,
    paddingVertical: 10,
  },
  grayBox: {
    width: '100%',
    height: 10,
    backgroundColor: colors.lightGray,
  },
  locationList: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    width: '100%',
    height: 60,
  },
  location: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});
