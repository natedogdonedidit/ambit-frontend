import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import { industryList } from 'library/utils/lists';

const SelectIndustryModal = ({ navigation }) => {
  const saveIndustryFields = navigation.getParam('saveIndustryFields');
  const fieldsPassedIn = navigation.getParam('industry');

  const [fieldsSelected, setFieldsSelected] = useState(fieldsPassedIn);
  const [warning, setWarning] = useState(false);

  // passed to 2nd modal
  const selectField = selectedField => {
    if (warning) setWarning(false);
    if (fieldsSelected.includes(selectedField)) {
      // remove it
      const newArray = fieldsSelected.filter(field => field !== selectedField);
      setFieldsSelected(newArray);
    } else {
      // add it
      setFieldsSelected(prev => [...prev, selectedField]);
    }
  };

  const handleDone = () => {
    if (fieldsSelected.length < 1) {
      setWarning(true);
      return;
    }
    saveIndustryFields(fieldsSelected);
    navigation.goBack();
  };

  const clearOut = () => setFieldsSelected([]);

  const renderList = () => {
    return industryList.map(listItem => {
      const isSelected = fieldsSelected.includes(listItem);

      return (
        <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => selectField(listItem)}>
          <View style={styles.itemRow}>
            <Text style={defaultStyles.defaultText}>{listItem}</Text>
            {isSelected && (
              <View style={{ height: 40, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
                <Icon name="check" size={20} color={colors.purp} />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <HeaderWhite
          handleLeft={clearOut}
          handleRight={handleDone}
          textLeft="Clear"
          textRight="Done"
          title={fieldsSelected.length > 0 && `${fieldsSelected.length} selected`}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ width: '100%', paddingHorizontal: 40, paddingTop: 30, paddingBottom: 20, alignItems: 'center' }}>
            <Icon name="briefcase" size={40} color={colors.purp} />
            <Text
              style={{
                ...defaultStyles.hugeSemibold,
                color: colors.purp,
                textAlign: 'center',
                paddingTop: 20,
              }}
            >
              Select the industry(s) you work in:
            </Text>
            {warning && (
              <Text
                style={{
                  ...defaultStyles.defaultText,
                  color: colors.peach,
                  textAlign: 'center',
                  paddingTop: 20,
                }}
              >
                Please select at least one industry
              </Text>
            )}
          </View>

          <View style={{ padding: 15 }}>{renderList()}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectIndustryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView: {
    flex: 1,
    width: '100%',
  },
  // categories
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 44,
    paddingHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
  },
  // items
  itemRow: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 15,
  },
});
