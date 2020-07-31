import { gql } from '@apollo/client';

const EDIT_TOPICS_FREELANCE_MUTATION = gql`
  mutation EDIT_TOPICS_FREELANCE_MUTATION($topics: [TopicWhereUniqueInput]!) {
    editTopicsFreelance(topics: $topics) {
      topicsFreelance {
        id
        topicID
        name
      }
    }
  }
`;

export default EDIT_TOPICS_FREELANCE_MUTATION;
