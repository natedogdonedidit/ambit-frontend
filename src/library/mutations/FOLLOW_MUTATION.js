import { gql } from '@apollo/client';
import { LoggedInUser } from 'library/queries/_fragments';

const FOLLOW_MUTATION = gql`
  mutation FOLLOW_MUTATION($userID: ID!) {
    followUser(userID: $userID) {
      ...LoggedInUser
    }
  }
  ${LoggedInUser}
`;

export default FOLLOW_MUTATION;
