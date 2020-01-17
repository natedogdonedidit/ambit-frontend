import gql from 'graphql-tag';
import { LoggedInUser } from 'library/queries/_fragments';

const EDIT_TOPICS_FREELANCE_MUTATION = gql`
  mutation EDIT_TOPICS_FREELANCE_MUTATION($id: ID!, $topics: [TopicWhereUniqueInput]!) {
    editTopicsFreelance(id: $id, topics: $topics) {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;

export default EDIT_TOPICS_FREELANCE_MUTATION;
