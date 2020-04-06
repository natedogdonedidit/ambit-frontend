import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-apollo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';

import HeaderBack from 'library/components/headers/HeaderBack';
import ProfilePic from 'library/components/UI/ProfilePic';
import ProjectSquare from 'library/components/stories/ProjectSquare';
import CURRENT_USER_QUERY from 'library/queries/CURRENT_USER_QUERY';
import { getParentTopicFromID } from 'library/utils';

const PostToModal = ({ navigation, route }) => {
  const { capturedImage, capturedVideo } = route.params;

  const [myStory, setMyStory] = useState(false);
  const [topicsToPost, setTopicsToPost] = useState([]);

  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(CURRENT_USER_QUERY);
  const { userLoggedIn } = dataUser;

  const projects = userLoggedIn.projects || [];

  // get a list of my topics
  let favoriteTopics = [];
  if (userLoggedIn) {
    if (userLoggedIn.topicsFocus.length > 0) {
      favoriteTopics = [...userLoggedIn.topicsFocus];
    }
    if (userLoggedIn.topicsInterest.length > 0) {
      if (favoriteTopics === []) {
        favoriteTopics = [...userLoggedIn.topicsInterest];
      } else {
        // only add topics that dont already exist
        userLoggedIn.topicsInterest.forEach(topic => {
          if (favoriteTopics.findIndex(fav => fav.topicID === topic.topicID) === -1) {
            favoriteTopics = [...favoriteTopics, topic];
          }
        });
      }
    }
  }

  const toggleStory = () => {
    setMyStory(!myStory);
  };

  const toggleTopic = selectedTopicID => {
    let newArray = [...topicsToPost];
    if (topicsToPost.includes(selectedTopicID)) {
      // remove it
      newArray = newArray.filter(topicID => topicID !== selectedTopicID);
    } else {
      // add it
      newArray = [...topicsToPost, selectedTopicID];
    }

    setTopicsToPost(newArray);
  };

  // render methods

  const renderMyStory = () => {
    return (
      <TouchableOpacity style={styles.storyRow} activeOpacity={1} onPress={toggleStory}>
        <View style={styles.leftSide}>
          <ProfilePic size="medium" navigation={navigation} user={userLoggedIn} disableVideo />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>My Story</Text>
        </View>
        <View style={{ width: 40 }}>
          {myStory ? (
            <Icon name="check-circle" solid size={26} color={colors.purp} />
          ) : (
            <Feather name="circle" size={26} color={colors.gray24} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderProjects = () => {
    if (projects.length < 1) {
      return null;
    }

    return projects.map(project => {
      return (
        <TouchableOpacity key={project.id} style={styles.projectRow} activeOpacity={0.8} onPress={null}>
          <View style={styles.leftSide}>
            <ProjectSquare navigation={navigation} project={project} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>{project.title}</Text>
          </View>
          <View style={{ width: 40 }} />
        </TouchableOpacity>
      );
    });
  };

  const renderTopics = () => {
    if (favoriteTopics.length < 1) {
      return null;
    }

    return favoriteTopics.map(topic => {
      const { name, topicID } = topic;
      const parent = getParentTopicFromID(topicID);
      const { icon, color } = parent;

      const selected = topicsToPost.includes(topicID);

      return (
        <TouchableOpacity key={topicID} style={styles.topicRow} activeOpacity={0.8} onPress={() => toggleTopic(topicID)}>
          <View style={styles.leftSide}>
            <Icon name={icon || 'circle'} size={20} color={color || colors.iconGray} solid />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>{name}</Text>
          </View>
          <View style={{ width: 40 }}>
            {selected ? (
              <Icon name="check-circle" solid size={26} color={colors.purp} />
            ) : (
              <Feather name="circle" size={26} color={colors.gray24} />
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBack navigation={navigation} title="Post to" handleBack={navigation.goBack} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 10 }}>
        {renderMyStory()}
        <View style={{ paddingTop: 8 }}>
          <Text style={{ ...defaultStyles.largeBold, color: colors.gray30 }}>My Projects</Text>
        </View>
        <TouchableOpacity style={styles.projectRow} activeOpacity={1} onPress={null}>
          <View style={styles.leftSide}>
            <ProjectSquare navigation={navigation} project={null} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ ...defaultStyles.largeMedium, paddingLeft: 10 }}>New Project</Text>
          </View>
          <View style={{ width: 40 }} />
        </TouchableOpacity>
        {renderProjects()}
        <View style={{ paddingTop: 24, paddingBottom: 10 }}>
          <Text style={{ ...defaultStyles.largeBold, color: colors.gray30 }}>Topic Stories</Text>
        </View>
        {renderTopics()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  storyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  leftSide: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostToModal;
