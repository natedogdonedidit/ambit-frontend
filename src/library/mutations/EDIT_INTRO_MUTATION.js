import gql from 'graphql-tag';
import { MinimalUser } from 'library/queries/_fragments';

const EDIT_INTRO_MUTATION = gql`
  mutation EDIT_INTRO_MUTATION($userId: ID!, $title: String, $items: [StoryItemCreateWithoutStoryInput!]) {
    editIntro(userId: $userId, title: $title, items: $items) {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;

export default EDIT_INTRO_MUTATION;
