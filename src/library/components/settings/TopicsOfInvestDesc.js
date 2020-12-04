import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useMutation } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import CoolText from 'library/components/UI/CoolText';
import UPDATE_USER_MUTATION from 'library/mutations/UPDATE_USER_MUTATION';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

const TopicsOfInvestDesc = ({ myTopics, scrollRef }) => {
  const [content, setContent] = useState(myTopics.investDesc || '');

  const isInvestor = myTopics && myTopics.topicsInvest && myTopics.topicsInvest.length > 0;

  const [updateOneUser, { loading, error, data }] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      where: { username: myTopics.username },
      data: {
        investDesc: content,
      },
    },
    refetchQueries: () => [
      { query: SINGLE_USER_BIO, variables: { where: { username: myTopics.username } } },
      { query: CURRENT_USER_TOPICS },
    ],
  });

  if (!isInvestor) return null;

  return (
    <View
      style={{
        marginTop: 15,
        backgroundColor: 'white',
        borderTopColor: colors.borderBlack,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.borderBlack,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 15,
      }}
    >
      <Text style={{ ...defaultStyles.hugeBold }}>Description</Text>
      <TextInput
        style={{
          flex: 1,
          ...defaultStyles.largeRegular,
          // backgroundColor: 'pink',
        }}
        onChangeText={(val) => setContent(val)}
        autoCompleteType="off"
        keyboardType="twitter"
        textContentType="none"
        textAlignVertical="top"
        multiline
        maxLength={420}
        placeholder={`Describe the type of investments you're interested in. This will appear on your profile.`}
        inputAccessoryViewID="1"
        onFocus={() => {
          if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollToEnd();
          }
        }}
        onBlur={updateOneUser}
      >
        <CoolText>{content}</CoolText>
      </TextInput>
    </View>
  );
};

export default TopicsOfInvestDesc;
