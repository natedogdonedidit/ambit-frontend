import gql from 'graphql-tag';
// import { StoryItemFragment } from 'library/queries/_fragments';

const VIEWED_STORY_ITEM_MUTATION = gql`
  mutation VIEWED_STORY_ITEM_MUTATION($storyItemID: ID!) {
    viewedStoryItem(storyItemID: $storyItemID) {
      id
    }
  }
`;

export default VIEWED_STORY_ITEM_MUTATION;