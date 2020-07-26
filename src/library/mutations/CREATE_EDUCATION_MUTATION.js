import { gql } from '@apollo/client';
import { DetailedUser } from 'library/queries/_fragments';

const CREATE_EDUCATION_MUTATION = gql`
  mutation CREATE_EDUCATION_MUTATION($owner: ID!, $education: EducationCreateWithoutOwnerInput!) {
    createEducation(owner: $owner, education: $education) {
      ...DetailedUser
    }
  }
  ${DetailedUser}
`;

export default CREATE_EDUCATION_MUTATION;
