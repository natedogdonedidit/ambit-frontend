import { gql } from '@apollo/client';

const FOLLOW_MUTATION = gql`
  mutation FOLLOW_MUTATION($userID: ID!) {
    followUser(userID: $userID)
  }
`;

export default FOLLOW_MUTATION;
