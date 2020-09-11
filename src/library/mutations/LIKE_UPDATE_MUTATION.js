import { gql } from '@apollo/client';
import { UpdateFragment } from 'library/queries/_fragments';

const LIKE_UPDATE_MUTATION = gql`
  mutation LIKE_UPDATE_MUTATION($where: UpdateWhereUniqueInput!, $data: UpdateUpdateInput!) {
    likeUpdate(where: $where, data: $data) {
      ...UpdateFragment
    }
  }
  ${UpdateFragment}
`;

export default LIKE_UPDATE_MUTATION;
