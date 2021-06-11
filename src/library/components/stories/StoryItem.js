import React, { useState, useRef, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { UserContext } from 'library/utils/UserContext';

import colors from 'styles/colors';
import DELETE_STORYITEM_MUTATION from 'library/mutations/DELETE_STORYITEM_MUTATION';
import DELETE_STORY_MUTATION from 'library/mutations/DELETE_STORY_MUTATION';
import UPDATE_STORY_MUTATION from 'library/mutations/UPDATE_STORY_MUTATION';
import STORIES_QUERY from 'library/queries/STORIES_QUERY';
import StoryImage from 'library/components/stories/StoryImage';
import TopLinearFade from 'library/components/stories/TopLinearFade';
import BottomLinearFade from 'library/components/stories/BottomLinearFade';
import StoryProgressBars from 'library/components/stories/StoryProgressBars';
import StoryHeader from 'library/components/stories/StoryHeader';
import StoryFooter from 'library/components/stories/StoryFooter';
import REPORT_CONTENT from '../../mutations/REPORT_CONTENT';

// function areEqual(prevProps, nextProps) {
//   /*
//   return true if passing nextProps to render would return
//   the same result as passing prevProps to render,
//   otherwise return false
//   */

//   if (
//     // prevProps.navigation === nextProps.navigation &&
//     // prevProps.story === nextProps.story &&
//     // prevProps.storyIsActive === nextProps.storyIsActive &&
//     // prevProps.setDisableOutterScroll === nextProps.setDisableOutterScroll
//     prevProps === nextProps
//   ) {
//     console.log('not gonna re-render', prevProps.story.id);
//     return true;
//   }

//   console.log('gonna re-render', prevProps.story.id);
//   return false;
// }

function StoryItem({
  story,
  item,
  isActiveItem,
  activeItemIndex,
  incrementIndex,
  decrementIndex,
}) {

  const { currentUserId, currentUsername } = useContext(UserContext);
  const navigation = useNavigation();
  const videoRef = useRef(null);


  // STATE
  const [hasError, setHasError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  // VARIABLES
  const { items, owner, type, preview, topics } = story;

  const isMyPost = owner.id === currentUserId;

  // MUTATIONS

  // REPORT CONTENT
  const [report] = useMutation(REPORT_CONTENT, {
    variables: {
      text:
        `<p>Content Type: StoryItem</p>` +
        `<p>Date Reported: ${new Date()}</p>` +
        `<p>StoryID: ${story.id}</p>` +
        `<p>StoryItemID: ${item.id}</p>` +
        `<p>StoryItem Text: ${item.text || 'no content'}</p>` +
        `<p>Content Owner: ${owner.name}, ${owner.username}, ${owner.id}</p>` +
        `<p>Reported By: ${currentUsername}, ${currentUserId}</p>`,
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to report content. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const [updateOneStory, { loading: loadingPin }] = useMutation(UPDATE_STORY_MUTATION, {
    refetchQueries: [
      {
        query: STORIES_QUERY,
        variables: {
          first: 18,
          where: {
            owner: { username: { equals: currentUsername } },
            type: { equals: 'PROJECT' },
          },
          orderBy: [{ lastUpdated: 'desc' }],
        },
      },
    ],
    // onCompleted: () => {},
    onError: (error) => {
      console.log(error);
      Alert.alert('Oh no!', 'An error occured when trying to update this story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    },
  });

  // DELETE POST MUTATION
  const [deleteOneStoryItem] = useMutation(DELETE_STORYITEM_MUTATION, {
    variables: { where: { id: item.id } },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteOneStoryItem: { __typename: 'StoryItem', id: item.id },
    },
    update(cache, { data: deleteOneStoryItem }) {
      // remove from cache
      cache.evict({ id: cache.identify({ __typename: 'StoryItem', id: item.id }) });
      cache.gc();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this item. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  const [deleteOneStory] = useMutation(DELETE_STORY_MUTATION, {
    variables: { where: { id: story.id } },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteOneStory: { __typename: 'Story', id: story.id },
    },
    update(cache, { data: deleteOneStory }) {
      // remove from cache
      cache.evict({ id: cache.identify({ __typename: 'Story', id: story.id }) });
      cache.gc();
    },
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to delete this story. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });


  function resetState() {
    setPaused(false);
    setVideoStarted(false);
    setIsBuffering(false);

    // if video, seek video to beginning
    if (item.type === 'VIDEO' && !!videoRef && !!videoRef.current && !!videoRef.current.seek) {
      videoRef.current.seek(0);
    }
  }

  useEffect(() => {
    resetState();
  }, [isActiveItem])

  // CUSTOM FUNCTIONS

  // functions for "More" modal
  const pinToShowcase = () => {
    updateOneStory({
      variables: {
        where: { id: story.id },
        data: {
          showcase: true,
        },
      },
    });
  };

  const unpinToShowcase = () => {
    updateOneStory({
      variables: {
        where: { id: story.id },
        data: {
          showcase: false,
        },
      },
    });
  };

  const removeFromProject = () => {
    // setPaused(true); // doesnt work
    Alert.alert(`Are you sure you want to delete this ${item.type.toLowerCase()}?`, '', [
      {
        text: `Delete`,
        onPress: () => {
          navigation.goBack(); // close options modal
          deleteOneStoryItem();
        },
      },
      { text: 'Cancel', onPress: () => setPaused(false), style: 'cancel' },
      { cancelable: true },
    ]);
  };

  const deleteProject = () => {
    // setPaused(true); // doesnt work
    Alert.alert(`Are you sure you want to delete this entire project?`, 'There is no going back', [
      {
        text: 'Delete',
        onPress: () => {
          navigation.goBack(); // close options modal
          deleteOneStory();
        },
      },
      { text: 'Cancel', onPress: () => setPaused(false), style: 'cancel' },
      { cancelable: true },
    ]);
  };

  const determineOptions = () => {
    if (isMyPost) {
      if (story.type === 'PROJECT' && story.items.length > 1) {
        return [
          !loadingPin && {
            text: story.showcase ? `Unpin from Showcase` : 'Pin to my Showcase',
            onPress: story.showcase ? unpinToShowcase : pinToShowcase,
          },
          {
            text: `Add another bit`,
            onPress: () => navigation.navigate('StoryCameraModal', { projectPassedIn: story }),
          },
          {
            text: `Delete this ${item.type.toLowerCase()}`,
            color: colors.peach,
            onPress: removeFromProject,
          },
          {
            text: 'Delete entire Project',
            color: colors.peach,
            onPress: deleteProject,
          },
        ];
      }
      if (story.type === 'PROJECT') {
        return [
          !loadingPin && {
            text: story.showcase ? `Unpin from Showcase` : 'Pin to my Showcase',
            onPress: story.showcase ? unpinToShowcase : pinToShowcase,
          },
          {
            text: `Add another bit`,
            onPress: () => navigation.navigate('StoryCameraModal', { projectPassedIn: story }),
          },
          {
            text: `Delete this ${item.type.toLowerCase()}`,
            color: colors.peach,
            onPress: removeFromProject,
          },
        ];
      }
      if (story.type === 'INTRO') {
        return [
          {
            text: 'Delete Intro',
            color: colors.peach,
            onPress: removeFromProject,
          },
        ];
      }
    } else {
      return [
        {
          text: `Report`,
          onPress: () => {
            report();
            // navigation.goBack();
          },
        },
      ];
    }

    return [];
  };

  const handleMoreButton = () => {
    const onCancel = () => {
      navigation.goBack();
      setPaused(false);
    };

    setPaused(true);
    const options = determineOptions();
    navigation.navigate('GenericPopupMenu', { options, onCancel });
  };


  // RETURN
  if (hasError) {
    return (
      <View style={styles.errorView}>
        <Text>There was an error</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        opacity: isActiveItem ? 1 : 0,
        zIndex: isActiveItem ? 999 : 1,
      }}
    >
      {/* fill */}
      <StoryImage
        videoRef={videoRef}
        item={item}
        isActiveItem={isActiveItem}
        isBuffering={isBuffering}
        setIsBuffering={setIsBuffering}
        paused={paused}
        setPaused={setPaused}
        videoStarted={videoStarted}
        setVideoStarted={setVideoStarted}
        incrementIndex={incrementIndex}
      />
      
      {/* absolute positioned stuff */}
      <TopLinearFade />
      <BottomLinearFade />
      <StoryProgressBars
        items={items}
        activeItemIndex={activeItemIndex}
        isActiveItem={isActiveItem}
        paused={paused}
        videoStarted={videoStarted}
        incrementIndex={incrementIndex}
      />
      <StoryFooter
        story={story}
        item={item}
        isActiveItem={isActiveItem}
        isMyPost={isMyPost}
        handleMoreButton={handleMoreButton}
        setPaused={setPaused}
        incrementIndex={incrementIndex}
        decrementIndex={decrementIndex}
      />
      <StoryHeader 
        owner={owner} 
        type={type} 
        item={item} 
        isMyPost={isMyPost} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(StoryItem);
