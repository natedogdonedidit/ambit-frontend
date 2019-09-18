import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/TextButton';
import HeaderWhite from 'library/components/headers/HeaderWhite';

const EditLocationRadiusModal = ({
  locModalVisible,
  setLocModalVisible,
  location,
  setLocation,
  locationLat,
  setLocationLat,
  locationLon,
  setLocationLon,
  radius,
  setRadius,
}) => {
  const didMountRef = useRef(false);
  const [locationInput, setLocationInput] = useState(location);
  const [locationList, setLocationList] = useState([]);
  const [radiusText, setRadiusText] = useState(radius);

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
        setLocationList(cities);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getSingleLocationFromAPIandClose(locationId) {
    const app_id = 'h9qumdLXOxidgnOtyADi';
    const app_code = 'AeO_1-X9yngGRO4RHd_IsQ';
    const url = `http://geocoder.api.here.com/6.2/geocode.json?app_id=${app_id}&app_code=${app_code}&locationid=${locationId}&jsonattributes=1&gen=9`;

    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const responseJson = await response.json();
        if (responseJson.response) {
          const loc = `${responseJson.response.view[0].result[0].location.address.city}, ${responseJson.response.view[0].result[0].location.address.state}`;
          const lat = responseJson.response.view[0].result[0].location.displayPosition.latitude;
          const lon = responseJson.response.view[0].result[0].location.displayPosition.longitude;
          setLocation(loc);
          setLocationLat(lat);
          setLocationLon(lon);
          setLocationInput(loc);
          setLocationList([]);
          setLocModalVisible(false);
        }
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
    setLocation(location);
    setLocationLat(locationLat);
    setLocationLon(locationLon);
    setRadius(radiusText || '10');
    setRadiusText(radiusText || '10');
    // reset location state
    setLocationInput(location);
    setLocationList([]);
    setLocModalVisible(false);
  };

  const renderLocations = () => {
    if (locationList.length < 1) return null;

    return locationList.map((loc, i) => {
      return (
        <TouchableOpacity key={i} onPress={() => getSingleLocationFromAPIandClose(loc.locationId)}>
          <View style={styles.location}>
            <Text style={defaultStyles.defaultText}>
              {loc.address.city}, {loc.address.state}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  // const onChangeRadius = text => {};

  return (
    <Modal animationType="slide" visible={locModalVisible} keyboardShouldPersistTaps="always">
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderWhite handleLeft={handleCancel} handleRight={null} textLeft="Done" textRight="" title="Location" />
        <View style={styles.inputRow}>
          <Text style={{ ...defaultStyles.defaultText }}>Search radius:</Text>
          <TextInput
            style={{ ...styles.input, ...defaultStyles.defaultText, paddingHorizontal: 10 }}
            onChangeText={text => setRadiusText(text.replace(/[^0-9]/g, ''))}
            value={radiusText}
            placeholder="50"
            keyboardType="numeric"
          />
          <Text style={{ ...defaultStyles.defaultText, paddingRight: 15 }}>miles</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={{ ...styles.input, ...defaultStyles.defaultText }}
            onChangeText={val => setLocationInput(val)}
            value={locationInput}
            placeholder="Columbus, OH"
            autoFocus
          />
          <TouchableOpacity onPress={() => setLocationInput('')} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
            <Icon name="times-circle" solid size={15} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
        <View style={styles.grayBox} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <ScrollView style={styles.locationList} keyboardShouldPersistTaps="always">
            {renderLocations()}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default EditLocationRadiusModal;

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
  },
  location: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});
