import { gql } from '@apollo/client';
import { DetailPost, MinimalUser } from 'library/queries/_fragments';

export default ALL_CONNECTIONS_QUERY = gql`
  query ALL_CONNECTIONS_QUERY {
    allConnections {
      postsWithMatches {
        post {
          ...DetailPost
        }
        matches {
          user {
            ...MinimalUser
          }
          reason {
            text
            icon
          }
        }
      }
      matches {
        user {
          ...MinimalUser
        }
        reason {
          text
          icon
        }
      }
    }
  }
  ${DetailPost}
  ${MinimalUser}
`;
