import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonDefault from 'library/components/UI/buttons/ButtonDefault';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/buttons/TextButton';

const OnboardingMentor1 = ({ navigation, route }) => {
  const { username } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={{ ...defaultStyles.ambitLogoSmall }}>ambit</Text>
        </View>
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            marginTop: 50,
            marginBottom: 40,
            backgroundColor: colors.goalPurp,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Feather name="users" size={70} color={colors.purp} />
        </View>
        <View style={styles.titleSection}>
          <Text style={{ ...defaultStyles.headerMedium, textAlign: 'center' }}>Are you open to mentoring others?</Text>
        </View>
        <View style={{ flex: 1, padding: 10, paddingTop: 30 }}>
          <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <ButtonDefault onPress={() => navigation.navigate('OnboardingMentor', { username })}>Yes</ButtonDefault>
          </View>
          <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
            <TextButton onPress={() => navigation.navigate('OnboardingInvest1', { username })}>Nope</TextButton>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
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

export default OnboardingMentor1;
