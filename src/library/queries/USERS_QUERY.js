import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

const USERS_QUERY = gql`
  query USERS_QUERY($after: UserWhereUniqueInput, $first: Int, $where: UserWhereInput, $orderBy: [UserOrderByInput!]) {
    users(after: $after, first: $first, where: $where, orderBy: $orderBy) {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;

export default USERS_QUERY;
