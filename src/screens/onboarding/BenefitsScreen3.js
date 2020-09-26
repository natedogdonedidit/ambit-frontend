import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import TextButton from 'library/components/UI/buttons/TextButton';

const BenefitsScreen3 = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <Text style={{ ...defaultStyles.hugeSemibold, paddingTop: 80, paddingBottom: 35 }}>Highlights #3</Text>

        <View style={{ flex: 1 }} />

        <View style={styles.bottom}>
          <View style={{ width: 80, flexDirection: 'row', justifyContent: 'flex-start' }}>
            {/* <TextButton onPress={() => navigation.navigate('Login')} /> */}
          </View>
          <View style={styles.circles}>
            <View style={styles.circle} />
            <View style={styles.circle} />
            <View style={styles.circleFilled} />
          </View>
          <View style={{ width: 80, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TextButton onPress={() => navigation.navigate('Login')}>Let's go!</TextButton>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 42,
    width: '100%',
  },
  bottom: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderBlack,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 16,
    width: '100%',
  },

  circles: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blueGray,
    margin: 5,
  },
  circleFilled: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blueGray,
    backgroundColor: colors.blueGray,
    margin: 5,
  },
});

export default BenefitsScreen3;
