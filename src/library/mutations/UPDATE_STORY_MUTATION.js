import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

const UPDATE_STORY_MUTATION = gql`
  mutation UPDATE_STORY_MUTATION($where: StoryWhereUniqueInput!, $data: StoryUpdateInput!) {
    updateOneStory(where: $where, data: $data) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;

export default UPDATE_STORY_MUTATION;
