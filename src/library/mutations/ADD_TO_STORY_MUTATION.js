import gql from 'graphql-tag';
import { LoggedInUser } from 'library/queries/_fragments';

const ADD_TO_STORY_MUTATION = gql`
  mutation ADD_TO_STORY_MUTATION($storyItem: StoryItemCreateWithoutStoryInput!) {
    addToStory(storyItem: $storyItem) {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;

export default ADD_TO_STORY_MUTATION;
