import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import ProfilePic from 'library/components/UI/ProfilePic';

const StoryFooter = ({
  activeStory,
  activeIndex,
  isMyPost,
  navigation,
  handleAddToProfile,
  indexAddedToProfile,
  handleMoreButton,
}) => {
  const { items } = activeStory;
  const activeItem = { ...items[activeIndex] };

  const { owner, stories } = activeItem;

  const indexOfProject = stories.findIndex(s => s.type === 'PROJECT');
  const project = indexOfProject !== -1 ? stories[indexOfProject] : null;
  const soloStory = activeItem.stories.find(s => s.type === 'SOLO');
  const saved = soloStory ? soloStory.save : false;

  const renderTopics = topics => {
    // const { topics } = activeStory;

    if (topics.length > 0) {
      return (
        <View style={{ flexDirection: 'row', overflow: 'hidden', alignItems: 'center' }}>
          <View
            key={topics[0].topicID}
            style={{
              height: 26,
              paddingHorizontal: 6,
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.4)',
              marginRight: 5,
            }}
          >
            <Text style={{ ...defaultStyles.defaultSemibold, color: colors.white }}>{topics[0].name}</Text>
          </View>
        </View>
      );
    }

    return null;
  };

  const renderActions = () => {
    if (isMyPost) {
      return null;
    }

    return (
      <View style={{ paddingRight: 10, paddingBottom: 10 }}>
        <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}>
          <ProfilePic size="medium" user={owner} navigation={navigation} disableVideo border borderWidth={0.5} />
          <View
            style={{
              position: 'absolute',
              bottom: -6,
              right: 2,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: colors.peach,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="plus" solid size={10} color={colors.white} style={{ textAlign: 'center' }} />
          </View>
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            marginTop: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="heart" solid size={30} color="rgba(255,255,255,0.8)" />
          <Text style={{ ...defaultStyles.smallBold, color: 'white', paddingTop: 2 }}>427</Text>
        </View>
        <View
          style={{
            width: 50,
            height: 50,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name="share" solid size={30} color="rgba(255,255,255,0.8)" />
        </View>
      </View>
    );
  };

  const renderTitle = () => {
    const { title, type, topics } = activeStory;

    // if the active story is a project
    if (type === 'PROJECT') {
      return (
        <>
          <Text style={{ ...defaultStyles.hugeBold, fontSize: 20, color: 'rgba(255,255,255,1)', paddingBottom: 10 }}>
            {title || null}
          </Text>
          {renderTopics(topics || [])}
        </>
      );
    }

    // if the active story is not a project...but the story item belongs to a project
    if (project) {
      return (
        <>
          <Text style={{ ...defaultStyles.hugeBold, fontSize: 20, color: 'rgba(255,255,255,1)', paddingBottom: 10 }}>
            {project.title || null}
          </Text>
          {renderTopics(project.topics || [])}
        </>
      );
    }

    // if the item does not belong to a project, but it has topics, just render the topics
    if (topics) {
      if (topics.length > 0) {
        return renderTopics(topics || []);
      }
    }

    return null;
  };

  const renderBottom = () => {
    if (isMyPost) {
      const isSaved = saved || indexAddedToProfile.includes(activeIndex);

      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 6,
                paddingRight: 30,
              }}
            >
              <Feather name="eye" solid size={20} color="rgba(255,255,255,0.8)" />
              <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>29</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 10,
              }}
            >
              <Feather name="heart" solid size={20} color="rgba(255,255,255,0.8)" />
              <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>12</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            {!project && !isSaved && (
              <TouchableOpacity
                onPress={handleAddToProfile}
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 20,
                }}
              >
                <Feather name="plus" solid size={20} color="rgba(255,255,255,0.8)" />
                <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>My Profile</Text>
              </TouchableOpacity>
            )}
            {!project && isSaved && (
              <TouchableOpacity
                onPress={handleAddToProfile}
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 20,
                }}
              >
                <Feather name="check-circle" solid size={20} color="rgba(255,255,255,0.8)" />
                <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>Saved</Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 20,
              }}
            >
              <Feather name="download" solid size={20} color="rgba(255,255,255,0.8)" />
              <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>Download</Text>
            </View>
            <TouchableOpacity
              onPress={handleMoreButton}
              activeOpacity={0.8}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 10,
              }}
            >
              <Feather name="more-horizontal" solid size={20} color="rgba(255,255,255,0.8)" />
              <Text style={{ ...defaultStyles.smallMedium, color: 'white', paddingTop: 2 }}>More</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ ...defaultStyles.defaultMedium, color: 'rgba(255,255,255,0.6)' }}>Send Chad a message..</Text>
      </View>
    );
  };

  return (
    <View style={styles.absoluteBottom}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <View
          style={{
            flex: 1,
            paddingLeft: 8,
            paddingBottom: 14,
          }}
        >
          {renderTitle()}
        </View>
        <View>{renderActions()}</View>
      </View>
      <View
        style={{
          width: '100%',
          height: 50,
          paddingLeft: 8,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: 'rgba(255,255,255,0.3)',
          justifyContent: 'center',
        }}
      >
        {renderBottom()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default StoryFooter;
