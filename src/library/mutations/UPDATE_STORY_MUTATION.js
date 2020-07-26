import { gql } from '@apollo/client';
import { StoryFragment } from 'library/queries/_fragments';

const UPDATE_STORY_MUTATION = gql`
  mutation UPDATE_STORY_MUTATION($id: ID!, $story: StoryUpdateInput!) {
    updateStory(id: $id, story: $story) {
      ...StoryFragment
    }
  }
  ${StoryFragment}
`;

export default UPDATE_STORY_MUTATION;
