import { gql } from '@apollo/client';

export default POST_RETWEETS_QUERY = gql`
  query POST_RETWEETS_QUERY($where: PostWhereUniqueInput!, $network: [String!]) {
    post(where: $where) {
      id
      reposts(where: { id: { in: $network } }) {
        id
        username
      }
    }
  }
`;
