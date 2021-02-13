import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';

const EditLocationModal = ({ navigation, route }) => {
  // make sure these params get passed in!!
  const { initialLocation, handleLocationSelect } = route.params;

  const didMountRef = useRef(false);
  const [locationInput, setLocationInput] = useState(initialLocation);
  const [locationList, setLocationList] = useState([]);

  async function getLocationsFromAPI() {
    const app_id = 'h9qumdLXOxidgnOtyADi';
    const app_code = 'AeO_1-X9yngGRO4RHd_IsQ';
    const url = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${app_id}&app_code=${app_code}&query=${locationInput}&maxresults=20&country=USA&resultType=areas`;
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        const resJson = await res.json();
        let cities = [];
        if (resJson.suggestions) {
          cities = resJson.suggestions.filter((loc) => loc.matchLevel === 'city');
        }
        setLocationList(cities);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getSingleLocationFromAPI(locationId) {
    const app_id = 'h9qumdLXOxidgnOtyADi';
    const app_code = 'AeO_1-X9yngGRO4RHd_IsQ';
    const url = `http://geocoder.api.here.com/6.2/geocode.json?app_id=${app_id}&app_code=${app_code}&locationid=${locationId}&jsonattributes=1&gen=9`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const responseJson = await response.json();
        // console.log(responseJson);
        if (responseJson.response) {
          const loc = `${responseJson.response.view[0].result[0].location.address.city}, ${responseJson.response.view[0].result[0].location.address.state}`;
          const lat = responseJson.response.view[0].result[0].location.displayPosition.latitude;
          const lon = responseJson.response.view[0].result[0].location.displayPosition.longitude;
          const id = responseJson.response.view[0].result[0].location.locationId;
          return { location: loc, locationID: id, locationLat: lat, locationLon: lon };
        }
      }
      return null;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // if its not the first render, run the API
  useEffect(() => {
    if (didMountRef.current) {
      getLocationsFromAPI();
    } else {
      didMountRef.current = true;
    }
  }, [locationInput]);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSelect = async (id) => {
    try {
      const locObject = await getSingleLocationFromAPI(id);
      // console.log(locObject);
      if (!locObject) {
        Alert.alert('Oh no!', 'We could not get that location at this time. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
      handleLocationSelect(locObject);
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Oh no!', 'We could not get that location at this time. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

  const renderLocations = () => {
    if (locationList.length < 1) return null;

    return locationList.map((loc, i) => {
      return (
        <TouchableOpacity key={i} onPress={() => handleSelect(loc.locationId)}>
          <View style={styles.location}>
            <Text style={defaultStyles.defaultText}>
              {loc.address.city}, {loc.address.state}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderWhite handleLeft={handleCancel} handleRight={null} textLeft="Cancel" textRight="" title="Location" />
      <View style={styles.inputRow}>
        <TextInput
          style={{ ...styles.input, ...defaultStyles.defaultText }}
          onChangeText={(val) => setLocationInput(val)}
          value={locationInput}
          placeholder="San Francisco, CA"
          autoFocus
          autoCompleteType="off"
          textContentType="none"
        />
        <TouchableOpacity onPress={() => setLocationInput('')} hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
          <Icon name="times-circle" solid size={15} color={colors.iconGray} />
        </TouchableOpacity>
      </View>
      <View style={styles.grayBox} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView style={styles.locationList} keyboardShouldPersistTaps="always">
          {renderLocations()}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
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
