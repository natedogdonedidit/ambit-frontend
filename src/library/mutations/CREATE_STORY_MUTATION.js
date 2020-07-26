import { gql } from '@apollo/client';
import { StoryFragment } from 'library/queries/_fragments';

const CREATE_STORY_MUTATION = gql`
  mutation CREATE_STORY_MUTATION($story: StoryCreateInput!) {
    createStory(story: $story) {
      ...StoryFragment
    }
  }
  ${StoryFragment}
`;

export default CREATE_STORY_MUTATION;
