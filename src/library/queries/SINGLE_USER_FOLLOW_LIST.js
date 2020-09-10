import { gql } from '@apollo/client';
import { UserFollowing } from 'library/queries/_fragments';

const SINGLE_USER_FOLLOW_LIST = gql`
  query SINGLE_USER_FOLLOW_LIST($where: UserWhereUniqueInput!) {
    user(where: $where) {
      ...UserFollowing
    }
  }
  ${UserFollowing}
`;

export default SINGLE_USER_FOLLOW_LIST;
