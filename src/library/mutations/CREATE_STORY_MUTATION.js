import { gql } from '@apollo/client';
import { StoryWithOwner } from 'library/queries/_fragments';

const CREATE_STORY_MUTATION = gql`
  mutation CREATE_STORY_MUTATION($data: StoryCreateInput!) {
    createOneStory(data: $data) {
      ...StoryWithOwner
    }
  }
  ${StoryWithOwner}
`;

export default CREATE_STORY_MUTATION;
