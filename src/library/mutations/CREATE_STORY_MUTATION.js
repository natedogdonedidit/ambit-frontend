import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

const CREATE_STORY_MUTATION = gql`
  mutation CREATE_STORY_MUTATION($story: StoryCreateInput!) {
    createStory(story: $story) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;

export default CREATE_STORY_MUTATION;
