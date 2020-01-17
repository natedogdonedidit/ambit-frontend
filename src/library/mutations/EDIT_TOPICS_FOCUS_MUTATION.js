import gql from 'graphql-tag';
import { LoggedInUser } from 'library/queries/_fragments';

const EDIT_TOPICS_FOCUS_MUTATION = gql`
  mutation EDIT_TOPICS_FOCUS_MUTATION($id: ID!, $topics: [TopicWhereUniqueInput]!) {
    editTopicsFocus(id: $id, topics: $topics) {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;

export default EDIT_TOPICS_FOCUS_MUTATION;
