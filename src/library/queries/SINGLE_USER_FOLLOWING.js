import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const SINGLE_USER_FOLLOWING = gql`
  query SINGLE_USER_FOLLOWING($id: ID!) {
    userFollowing(id: $id) {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;

export default SINGLE_USER_FOLLOWING;
