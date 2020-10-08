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
  Alert,
  InputAccessoryView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  SliderHuePicker,
  // SliderSaturationPicker,
  // SliderValuePicker,
} from 'react-native-slider-color-picker';
import Slider from '@react-native-community/slider';
import tinycolor from 'tinycolor2';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';
import TextButton from 'library/components/UI/buttons/TextButton';

const CustomGoalModal = ({ navigation, route }) => {
  const { goalText, goalColor } = route.params;

  const { goal, setGoal, setTopic } = route.params;
  const [customGoalText, setCustomGoalText] = useState(goalText || '');
  const [color, setColor] = useState(goalColor || 'rgba(116,116,128,0.12)');
  const [emoji, setEmoji] = useState('🚀');
  const [showSlider, setShowSlider] = useState(false);

  const handleDone = () => {
    const customGoal = {
      name: customGoalText,
      topicID: 'goals_customgoal',
      modalType: 'none',
      primaryColor: colors.blue,
      secondaryColor: color,
      fieldName: 'Topic',
      fieldText: 'Select a topic',
      heading: 'Which topic best describes your goal?',
      adverb: '',
    };

    setGoal(customGoal);

    navigation.navigate('SelectPostTopicsModal', { goal: customGoal, setGoal, setTopic });
  };

  // const onColorChange = (colorHsvOrRgb, resType) => {
  //   // console.log(colorHsvOrRgb);
  //   const newColor = tinycolor({ a: 1, h: colorHsvOrRgb.h, s: 1, v: 0.7 }).toHexString();
  //   setColor(newColor);
  // };

  // ROUTE PARAMS
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBackBlank navigation={navigation} rightComponent={<ButtonHeader onPress={handleDone}>Next</ButtonHeader>} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={styles.container}>
          <View style={{ width: '100%', paddingHorizontal: 5 }}>
            <View style={styles.mainTitle}>
              <Text style={defaultStyles.headerMedium}>What's your goal?</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={defaultStyles.defaultMute}>Share what you're working on and post updates along your journey</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
              <View style={styles.whiteBack}>
                <View style={{ ...styles.goalView, backgroundColor: color }}>
                  <View style={styles.iconView}>
                    <Text style={{ ...defaultStyles.hugeRegular }}>{emoji}</Text>
                  </View>
                  <TextInput
                    style={{
                      flex: 1,
                      ...defaultStyles.hugeRegular,
                      // paddingRight: 20,
                      // backgroundColor: 'pink',
                      // color: 'white',
                      // textShadowColor: 'black',
                      // textShadowRadius: StyleSheet.hairlineWidth,
                    }}
                    onChangeText={(val) => setCustomGoalText(val)}
                    value={customGoalText}
                    autoFocus
                    autoCompleteType="off"
                    multiline
                    maxLength={40}
                    // textAlignVertical="top"
                    placeholder="Summarize your goal in 40 characters"
                    inputAccessoryViewID="1"
                    keyboardType="twitter"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <InputAccessoryView nativeID="1">
          <View style={styles.aboveKeyboard}>
            <TouchableOpacity style={{ paddingRight: 15 }}>
              <Text style={{ fontSize: 20 }}>{emoji}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => setColor(colors.gray12)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: 'white',
                  ...defaultStyles.shadowGoal,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: colors.gray12,
                    borderColor: colors.gray60,
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => setColor(colors.goalOrange)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: 'white',
                  ...defaultStyles.shadowGoal,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: colors.goalOrange,
                    borderColor: colors.gray60,
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => setColor(colors.goalGreen)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: 'white',
                  ...defaultStyles.shadowGoal,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: colors.goalGreen,
                    borderColor: colors.gray60,
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => setColor(colors.goalPurple)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: 'white',
                  ...defaultStyles.shadowGoal,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: colors.goalPurple,
                    borderColor: colors.gray60,
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => setColor(colors.goalBlue)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: 'white',
                  ...defaultStyles.shadowGoal,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: colors.goalBlue,
                    borderColor: colors.gray60,
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => setColor(colors.goalYellow)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: 'white',
                  ...defaultStyles.shadowGoal,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: colors.goalYellow,
                    borderColor: colors.gray60,
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => setColor(colors.goalPeach)}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: 'white',
                  ...defaultStyles.shadowGoal,
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: colors.goalPeach,
                    borderColor: colors.gray60,
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CustomGoalModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  mainTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  subTitle: {
    width: '100%',
    paddingBottom: 20,
  },

  // for goal
  whiteBack: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    ...defaultStyles.shadowGoal,
  },
  goalView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.grayButton,
  },
  iconView: {
    justifyContent: 'center',
    paddingRight: 15,
  },

  // above key
  aboveKeyboard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 17,
  },
});
