import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import { topicsList } from 'library/utils/lists';

const SelectIndustryModal = ({ navigation }) => {
  const saveIndustryFields = navigation.getParam('saveIndustryFields');
  const fieldsPassedIn = navigation.getParam('industry');

  const [fieldsSelected, setFieldsSelected] = useState(fieldsPassedIn);
  const [warning, setWarning] = useState(false);

  // passed to 2nd modal
  const selectField = selectedField => {
    if (warning) setWarning(false);
    setFieldsSelected([selectedField]);
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
    return topicsList.map(item => {
      const { topic } = item;
      const isSelected = fieldsSelected.includes(topic);

      return (
        <TouchableOpacity key={topic} activeOpacity={0.8} onPress={() => selectField(topic)}>
          <View style={{ ...styles.itemRow }}>
            <Text style={{ ...defaultStyles.largeRegular, color: colors.purp, flex: 1 }}>{topic}</Text>
            <View style={{ height: 48, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
              <Icon name={isSelected ? 'check-circle' : 'circle'} size={20} color={isSelected ? colors.purp : colors.iconGray} />
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
              height: 46,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {fieldsSelected.length > 0 && <Text style={defaultStyles.smallMute}>{fieldsSelected.length} selected</Text>}
            {warning && <Text style={{ ...defaultStyles.smallMute, color: colors.peach }}>Pleas select one</Text>}
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={handleDone} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
            <Icon name="chevron-left" size={22} color={colors.iconDark} />
          </TouchableOpacity>
          {fieldsSelected.length > 0 && (
            <TouchableOpacity onPress={handleDone}>
              <View
                style={{
                  backgroundColor: colors.goalPurp,
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
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.goalPurp,
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            <Icon name="briefcase" size={40} color={colors.purp} />
          </View>
          <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  ...defaultStyles.headerMedium,
                }}
              >
                Select your primary{`\n`}industry
              </Text>
            </View>

            {/* <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>
              We will recommend you when people search for mentors in these industries
            </Text> */}
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

export default SelectIndustryModal;

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
