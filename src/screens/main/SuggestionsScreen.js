import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Animated, StatusBar } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/react-hooks';

import ALL_USERS_QUERY from 'library/queries/ALL_USERS_QUERY';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import HeaderSearch from 'library/components/headers/HeaderSearch';
import ProfileComponent from 'library/components/profile/ProfileComponent';
import UserSlider from 'library/components/UserSlider';
import Loader from 'library/components/UI/Loader';
import { UserContext } from 'library/utils/UserContext';

// MUST BE COPIED TO PROFILECOMPONENT
const OUTSIDE_HEADER_HEIGHT = 138; // 44 (header) + 94 (slider)

const SuggestionsScreen = ({ navigation }) => {
  const [profileId, setProfileId] = useState('ck0tsen1lpd600b09xfi09b14');
  const [scrollY] = useState(new Animated.Value(0));
  const insets = useSafeArea();
  const OUTSIDE_HEADER_SCROLL = OUTSIDE_HEADER_HEIGHT + insets.top;
  const { currentUserId } = useContext(UserContext);

  // QUERIES
  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(CURRENT_USER_QUERY);

  const { loading: loadingUsers, error: errorUsers, data: dataUsers } = useQuery(ALL_USERS_QUERY);

  const { loading: loadingUser, error: errorUser, data: dataUser, refetch } = useQuery(SINGLE_USER_BIO, {
    variables: { id: profileId },
  });

  useEffect(() => {
    refetch();
  }, [profileId]);

  // if (loadingMe) return null;
  if (errorMe) return <Text>{`Error! ${errorMe}`}</Text>;

  // if (loadingUsers) return null;
  if (errorUsers) return <Text>{`Error! ${errorUsers}`}</Text>;

  const loading = loadingUser || loadingUsers || loadingMe;
  // if (loading) {
  //   return <Loader loading={loading} />;
  // }

  const { userLoggedIn } = dataMe;
  const { users } = dataUsers;
  const { user } = dataUser;
  console.log(user);

  const handleUserChange = id => {
    setProfileId(id);
    // refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      {loadingUser ? (
        <Loader loading={loadingUser} />
      ) : (
        <ProfileComponent
          navigation={navigation}
          profileId={profileId || users[0].id}
          scrollY={scrollY}
          OUTSIDE_HEADER_HEIGHT={OUTSIDE_HEADER_HEIGHT}
          OUTSIDE_HEADER_SCROLL={OUTSIDE_HEADER_SCROLL}
          loading={loadingUser}
          user={user}
        />
      )}

      <Animated.View
        style={[
          styles.outsideHeader,
          // defaultStyles.shadow6,
          {
            marginTop: insets.top,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, OUTSIDE_HEADER_HEIGHT + insets.top],
                  outputRange: [0, -OUTSIDE_HEADER_HEIGHT - insets.top],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <HeaderSearch
          handleLeft={() => navigation.openDrawer()}
          handleRight={() => null}
          textRight=""
          title="Search"
          user={userLoggedIn}
        />
        {loadingUsers ? null : (
          <UserSlider users={users} handleUserChange={handleUserChange} loading={loading} profileId={profileId} />
        )}
      </Animated.View>
      <View
        style={{
          width: '100%',
          height: insets.top,
          backgroundColor: 'white',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  outsideHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    // backgroundColor: 'gray',
    overflow: 'hidden',
  },
});

export default SuggestionsScreen;
