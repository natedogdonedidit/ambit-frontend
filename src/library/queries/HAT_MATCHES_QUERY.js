import { gql } from '@apollo/client';
import { BasicPost } from 'library/queries/_fragments';

export default HAT_MATCHES_QUERY = gql`
  query HAT_MATCHES_QUERY($type: String!, $first: Int) {
    hatMatches(type: $type, first: $first) {
      edges {
        node {
          ...BasicPost
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${BasicPost}
`;
