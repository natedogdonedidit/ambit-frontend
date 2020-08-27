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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderWhite from 'library/components/headers/HeaderWhite';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';

const CustomGoalModal = ({ navigation, route }) => {
  const { goal, setGoal, setTopic } = route.params;
  const [customGoalText, setCustomGoalText] = useState('');

  const handleDone = () => {
    const customGoal = {
      name: customGoalText,
      topicID: 'goals_customgoal',
      modalType: 'none',
      primaryColor: colors.blue,
      secondaryColor: colors.goalBlue,
      fieldName: 'Topic',
      fieldText: 'Select a topic',
      heading: 'Which topic best describes your goal?',
      adverb: '',
    };

    setGoal(customGoal);

    navigation.navigate('SelectPostTopicsModal', { goal: customGoal, setGoal, setTopic });
  };

  // ROUTE PARAMS
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBackBlank navigation={navigation} rightComponent={<ButtonHeader onPress={handleDone}>Next</ButtonHeader>} />
      <ScrollView style contentContainerStyle={styles.scrollView}>
        <View style={{ width: '100%', paddingHorizontal: 5 }}>
          <View style={styles.mainTitle}>
            <Text style={defaultStyles.headerMedium}>What's your goal?</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={defaultStyles.defaultMute}>Share what you're working on and post updates along your journey</Text>
          </View>
          <TextInput
            style={{
              height: 100,
              width: '100%',
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: colors.borderBlack,
              borderRadius: 10,
              ...defaultStyles.hugeRegular,
              padding: 12,
              paddingTop: 12,
            }}
            onChangeText={(val) => setCustomGoalText(val)}
            value={customGoalText}
            autoFocus
            autoCompleteType="off"
            multiline
            maxLength={40}
            textAlignVertical="top"
            placeholder="Summarize your goal in 40 characters"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CustomGoalModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
});
