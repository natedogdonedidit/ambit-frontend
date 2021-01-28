import { gql } from '@apollo/client';
import { StoryItemFragment } from 'library/queries/_fragments';

const LIKE_STORY_ITEM_MUTATION = gql`
  mutation LIKE_STORY_ITEM_MUTATION($data: StoryItemUpdateInput!, $where: StoryItemWhereUniqueInput!) {
    likeStoryItem(data: $data, where: $where) {
      ...StoryItemFragment
    }
  }
  ${StoryItemFragment}
`;

export default LIKE_STORY_ITEM_MUTATION;
