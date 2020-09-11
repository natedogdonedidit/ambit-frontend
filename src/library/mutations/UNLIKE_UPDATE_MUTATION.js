import { gql } from '@apollo/client';
import { UpdateFragment } from 'library/queries/_fragments';

const UNLIKE_UPDATE_MUTATION = gql`
  mutation UNLIKE_UPDATE_MUTATION($where: UpdateWhereUniqueInput!, $data: UpdateUpdateInput!) {
    unlikeUpdate(where: $where, data: $data) {
      ...UpdateFragment
    }
  }
  ${UpdateFragment}
`;

export default UNLIKE_UPDATE_MUTATION;
