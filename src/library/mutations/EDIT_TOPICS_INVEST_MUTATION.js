import { gql } from '@apollo/client';

const EDIT_TOPICS_INVEST_MUTATION = gql`
  mutation EDIT_TOPICS_INVEST_MUTATION($topics: [TopicWhereUniqueInput]!) {
    editTopicsInvest(topics: $topics) {
      topicsInvest {
        id
        topicID
        name
      }
    }
  }
`;

export default EDIT_TOPICS_INVEST_MUTATION;
