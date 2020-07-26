import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useQuery, useMutation, useApolloClient} from '@apollo/client';

import colors from 'styles/colors';
import defaultStyles from 'styles/defaultStyles';
import HeaderBackBlank from 'library/components/headers/HeaderBackBlank';
import TopicsList from 'library/components/lists/TopicsList';

import EDIT_TOPICS_MENTOR_MUTATION from 'library/mutations/EDIT_TOPICS_MENTOR_MUTATION';
import CURRENT_USER_TOPICS from 'library/queries/CURRENT_USER_TOPICS';

const SelectTopicsMentorModal = ({ navigation }) => {
  const client = useApolloClient()

  const [selectedCategories, setSelectedCategories] = useState('');

  // ////////////////////////////////////////
  // QUERIES
  const { loading, error, data } = useQuery(CURRENT_USER_TOPICS);
  if (loading) return null;
  if (error) return <Text>{`Error! ${error}`}</Text>;
  const { myTopics } = data;
  // this is the single source of truth
  const { topicsMentor: topics } = myTopics;
  const topicsIDonly = topics.map((topic) => topic.topicID);

  // ////////////////////////////////////////
  // MUTATIONS
  const [editTopicsMentor] = useMutation(EDIT_TOPICS_MENTOR_MUTATION, {
    onError: () =>
      Alert.alert('Oh no!', 'An error occured when trying to edit your topics. Try again later!', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]),
  });

  // ////////////////////////////////////////
  // CUSTOM FUNCTIONS
  const handleTopicSelect = (selectedTopicID, selectedTopicName) => {
    // build the new array of topics
    let newArray = [];
    if (topicsIDonly.includes(selectedTopicID)) {
      // remove it
      newArray = topics.filter((topic) => topic.topicID !== selectedTopicID);
    } else {
      // add it
      newArray = [...topics, { topicID: selectedTopicID, name: selectedTopicName }];
    }

    // for mutation
    const newArrayTopicIDonly = newArray.map((topic) => {
      return { topicID: topic.topicID };
    });

    // for optimistic response
    const newArrayTopicIDandType = newArray.map((topic) => {
      return { id: topic.topicID, topicID: topic.topicID, name: topic.name, __typename: 'Topic' };
    });

    // run the mutation
    editTopicsMentor({
      variables: {
        topics: newArrayTopicIDonly,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        editTopicsMentor: {
          __typename: 'User',
          ...myTopics,
          topicsMentor: newArrayTopicIDandType,
        },
      },
      update: (proxy, { data: dataReturned }) => {
        // console.log('dataReturned', dataReturned.editTopicsMentor);
        // const data = proxy.readQuery({ query: CURRENT_USER_QUERY });

        client.writeQuery({
          query: CURRENT_USER_TOPICS,
          data: {
            myTopics: dataReturned.editTopicsMentor,
          },
        });
      },
    });
  };

  const handleCategorySelect = (category) => {
    if (selectedCategories.includes(category)) {
      const index = selectedCategories.indexOf(category);
      if (index > -1) {
        const newArray = [...selectedCategories];
        newArray.splice(index, 1);
        setSelectedCategories(newArray);
      }
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <HeaderBackBlank
          navigation={navigation}
          rightComponent={<Icon name="question-circle" size={22} color={colors.iconDark} />}
        />

        <ScrollView style contentContainerStyle={styles.scrollView}>
          <View style={{ width: '100%', paddingHorizontal: 5 }}>
            <View style={styles.mainTitle}>
              <Text style={defaultStyles.headerMedium}>Select your areas{`\n`}of expertise</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={defaultStyles.defaultMute}>
                We will suggest you as a potential mentor for users looking for a mentor in these topics
              </Text>
            </View>
          </View>
          <TopicsList
            activeTopicIDs={topicsIDonly}
            selectedCategories={selectedCategories}
            handleTopicSelect={handleTopicSelect}
            handleCategorySelect={handleCategorySelect}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectTopicsMentorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  mainTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  subTitle: {
    width: '100%',
    paddingBottom: 20,
  },
});

//   // ////////////////////////////////////////
//   // RENDER FUNCTIONS
//   const renderList = () => {
//     return topicsList.map((mainTopic, i) => {
//       const { name, topicID, children } = mainTopic;

//       const isSelected = topicsIDonly.includes(topicID);
//       const isExpanded = selectedCategories.includes(topicID);

