import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import TopicsList from 'library/components/lists/TopicsList';
import ButtonHeader from 'library/components/UI/buttons/ButtonHeader';
import TextButton from 'library/components/UI/buttons/TextButton';

const NewProjectTopicsModal = ({ navigation, route }) => {
  const { setTopic } = route.params;

  const [selectedTopic, setSelectedTopic] = useState('');

  const handleTopicSelect = (selectedTopicID) => {
    if (selectedTopicID === selectedTopic) {
      // remove it
      setSelectedTopic('');
    } else {
      // add it
      setSelectedTopic(selectedTopicID);
      setTopic(selectedTopicID);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBackBlank
        navigation={navigation}
        rightComponent={
          <View style={{ paddingRight: 4 }}>
            <TextButton
              onPress={() => {
                setTopic(null);
                navigation.goBack();
              }}
            >
              Clear
            </TextButton>
          </View>
        }
      />

      <ScrollView style contentContainerStyle={styles.scrollView}>
        <View style={{ width: '100%', paddingHorizontal: 5 }}>
          <View style={styles.mainTitle}>
            <Text style={{ ...defaultStyles.headerMedium, textAlign: 'center' }}>Select a topic</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={{ ...defaultStyles.defaultMute, textAlign: 'center' }}>
              Your story will get more exposure if you tag a relevant topic
            </Text>
          </View>
        </View>
        <TopicsList activeTopicIDs={[selectedTopic]} handleTopicSelect={handleTopicSelect} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    paddingBottom: 20,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  mainTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 13,
  },
  subTitle: {
    width: '100%',
    paddingBottom: 20,
  },
});

export default NewProjectTopicsModal;
