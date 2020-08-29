import { gql } from '@apollo/client';
import { StoryItemFragment } from 'library/queries/_fragments';

const VIEWED_STORY_ITEM_MUTATION = gql`
  mutation VIEWED_STORY_ITEM_MUTATION($storyItemID: ID!) {
    viewedStoryItem(storyItemID: $storyItemID) {
      ...StoryItemFragment
    }
  }
  ${StoryItemFragment}
`;

export default VIEWED_STORY_ITEM_MUTATION;
