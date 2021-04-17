import React, { useContext } from 'react';
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
// import HeaderWhite from 'library/components/headers/HeaderWhite';
import HeaderBack from 'library/components/headers/HeaderBack';
import { UserContext } from 'library/utils/UserContext';

const SettingsScreen = ({ navigation, route }) => {
  // // ROUTE PARAMS
  // const { userLoggedIn } = route.params;
  const { activeTab, currentUsername } = useContext(UserContext);

  // get user settings

  return (
    <View style={{ flex: 1 }}>
      {/* <HeaderWhite handleLeft={() => navigation.goBack()} handleRight={null} textLeft="Close" textRight="" title="Settings" /> */}
      <HeaderBack handleRight={() => null} title="Settings" navigation={navigation} />
      <View style={{ paddingTop: 15 }}>
        <TouchableOpacity
          style={{
            ...styles.row,
            borderTopColor: colors.borderBlack,
            borderTopWidth: StyleSheet.hairlineWidth,
          }}
          activeOpacity={0.6}
          // onPress={() => {
          //   navigation.navigate('MyNetwork');
          // }}
          onPress={() => {
            navigation.navigate(activeTab || 'HomeStack', { screen: 'BlockedUsers' });
          }}
        >
          <Text style={styles.buttonText}>Blocked Users</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  row: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  buttonText: {
    ...defaultStyles.largeRegular,
    paddingLeft: 18,
    // color: colors.blueGray,
  },
});