//       return (
//         <View key={`${topicID}-${i}`} style={styles.categorySection}>
//           <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategorySelect(topicID)}>
//             <View style={{ ...styles.mainRow }}>
//               <Text style={{ ...defaultStyles.hugeSemibold, color: colors.purp, paddingRight: 15, flex: 1 }}>{name}</Text>
//               <Ionicons name={isExpanded ? 'ios-arrow-down' : 'ios-arrow-forward'} size={24} color={colors.iconGray} />
//             </View>
//           </TouchableOpacity>
//           {isExpanded && children.length > 0 && (
//             <View style={styles.subTopicsView}>
//               <TouchableOpacity key={`${i}-${topicID}`} activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
//                 <View style={{ ...styles.subRow }}>
//                   <Text style={{ ...defaultStyles.largeMedium, color: colors.blueGray, paddingRight: 15, flex: 1 }}>
//                     {name} (general)
//                   </Text>
//                   {isSelected ? (
//                     <View style={styles.addedButton}>
//                       <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
//                     </View>
//                   ) : (
//                     <View style={styles.addButton}>
//                       <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
//                     </View>
//                   )}
//                 </View>
//               </TouchableOpacity>
//               {renderSubtopics(children)}
//             </View>
//           )}
//         </View>
//       );
//     });
//   };

//   const renderSubtopics = subTopics => {
//     return subTopics.map((subTopic, i) => {
//       const { name, topicID } = subTopic;
//       const isSelected = topicsIDonly.includes(topicID);

//       return (
//         <TouchableOpacity key={`${subTopic}-${i + 10}`} activeOpacity={0.7} onPress={() => handleTopicSelect(topicID, name)}>
//           <View style={{ ...styles.subRow }}>
//             <Text style={{ ...defaultStyles.largeMedium, color: colors.blueGray, paddingRight: 15, flex: 1 }}>{name}</Text>
//             {isSelected ? (
//               <View style={styles.addedButton}>
//                 <Text style={{ ...defaultStyles.defaultMedium, color: 'white' }}>Added</Text>
//               </View>
//             ) : (
//               <View style={styles.addButton}>
//                 <Text style={{ ...defaultStyles.defaultMedium, color: colors.purp }}>Add</Text>
//               </View>
//             )}
//           </View>
//         </TouchableOpacity>
//       );
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <HeaderBack navigation={navigation} title="" />
//       <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
//         <View
//           style={{
//             width: 100,
//             height: 100,
//             borderRadius: 50,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: colors.goalPurp,
//             marginTop: 10,
//             marginBottom: 15,
//           }}
//         >
//           {/* <Icon name="briefcase" size={40} color={colors.purp} /> */}
//           <Icon name="user-friends" size={40} color={colors.purp} />
//         </View>
//         <View style={{ width: '100%' }}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Text
//               style={{
//                 ...defaultStyles.headerMedium,
//               }}
//             >
//               Select your areas{`\n`}of expertise
//             </Text>
//           </View>

//           <Text style={{ ...defaultStyles.defaultMute, paddingTop: 8 }}>
//             We will suggest you as a potential mentor for users looking for a mentor in these topics
//           </Text>
//         </View>

//         <View style={styles.listView}>{renderList()}</View>
//       </ScrollView>
//     </View>
//   );
// };

// export default SelectTopicsMentorModal;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.white,
//   },
//   listView: {
//     flex: 1,
//     width: '100%',
//     paddingTop: 30,
//   },
//   categorySection: {
//     borderTopWidth: StyleSheet.hairlineWidth,
//     borderColor: colors.borderBlack,
//   },
//   mainRow: {
//     flexDirection: 'row',
//     width: '100%',
//     height: 48,
//     alignItems: 'center',
//     paddingRight: 10,
//   },
//   subTopicsView: {
//     paddingLeft: 15,
//   },
//   subRow: {
//     flexDirection: 'row',
//     width: '100%',
//     height: 48,
//     alignItems: 'center',
//     borderTopWidth: StyleSheet.hairlineWidth,
//     borderColor: colors.borderBlack,
//   },
//   // add button
//   addButton: {
//     height: 30,
//     width: 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: colors.purp,
//     opacity: 0.9,
//   },
//   addedButton: {
//     height: 30,
//     width: 70,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 15,
//     backgroundColor: colors.purp,
//   },
// });
