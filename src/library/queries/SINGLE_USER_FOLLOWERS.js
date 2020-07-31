import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const SINGLE_USER_FOLLOWERS = gql`
  query SINGLE_USER_FOLLOWERS($id: ID!) {
    userFollowers(id: $id) {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;

export default SINGLE_USER_FOLLOWERS;
