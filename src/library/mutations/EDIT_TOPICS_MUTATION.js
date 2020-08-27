import { gql } from '@apollo/client';
import { AllTopicsFragment } from 'library/queries/_fragments';

const EDIT_TOPICS_MUTATION = gql`
  mutation EDIT_TOPICS_MUTATION($where: UserWhereUniqueInput!, $data: UserUpdateInput!) {
    updateOneUser(where: $where, data: $data) {
      ...AllTopicsFragment
    }
  }
  ${AllTopicsFragment}
`;

export default EDIT_TOPICS_MUTATION;
