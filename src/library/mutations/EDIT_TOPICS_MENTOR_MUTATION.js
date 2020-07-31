import { gql } from '@apollo/client';

const EDIT_TOPICS_MENTOR_MUTATION = gql`
  mutation EDIT_TOPICS_MENTOR_MUTATION($topics: [TopicWhereUniqueInput]!) {
    editTopicsMentor(topics: $topics) {
      topicsMentor {
        id
        topicID
        name
      }
    }
  }
`;

export default EDIT_TOPICS_MENTOR_MUTATION;
