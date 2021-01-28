import { gql } from '@apollo/client';
import { StoryItemFragment } from 'library/queries/_fragments';

const UNLIKE_STORY_ITEM_MUTATION = gql`
  mutation UNLIKE_STORY_ITEM_MUTATION($data: StoryItemUpdateInput!, $where: StoryItemWhereUniqueInput!) {
    unlikeStoryItem(data: $data, where: $where) {
      ...StoryItemFragment
    }
  }
  ${StoryItemFragment}
`;

export default UNLIKE_STORY_ITEM_MUTATION;
