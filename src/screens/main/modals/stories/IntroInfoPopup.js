import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import GrayButton from 'library/components/UI/buttons/GrayButton';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import TextButton from 'library/components/UI/buttons/TextButton';

const MODAL_WIDTH = 260;
const MODAL_HEIGHT = 160;

const IntroInfoPopup = ({ navigation, route }) => {
  // const { itemIndex, storyLength, removeStoryItem, changeOrder } = route.params;
  const { width, height } = Dimensions.get('window');

  const topPadding = height / 2 - MODAL_HEIGHT / 2;
  const leftPadding = width / 2 - MODAL_WIDTH / 2;

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={goBack}>
        <View style={styles.transparentSection} />
      </TouchableWithoutFeedback>
      <SafeAreaView style={{ ...styles.modalView, top: topPadding, left: leftPadding }}>
        <View>
          <Text style={{ ...defaultStyles.largeMedium, textAlign: 'center', paddingBottom: 10 }}>
            Hey nate! This would be a good spot to describe what an intro is
          </Text>
          <TextButton onPress={goBack}>See an example</TextButton>
        </View>

        <ButtonDefault onPress={goBack} textStyle={{ fontWeight: '400', color: 'white', fontSize: 18 }}>
          Got it
        </ButtonDefault>
      </SafeAreaView>
    </View>
  );
};

export default IntroInfoPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transparentSection: {
    ...StyleSheet.absoluteFill,
  },
  modalView: {
    position: 'absolute',

    width: MODAL_WIDTH,
    height: MODAL_HEIGHT,

    backgroundColor: 'white',
    borderRadius: 18,
    paddingVertical: 15,
    paddingHorizontal: 15,

    justifyContent: 'space-between',
  },
});
