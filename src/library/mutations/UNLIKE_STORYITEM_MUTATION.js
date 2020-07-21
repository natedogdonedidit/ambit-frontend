import gql from 'graphql-tag';
import { StoryItemFragment } from 'library/queries/_fragments';

const UNLIKE_STORYITEM_MUTATION = gql`
  mutation UNLIKE_STORYITEM_MUTATION($storyItemId: ID!) {
    unlikeStoryItem(storyItemId: $storyItemId) {
      ...StoryItemFragment
    }
  }
  ${StoryItemFragment}
`;

export default UNLIKE_STORYITEM_MUTATION;
