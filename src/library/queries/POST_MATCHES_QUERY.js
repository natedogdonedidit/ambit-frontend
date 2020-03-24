import gql from 'graphql-tag';
import { MinimalUser } from 'library/queries/_fragments';

export default POST_MATCHES_QUERY = gql`
  query POST_MATCHES_QUERY($id: ID!) {
    singlePostMatches(id: $id) {
      user {
        ...MinimalUser
      }
      reason {
        text
        icon
      }
    }
  }
  ${MinimalUser}
`;
