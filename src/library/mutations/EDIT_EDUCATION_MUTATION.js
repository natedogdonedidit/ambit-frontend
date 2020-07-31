import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

const EDIT_EDUCATION_MUTATION = gql`
  mutation EDIT_EDUCATION_MUTATION($owner: ID!, $id: ID!, $education: EducationUpdateInput!) {
    editEducation(owner: $owner, id: $id, education: $education) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default EDIT_EDUCATION_MUTATION;
