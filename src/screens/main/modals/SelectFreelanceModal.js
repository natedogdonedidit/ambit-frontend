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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import { freelanceList } from 'library/utils/lists';

const SelectFreelanceModal = ({ navigation }) => {
  const saveFreelanceFields = navigation.getParam('saveFreelanceFields');
  const fieldsPassedIn = navigation.getParam('freelanceFields');

  const [fieldsSelected, setFieldsSelected] = useState(fieldsPassedIn);
  const [selectedCategory, setSelectedCategory] = useState('');

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
    saveFreelanceFields(fieldsSelected);
    navigation.goBack();
  };

  const clearOut = () => setFieldsSelected([]);

  const renderList = item => {
    return item.list.map(listItem => {
      const isSelected = fieldsSelected.includes(listItem);

      return (
        <TouchableOpacity key={listItem} activeOpacity={0.8} onPress={() => selectField(listItem)}>
          <View style={{ ...styles.itemRow, borderColor: colors.blue }}>
            <Text style={{ ...defaultStyles.largeRegular, color: colors.blue }}>{listItem}</Text>
            {isSelected && (
              <View style={{ height: 40, justifyContent: 'center', paddingRight: 10, position: 'absolute', top: 0, right: 0 }}>
                <Icon name="check" size={20} color={colors.blue} />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  const renderCategories = () => {
    return freelanceList.map(item => {
      // count number of fields selected in this category
      const count = fieldsSelected.reduce((accumulator, currentValue) => {
        if (item.list.includes(currentValue)) {
          return accumulator + 1;
        }
        return accumulator;
      }, 0);

      const isSelected = item.category === selectedCategory;

      return (
        <TouchableOpacity
          key={item.category}
          onPress={() => setSelectedCategory(selectedCategory === item.category ? '' : item.category)}
        >
          <View style={styles.categoryRow}>
            <Icon name={item.logo} size={20} color={colors.purp} style={{ paddingRight: 15 }} />
            <Text style={{ ...defaultStyles.largeRegular }}>{item.category}</Text>
            {count > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                <Icon name="circle" solid size={3} color={colors.blueGray} style={{ paddingHorizontal: 8 }} />
                <Text style={{ ...defaultStyles.smallMute }}>{`${count} selected`}</Text>
              </View>
            )}
          </View>
          {isSelected && renderList(item)}
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
                  backgroundColor: colors.goalBlue,
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
        <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.goalBlue,
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            <Icon name="briefcase" size={40} color={colors.blue} />
          </View>
          <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  ...defaultStyles.headerMedium,
                }}
              >
                Select your{`\n`}freelance niches
              </Text>
              {/* <Icon name="question-circle" size={22} color={colors.iconDark} /> */}
            </View>

            <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>
              We will recommend you when people search for freelancers in these niches
            </Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
            {fieldsSelected.length > 0 && (
              <TouchableOpacity activeOpacity={0.9} onPress={clearOut} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
                <Text style={{ ...defaultStyles.defaultMedium, color: colors.peach }}>Clear</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={{ paddingBottom: 20 }}>{renderCategories()}</View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SelectFreelanceModal;

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
    height: 50,
  },
  // items
  itemRow: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
    marginBottom: 15,
  },
});
