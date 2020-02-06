import gql from 'graphql-tag';
import { DetailPost, LoggedInUser } from 'library/queries/_fragments';

export default ACTIVE_GOALS_MATCHES_QUERY = gql`
  query ACTIVE_GOALS_MATCHES_QUERY {
    activeGoalsUser {
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
      match {
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
