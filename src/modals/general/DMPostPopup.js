import React, { useContext, useState, useMemo, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback, Alert, TextInput, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation, useQuery } from '@apollo/client';

import CREATE_MESSAGE_MISSING_CONVO_MUTATION from 'library/mutations/CREATE_MESSAGE_MISSING_CONVO_MUTATION';
import CURRENT_USER_MESSAGES from 'library/queries/CURRENT_USER_MESSAGES';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import { UserContext } from 'library/utils/UserContext';
import USERS_QUERY from 'library/queries/USERS_QUERY';
import CURRENT_USER_FOLLOWING from 'library/queries/CURRENT_USER_FOLLOWING';
import ProfilePic from 'library/components/UI/ProfilePic';

const DMPostPopup = ({ navigation, route }) => {
  const { postId, storyItemId, storyId } = route.params; // only one of these should be truthy
  const { currentUserId } = useContext(UserContext);

  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [shareFullStory, setShareFullStory] = useState(false);

  // CREATE MESSAGE MUTATION
  const [createOneMessageMissingConvo, { loading: loadingCreate2 }] = useMutation(CREATE_MESSAGE_MISSING_CONVO_MUTATION, {
    refetchQueries: () => [{ query: CURRENT_USER_MESSAGES }],
    onCompleted: () => {},
    onError: (error) => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to send this message. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // GET PEOPLE I FOLLOW
  const { data: dataFollowing } = useQuery(CURRENT_USER_FOLLOWING);
  const network = useMemo(() => {
    if (dataFollowing && dataFollowing.iFollow) {
      return [...dataFollowing.iFollow];
    }

    return [];
  }, [dataFollowing]);

  // SEARCH PEOPLE I FOLLOW THAT MATCH SEARCHTEXT
  const { data: userMatchesFollowing } = useQuery(USERS_QUERY, {
    variables: {
      first: 10,
      where: {
        AND: [
          {
            OR: [{ username: { startsWith: searchText } }, { name: { startsWith: searchText } }],
          },
          {
            id: { in: network },
          },
        ],
      },
    },
  });

  // SEARCH ALL USERS THAT MATCH SEARCHTEXT
  const { data: userMatchesAll } = useQuery(USERS_QUERY, {
    variables: {
      first: 10,
      where: {
        AND: [
          {
            OR: [{ username: { startsWith: searchText } }, { name: { startsWith: searchText } }],
          },
          {
            id: { not: { equals: currentUserId } },
          },
        ],
      },
    },
  });

  // GET 10 PEOPLE THAT I FOLLOW FOR FILLER DATA
  const { data: usersFollowing } = useQuery(USERS_QUERY, {
    variables: {
      first: 10,
      where: { id: { in: network } },
    },
  });

  useEffect(() => {
    // join the search results of all 3 queries
    const results = [];

    // first priority
    if (userMatchesFollowing && userMatchesFollowing.users && userMatchesFollowing.users.length > 0) {
      results.push(...userMatchesFollowing.users);
    }

    // second priority
    if (userMatchesAll && userMatchesAll.users && userMatchesAll.users.length > 0) {
      const resultsFiltered = userMatchesAll.users.filter((u) => {
        const ind = results.findIndex((res) => res.username === u.username);
        return ind === -1;
      });

      results.push(...resultsFiltered);
    }

    // filler
    if (usersFollowing && usersFollowing.users && usersFollowing.users.length > 0) {
      const resultsFiltered = usersFollowing.users.filter((u) => {
        const ind = results.findIndex((res) => res.username === u.username);
        return ind === -1;
      });

      results.push(...resultsFiltered);
    }

    setSearchResults(results);
  }, [userMatchesFollowing, userMatchesAll, usersFollowing]);

  const handleMentionSelect = async (userSelected) => {
    let content = '';
    if (postId) {
      content = `Post:${postId}`;
    } else if (storyItemId && !shareFullStory) {
      // content = `StoryItem:${storyItemId}`;
      content = `Story:${storyId}`;
    } else if (storyId && shareFullStory) {
      content = `Story:${storyId}`;
    }

    createOneMessageMissingConvo({
      variables: {
        content,
        to: userSelected.id,
        from: currentUserId,
        isShare: true,
      },
    });

    navigation.navigate({ name: 'Chat', key: `Chat:${userSelected.id}`, params: { otherUserPassedIn: userSelected } });
  };

  const renderSearchResults = () => {
    if (!searchResults || searchResults.length < 1) {
      return null;
    }

    return searchResults.map((user) => {
      return (
        <TouchableOpacity key={user.id} style={styles.user} activeOpacity={0.7} onPress={() => handleMentionSelect(user)}>
          <ProfilePic size="small" user={user} enableIntro={false} enableStory={false} enableClick={false} />
          <Text style={{ ...defaultStyles.defaultMedium, paddingLeft: 10 }}>
            {user.name}
            <Text style={{ ...defaultStyles.defaultMute, paddingLeft: 5 }}> @{user.username}</Text>
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const renderTitle = () => {
    // if sharing post
    if (postId) {
      return <Text style={styles.title}>Share Post</Text>;
    }

    // if share story
    if (storyItemId && storyId) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShareFullStory(false)}>
            <Text style={[styles.title, { paddingRight: 15 }, shareFullStory && { color: colors.gray30 }]}>Share Clip</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShareFullStory(true)}>
            <Text style={[styles.title, { paddingLeft: 15 }, !shareFullStory && { color: colors.gray30 }]}>
              Share Full Project
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return <Text style={styles.title}>Send Direct Message</Text>;
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
        {renderTitle()}
        <View style={styles.searchBarView}>
          <Icon name="search" size={18} color={colors.blueGray} />
          <TextInput
            style={{ ...styles.searchBar, ...defaultStyles.defaultText, color: colors.darkGray }}
            onChangeText={(val) => setSearchText(val)}
            value={searchText}
            placeholder="Search for people"
            maxLength={50}
          />
        </View>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 15 }}>
          {renderSearchResults()}
        </ScrollView>
      </View>
    </View>
  );
};

export default DMPostPopup;

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
    height: '75%',
    flexDirection: 'column',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    paddingVertical: 20,
    ...defaultStyles.hugeSemibold,
    // color: colors.blueGray,
  },
  searchBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.searchGray,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    paddingLeft: 10,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 52,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderBlack,
  },
});
