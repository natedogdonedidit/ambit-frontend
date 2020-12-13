import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation, useQuery } from '@apollo/client';
import { sortStoriesNewestFirst } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import REPOST_POST_MUTATION from 'library/mutations/REPOST_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';
import SINGLE_USER_BIO from 'library/queries/SINGLE_USER_BIO';
import Loader from 'library/components/UI/Loader';
import StoryBoxGridSmall from 'library/components/stories/StoryBoxGridSmall';

const { width } = Dimensions.get('window');

const SelectProjectPopup = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const { currentUsername } = useContext(UserContext);

  const { handleProjectSelect } = route.params;

  // get current user stories
  const { loading, error, data, refetch } = useQuery(SINGLE_USER_BIO, {
    variables: { where: { username: currentUsername } },
    fetchPolicy: 'cache-and-network',
    // notifyOnNetworkStatusChange: true,
  });

  const renderGrid = () => {
    if (!error && !data) {
      return (
        <View style={{ height: 100 }}>
          <Loader loading={loading} size="small" full={false} backgroundColor="transparent" />
        </View>
      );
    }

    const { user } = data;

    const storiesFromDB = user.stories || [];

    // only display projects and saved solo stories
    const storiess = storiesFromDB.filter((story) => story.type !== 'INTRO');
    const stories = storiess.filter((story) => story.items.length > 0);
    // const storiesSorted = storiesWithItems.sort(sortStoriesNewestFirst); // DO THIS IN THE QUERY INSTEAD

    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingTop: 1,
          backgroundColor: colors.lightGray,
          minHeight: (width / 3) * 2,
          maxHeight: width,
        }}
      >
        <TouchableOpacity
          onPress={() => handleProjectSelect('new')}
          activeOpacity={1}
          style={{
            width: width / 3,
            height: width / 3,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.white,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderRightWidth: StyleSheet.hairlineWidth,
            borderColor: colors.borderBlack,
          }}
        >
          <Text style={defaultStyles.largeMediumMute}>New</Text>
          <Text style={defaultStyles.largeMediumMute}>Project</Text>
        </TouchableOpacity>
        {stories.map((story) => {
          if (story.items.length > 0) {
            return (
              <View key={story.id} style={{ width: width / 3, height: width / 3 }}>
                <StoryBoxGridSmall
                  navigation={navigation}
                  story={story}
                  showProfilePic={false}
                  handleProjectSelect={handleProjectSelect}
                />
              </View>
            );
          }
          return null;
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View style={styles.transparentSection} />
      </TouchableWithoutFeedback>
      <View style={{ ...styles.modalContent, paddingBottom: insets.bottom }}>
        <View style={{ paddingVertical: 15 }}>
          <Text
            style={{
              ...defaultStyles.hugeSemibold,
              textAlign: 'center',
            }}
          >
            Select a project
          </Text>
          <Text style={{ ...defaultStyles.smallMute, textAlign: 'center', paddingTop: 3 }}>
            A project is a collection of bits
          </Text>
        </View>
        {renderGrid()}
      </View>
    </View>
  );
};

export default SelectProjectPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // paddingHorizontal: 12,
    // paddingBottom: 12,
  },
  transparentSection: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  modalContent: {
    width: '100%',
    // height: 120,
    flexDirection: 'column',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    ...defaultStyles.hugeSemibold,
  },
});
