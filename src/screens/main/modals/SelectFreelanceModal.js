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
            <Text style={{ ...defaultStyles.largeLight, flex: 1 }}>{item.category}</Text>
            {count > 0 && (
              <View style={styles.circleNumber}>
                <Text style={{ ...defaultStyles.defaultMute }}>{`${count} selected`}</Text>
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
        <HeaderWhite
          handleLeft={clearOut}
          handleRight={handleDone}
          textLeft="Clear"
          textRight="Done"
          title={fieldsSelected.length > 0 && `${fieldsSelected.length} selected`}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ width: '100%', paddingHorizontal: 40, paddingTop: 30, alignItems: 'center' }}>
            <Icon name="comment-dollar" size={40} color={colors.purp} />
            <Text
              style={{
                ...defaultStyles.hugeSemibold,
                color: colors.purp,
                textAlign: 'center',
                paddingBottom: 20,
                paddingTop: 20,
              }}
            >
              Select your freelance niche(s):
            </Text>
          </View>

          <View style={{ padding: 15 }}>{renderCategories()}</View>
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
  circleNumber: {
    height: '100%',
    justifyContent: 'center',
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
