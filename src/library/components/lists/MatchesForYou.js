import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
// import USERS_QUERY from 'library/queries/USERS_QUERY';
import SUGGESTED_FOLLOWS from 'library/queries/SUGGESTED_FOLLOWS';

import SuggestedConnection from 'library/components/lists/SuggestedConnection';
import Section from 'library/components/UI/Section';
import Loader from 'library/components/UI/Loader';
import { UserContext } from 'library/utils/UserContext';

const MatchesForYou = ({ navigation, title, triggerRefresh }) => {
  const { currentUserId } = useContext(UserContext);

  const { loading, error, data, refetch } = useQuery(SUGGESTED_FOLLOWS, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    refetch();
  }, [triggerRefresh]);

  const renderRows = () => {
    if (error) {
      console.log(error);
      return <Text>{error.message}</Text>;
    }

    if (!data && loading) {
      return (
        <View style={{ height: 70, width: '100%' }}>
          <Loader active size="small" full={false} backgroundColor={colors.white} />
        </View>
      );
    }

    if (data.suggestedFollows && data.suggestedFollows.length > 0) {
      return data.suggestedFollows.map((match) => (
        <SuggestedConnection key={match.id} navigation={navigation} user={match} showFollow />
      ));
    }

    return (
      <View style={{ paddingVertical: 20, backgroundColor: 'white' }}>
        <Text style={{ ...defaultStyles.largeMute, textAlign: 'center' }}>No suggested connections at this time</Text>
      </View>
    );
  };

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
