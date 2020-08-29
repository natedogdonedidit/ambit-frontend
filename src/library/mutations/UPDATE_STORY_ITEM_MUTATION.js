import { gql } from '@apollo/client';
import { StoryItemFragment } from 'library/queries/_fragments';

const UPDATE_STORY_ITEM_MUTATION = gql`
  mutation UPDATE_STORY_ITEM_MUTATION($data: StoryItemUpdateInput!, $where: StoryItemWhereUniqueInput!) {
    updateOneStoryItem(data: $data, where: $where) {
      ...StoryItemFragment
    }
  }
  ${StoryItemFragment}
`;

export default UPDATE_STORY_ITEM_MUTATION;
