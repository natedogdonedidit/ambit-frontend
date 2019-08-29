import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const HeaderNewPost = ({ handleBack, handleSubmit }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => handleBack()} style={{ width: 60 }}>
        <Icon name="chevron-left" size={20} color="white" />
      </TouchableOpacity>

      <Text style={{ ...defaultStyles.hugeBold, ...styles.title }}>New Post</Text>

      <View>
        <TouchableOpacity onPress={() => handleSubmit()}>
          <View style={styles.button}>
            <Text style={{ ...defaultStyles.largeThin, ...styles.buttonText }}>Post</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  title: {
    color: 'white',
  },
  button: {
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  buttonText: {
    color: colors.purp,
  },
});

export default HeaderNewPost;
