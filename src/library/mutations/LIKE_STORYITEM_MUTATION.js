import gql from 'graphql-tag';
import { StoryItemFragment } from 'library/queries/_fragments';

const LIKE_STORYITEM_MUTATION = gql`
  mutation LIKE_STORYITEM_MUTATION($storyItemId: ID!) {
    likeStoryItem(storyItemId: $storyItemId) {
      ...StoryItemFragment
    }
  }
  ${StoryItemFragment}
`;

export default LIKE_STORYITEM_MUTATION;
