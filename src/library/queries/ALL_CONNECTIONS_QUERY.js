import gql from 'graphql-tag';
import { DetailPost, LoggedInUser } from 'library/queries/_fragments';

export default ALL_CONNECTIONS_QUERY = gql`
  query ALL_CONNECTIONS_QUERY {
    allConnections {
      postsWithMatches {
        post {
          ...DetailPost
        }
        matches {
          user {
            ...LoggedInUser
          }
          reason {
            text
            icon
          }
        }
      }
      matches {
        user {
          ...LoggedInUser
        }
        reason {
          text
          icon
        }
      }
    }
  }
  ${DetailPost}
  ${LoggedInUser}
`;
