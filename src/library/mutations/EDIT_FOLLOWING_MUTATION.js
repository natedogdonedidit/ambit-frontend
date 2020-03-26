import gql from 'graphql-tag';
import { LoggedInUser } from 'library/queries/_fragments';

const EDIT_FOLLOWING_MUTATION = gql`
  mutation EDIT_FOLLOWING_MUTATION($userID: ID!, $newFollow: Boolean!) {
    editFollowing(userID: $userID, newFollow: $newFollow) {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;

export default EDIT_FOLLOWING_MUTATION;
