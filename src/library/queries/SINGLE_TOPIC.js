import { gql } from '@apollo/client';

const SINGLE_TOPIC = gql`
  query SINGLE_TOPIC($where: TopicWhereUniqueInput!) {
    topic(where: $where) {
      id
      followersCount
    }
  }
`;

export default SINGLE_TOPIC;
