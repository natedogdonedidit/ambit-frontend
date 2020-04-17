import gql from 'graphql-tag';
// import { LoggedInUser } from 'library/queries/_fragments';

const CREATE_STORY_ITEM_MUTATION = gql`
  mutation CREATE_STORY_ITEM_MUTATION($storyItem: StoryItemCreateInput!) {
    createStoryItem(storyItem: $storyItem) {
      id
    }
  }
`;

export default CREATE_STORY_ITEM_MUTATION;

// const CREATE_STORY_ITEM_MUTATION = gql`
//   mutation CREATE_STORY_ITEM_MUTATION(
//     $storyItem: StoryItemCreateInput!
//     $myStoryID: StoryWhereUniqueInput
//     $topicStoryIDs: [StoryWhereUniqueInput]
//   ) {
//     createStoryItem(storyItem: $storyItem, myStoryID: $myStoryID, topicStoryIDs: $topicStoryIDs) {
//       id
//     }
//   }
// `;

// export default CREATE_STORY_ITEM_MUTATION;
