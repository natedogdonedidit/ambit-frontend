import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/buttons/TextButton';

const OnboardingSpecial = ({ navigation, route }) => {
  const { username } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={{ ...defaultStyles.ambitLogoSmall }}>ambit</Text>
        </View>
        <View style={styles.titleSection}>
          <Text style={{ ...defaultStyles.headerMedium, textAlign: 'center' }}>
            Do you want Ambit to find opportunities for you?
          </Text>
          <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center', paddingTop: 18, paddingHorizontal: 20 }}>
            Select your specialty. Then Ambit will connect you with people looking for your help.
          </Text>
        </View>
        <ScrollView style={{ flex: 1, paddingTop: 50 }} contentContainerStyle={{ padding: 10 }}>
          <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <TextButton textStyle={{ fontSize: 18 }} onPress={() => navigation.navigate('OnboardingFreelance', { username })}>
              I'm a Freelancer
            </TextButton>
          </View>
          <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <TextButton textStyle={{ fontSize: 18 }} onPress={() => navigation.navigate('OnboardingInvest', { username })}>
              I'm an Investor
            </TextButton>
          </View>
          <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <TextButton textStyle={{ fontSize: 18 }} onPress={() => navigation.navigate('OnboardingMentor', { username })}>
              I'm a Mentor
            </TextButton>
          </View>
        </ScrollView>

        <View style={styles.bottom}>
          {/* <TextButton onPress={() => navigation.navigate('OnboardingMentor', { username })}>Skip</TextButton> */}
          <View />
          <ButtonDefault buttonStyle={styles.buttonStyle} onPress={() => navigation.navigate('MainStack')}>
            Let's Go!
          </ButtonDefault>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  titleSection: {
    marginTop: 15,
    alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 10,
    // backgroundColor: 'pink',
  },
  scrollView: {
    flex: 1,
    // backgroundColor: 'blue',
    // padding: 20,
  },
  bottom: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingRight: 8,
    paddingLeft: 14,
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.lightLightGray,
    marginTop: 15,
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.7)',
    ...defaultStyles.shadow3,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 35,
    overflow: 'hidden',
  },
  buttonStyle: {
    paddingHorizontal: 14,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBlack,
    marginVertical: 13,
    paddingBottom: 4,
    ...defaultStyles.hugeRegular,
    fontSize: 18,
  },
});

export default OnboardingSpecial;
