import gql from 'graphql-tag';
import { LoggedInUser } from 'library/queries/_fragments';

const EDIT_TOPICS_INTEREST_MUTATION = gql`
  mutation EDIT_TOPICS_INTEREST_MUTATION($id: ID!, $topics: [String]!) {
    editTopicsInterest(id: $id, topics: $topics) {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;

export default EDIT_TOPICS_INTEREST_MUTATION;
