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
import { investorList } from 'library/utils/lists';

const SelectInvestorModal = ({ navigation }) => {
  const saveInvestorFields = navigation.getParam('saveInvestorFields');
  const fieldsPassedIn = navigation.getParam('investorFields');

  const [fieldsSelected, setFieldsSelected] = useState(fieldsPassedIn);

  // passed to 2nd modal
  const selectField = selectedField => {
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
    saveInvestorFields(fieldsSelected);
    navigation.goBack();
  };

  const clearOut = () => setFieldsSelected([]);

  const renderList = () => {
    return investorList.map(listItem => {
      const isSelected = fieldsSelected.includes(listItem);

      return (
        <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => selectField(listItem)}>
          <View style={styles.itemRow}>
            <Text style={defaultStyles.defaultText}>{listItem}</Text>
            {isSelected && (
              <View style={{ height: 40, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
                <Icon name="check" size={20} color={colors.green} />
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
          <View style={{ width: '100%', paddingHorizontal: 40, paddingTop: 30, alignItems: 'center' }}>
            <Icon name="comment-dollar" size={40} color={colors.green} />
            <Text
              style={{
                ...defaultStyles.hugeSemibold,
                color: colors.green,
                textAlign: 'center',
                paddingBottom: 20,
                paddingTop: 20,
              }}
            >
              Select the market(s) you are open to invest in:
            </Text>
          </View>

          <View style={{ padding: 15 }}>{renderList()}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectInvestorModal;

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
