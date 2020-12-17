import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, Dimensions, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation, useQuery } from '@apollo/client';
import { sortStoriesNewestFirst } from 'library/utils';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import REPOST_POST_MUTATION from 'library/mutations/REPOST_POST_MUTATION';
import { UserContext } from 'library/utils/UserContext';
import STORIES_QUERY from 'library/queries/STORIES_QUERY';
import Loader from 'library/components/UI/Loader';
import StoryBoxGridSmall from 'library/components/stories/StoryBoxGridSmall';

const { width } = Dimensions.get('window');

const SelectProjectPopup = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  const { currentUsername } = useContext(UserContext);

  const { handleProjectSelect } = route.params;

  // get current user stories
  const { loading, error, data, refetch, fetchMore, networkStatus } = useQuery(STORIES_QUERY, {
    variables: {
      first: 18, // FIXME, need to add "See more" button. onEndReached does not work bc nested scroll (i think)
      where: {
        owner: { username: { equals: currentUsername } },
        type: { equals: 'PROJECT' },
      },
      orderBy: [{ lastUpdated: 'desc' }],
    },
    notifyOnNetworkStatusChange: true,
  });

  const stories = data && data.stories ? data.stories : [];
  const storiesWithItems = stories.filter((story) => story.items.length > 0);

  const renderGrid = () => {
    if (!error && !data) {
      return (
        <View style={{ height: 100 }}>
          <Loader loading={loading} size="small" full={false} backgroundColor="transparent" />
        </View>
      );
    }

    // CHAD - must be a FlatList to do Fetch More
    return (
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 1,
            backgroundColor: 'white',
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
              borderTopWidth: StyleSheet.hairlineWidth,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderRightWidth: StyleSheet.hairlineWidth,
              borderColor: colors.borderBlack,
            }}
          >
            <Text style={defaultStyles.largeMediumMute}>New</Text>
            <Text style={defaultStyles.largeMediumMute}>Project</Text>
          </TouchableOpacity>
          {storiesWithItems.map((story) => {
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
          })}
        </View>
      </ScrollView>
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
        <View style={{ height: width }}>{renderGrid()}</View>
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
