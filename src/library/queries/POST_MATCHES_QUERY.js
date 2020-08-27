import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

export default POST_MATCHES_QUERY = gql`
  query POST_MATCHES_QUERY($postId: String!) {
    singlePostMatches(postId: $postId) {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;
