import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

const UPDATE_STORY_MUTATION = gql`
  mutation UPDATE_STORY_MUTATION($id: ID!, $story: StoryUpdateInput!) {
    updateStory(id: $id, story: $story) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;

export default UPDATE_STORY_MUTATION;
