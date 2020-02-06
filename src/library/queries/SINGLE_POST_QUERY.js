import gql from 'graphql-tag';
import { DetailPost, LoggedInUser } from 'library/queries/_fragments';

export default SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    singlePost(id: $id) {
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
  }
  ${DetailPost}
  ${LoggedInUser}
`;
