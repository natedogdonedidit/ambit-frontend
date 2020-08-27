import { gql } from '@apollo/client';
import { MinimalUser } from 'library/queries/_fragments';

export default CURRENT_USER_MATCHES = gql`
  query CURRENT_USER_MATCHES($after: UserWhereUniqueInput, $first: Int, $where: UserWhereInput, $orderBy: [UserOrderByInput!]) {
    users(after: $after, first: $first, where: $where, orderBy: $orderBy) {
      ...MinimalUser
    }
  }
  ${MinimalUser}
`;
