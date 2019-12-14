import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { investmentMarkets } from 'library/utils/lists';

const SelectInvestorModal = ({ navigation }) => {
  const saveInvestorFields = navigation.getParam('saveInvestorFields');
  const fieldsPassedIn = navigation.getParam('investorFields');

  const [fieldsSelected, setFieldsSelected] = useState(fieldsPassedIn);

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
    return investmentMarkets.map(item => {
      const isSelected = fieldsSelected.includes(item);

      return (
        <TouchableOpacity key={item} activeOpacity={0.8} onPress={() => selectField(item)}>
          <View style={{ ...styles.itemRow }}>
            <Text style={{ ...defaultStyles.largeRegular, color: colors.green, flex: 1 }}>{item}</Text>
            <View style={{ height: 48, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
              <Icon name={isSelected ? 'check-circle' : 'circle'} size={20} color={isSelected ? colors.green : colors.iconGray} />
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View
          style={{
            height: 46,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {fieldsSelected.length > 0 && <Text style={defaultStyles.smallMute}>{fieldsSelected.length} selected</Text>}
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={handleDone} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
            <Icon name="chevron-left" size={22} color={colors.iconDark} />
          </TouchableOpacity>
          {fieldsSelected.length > 0 && (
            <TouchableOpacity onPress={handleDone}>
              <View
                style={{
                  backgroundColor: colors.goalGreen,
                  height: 36,
                  borderRadius: 18,
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                }}
              >
                <Text style={defaultStyles.largeMedium}>Done</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.goalGreen,
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            <Icon name="comment-dollar" size={40} color={colors.green} />
          </View>
          <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  ...defaultStyles.headerMedium,
                }}
              >
                Select your target{`\n`}investment markets
              </Text>
              {/* <Icon name="question-circle" size={22} color={colors.iconDark} /> */}
            </View>

            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>
              We will send you any investment opporunities in{`\n`}these markets
            </Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: 34, justifyContent: 'flex-end', alignItems: 'center' }}>
            {fieldsSelected.length > 0 && (
              <TouchableOpacity activeOpacity={0.9} onPress={clearOut} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
                <Text style={{ ...defaultStyles.defaultMedium, color: colors.peach, paddingRight: 5 }}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          <View>{renderList()}</View>
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
  itemRow: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    paddingHorizontal: 15,
  },
});
