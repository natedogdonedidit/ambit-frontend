import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

const CREATE_EDUCATION_MUTATION = gql`
  mutation CREATE_EDUCATION_MUTATION($owner: ID!, $education: EducationCreateWithoutOwnerInput!) {
    createEducation(owner: $owner, education: $education) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default CREATE_EDUCATION_MUTATION;
