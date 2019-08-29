import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useQuery } from 'react-apollo';

import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

const profilePicExample = 'https://gfp-2a3tnpzj.stackpathdns.com/wp-content/uploads/2016/07/Goldendoodle-600x600.jpg';

const SmallProfilePic = () => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  const profilePic = data ? data.userLoggedIn.profilePic : null;

  return (
    <View style={{ ...styles.profilePicView }}>
      <Image
        style={{ ...styles.profilePic }}
        resizeMode="cover"
        source={{
          uri: profilePic || profilePicExample,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicView: {
    width: 30,
    height: 30,
    borderRadius: 20,
    // borderWidth: 0.5,
    // borderColor: 'white',
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  profilePic: {
    width: '100%',
    height: '100%',
  },
});

export default SmallProfilePic;
