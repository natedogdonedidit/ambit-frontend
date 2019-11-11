import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';

const EditLocationRadiusModal = ({ navigation }) => {
  // make sure these params get passed in!!
  const initialLocation = navigation.getParam('initialLocation');
  const handleLocationSelect = navigation.getParam('handleLocationSelect');
  const radius = navigation.getParam('radius');
  const setRadius = navigation.getParam('setRadius');

  const didMountRef = useRef(false);
  const [locationInput, setLocationInput] = useState(initialLocation);
  const [locationList, setLocationList] = useState([]);
  const [locationObjectSelected, setLocationObjectSelected] = useState(null);
  const [radiusText, setRadiusText] = useState(radius);
  const [selecting, setSelecting] = useState(false);

  async function getLocationsFromAPI() {
    const app_id = 'h9qumdLXOxidgnOtyADi';
    const app_code = 'AeO_1-X9yngGRO4RHd_IsQ';
    const url = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?app_id=${app_id}&app_code=${app_code}&query=${locationInput}&maxresults=20&country=USA&resultType=areas`;

    if (!selecting) {
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
    } else {
      setSelecting(false);
      setLocationList([]);
    }
  }

  async function getSingleLocationFromAPI(locationId) {
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
          return { location: loc, locationLat: lat, locationLon: lon };
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

  const handleDone = () => {
    setRadius(radiusText || '10');
    if (locationObjectSelected) {
      handleLocationSelect(locationObjectSelected);
    }
    navigation.goBack();
  };

  const handleSelect = async id => {
    try {
      const locObject = await getSingleLocationFromAPI(id);
      if (!locObject) {
        Alert.alert('Oh no!', 'We could not get that location at this time. Try again later!', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
      }
      setSelecting(true); // so we dont populate the list
      setLocationInput(locObject.location);
      setLocationObjectSelected(locObject);
      // handleLocationSelect(locObject);
      // navigation.goBack();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderWhite
        handleLeft={handleCancel}
        handleRight={handleDone}
        textLeft="Cancel"
        textRight="Done"
        title="Timeline Location"
      />
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
          placeholder="San Francisco, CA"
          autoFocus
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
    </SafeAreaView>
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
