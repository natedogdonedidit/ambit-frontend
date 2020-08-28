import { gql } from '@apollo/client';
import { UpdateFragment } from 'library/queries/_fragments';

const UPDATE_UPDATE_MUTATION = gql`
  mutation UPDATE_UPDATE_MUTATION($where: UpdateWhereUniqueInput!, $data: UpdateUpdateInput!) {
    updateOneUpdate(where: $where, data: $data) {
      ...UpdateFragment
    }
  }
  ${UpdateFragment}
`;

export default UPDATE_UPDATE_MUTATION;
