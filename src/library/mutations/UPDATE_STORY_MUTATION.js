import { gql } from '@apollo/client';
import { StoryFragment } from 'library/queries/_fragments';

const UPDATE_STORY_MUTATION = gql`
  mutation UPDATE_STORY_MUTATION($where: StoryWhereUniqueInput!, $data: StoryUpdateInput!) {
    updateOneStory(where: $where, data: $data) {
      ...StoryFragment
    }
  }
  ${StoryFragment}
`;

export default UPDATE_STORY_MUTATION;
