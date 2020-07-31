import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

const DELETE_EDUCATION_MUTATION = gql`
  mutation DELETE_EDUCATION_MUTATION($owner: ID!, $id: ID!) {
    deleteEducation(owner: $owner, id: $id) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default DELETE_EDUCATION_MUTATION;
