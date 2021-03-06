import { gql } from '@apollo/client';
// import { LoggedInUser } from 'library/queries/_fragments';

const UNFOLLOW_MUTATION = gql`
  mutation UNFOLLOW_MUTATION($userID: ID!) {
    unfollowUser(userID: $userID)
  }
`;

export default UNFOLLOW_MUTATION;
