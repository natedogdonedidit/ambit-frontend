import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

const DELETE_EXPERIENCE_MUTATION = gql`
  mutation DELETE_EXPERIENCE_MUTATION($owner: ID!, $id: ID!) {
    deleteExperience(owner: $owner, id: $id) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default DELETE_EXPERIENCE_MUTATION;
