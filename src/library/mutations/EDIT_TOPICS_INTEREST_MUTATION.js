import { gql } from '@apollo/client';

const EDIT_TOPICS_INTEREST_MUTATION = gql`
  mutation EDIT_TOPICS_INTEREST_MUTATION($topics: [TopicWhereUniqueInput]!) {
    editTopicsInterest(topics: $topics) {
      topicsInterest {
        id
        topicID
        name
      }
    }
  }
`;

export default EDIT_TOPICS_INTEREST_MUTATION;
