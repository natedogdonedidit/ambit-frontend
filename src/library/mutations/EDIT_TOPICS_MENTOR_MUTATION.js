import gql from 'graphql-tag';
import { LoggedInUser } from 'library/queries/_fragments';

const EDIT_TOPICS_MENTOR_MUTATION = gql`
  mutation EDIT_TOPICS_MENTOR_MUTATION($id: ID!, $topics: [String]!) {
    editTopicsMentor(id: $id, topics: $topics) {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;

export default EDIT_TOPICS_MENTOR_MUTATION;
