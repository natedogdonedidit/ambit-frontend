import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import CURRENT_USER_MATCHES from 'library/queries/CURRENT_USER_MATCHES';
import SuggestedConnection from 'library/components/lists/SuggestedConnection';
import Section from 'library/components/UI/Section';
import Loader from 'library/components/UI/Loader';
import { UserContext } from 'library/utils/UserContext';

const MatchesForYou = ({ navigation, title }) => {
  const { currentUserId } = useContext(UserContext);

  const { loading, error, data } = useQuery(CURRENT_USER_MATCHES, {
    variables: {
      where: {
        id: { notIn: [currentUserId] },
      },
    },
  });

  const renderRows = () => {
    if (error) return null;

    if (loading) {
      return (
        <View style={styles.loadingMessage}>
          <View style={{ height: 40, width: '100%' }}>
            <Loader loading={loading} size="small" full={false} backgroundColor={colors.white} />
          </View>
        </View>
      );
    }

    if (data && data.users) {
      return data.users.map((match) => <SuggestedConnection key={match.id} navigation={navigation} user={match} />);
    }
  };

  if (error) return null;

  return (
    <View style={styles.container}>
      <Section
        text={title}
        marginTop
        // rightComponent={<TextButton onPress={() => navigation.navigate('MyHats')}>Edit</TextButton>}
      />
      {renderRows()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  loadingMessage: {
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 15,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderBlack,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderBlack,
  },
});

export default MatchesForYou;
