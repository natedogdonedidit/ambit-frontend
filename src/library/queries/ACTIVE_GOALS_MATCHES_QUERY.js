import { gql } from '@apollo/client';
import { DetailPost, MinimalUser } from 'library/queries/_fragments';

export default ACTIVE_GOALS_MATCHES_QUERY = gql`
  query ACTIVE_GOALS_MATCHES_QUERY {
    activeGoalsUser {
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
      match {
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
