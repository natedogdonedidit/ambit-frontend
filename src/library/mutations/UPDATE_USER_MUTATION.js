import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateOneUser(where: $where, data: $data) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default UPDATE_USER_MUTATION;
