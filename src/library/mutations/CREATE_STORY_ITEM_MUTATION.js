import { gql } from '@apollo/client';
// import { MinimalUser } from 'library/queries/_fragments';

const CREATE_STORY_ITEM_MUTATION = gql`
  mutation CREATE_STORY_ITEM_MUTATION($storyItem: StoryItemCreateInput!) {
    createStoryItem(storyItem: $storyItem) {
      id
    }
  }
`;

export default CREATE_STORY_ITEM_MUTATION;
