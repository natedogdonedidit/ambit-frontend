import gql from 'graphql-tag';
import { DetailedUser } from 'library/queries/_fragments';

const EDIT_EDUCATION_MUTATION = gql`
  mutation EDIT_EDUCATION_MUTATION($owner: ID!, $id: ID!, $education: EducationUpdateInput!) {
    editEducation(owner: $owner, id: $id, education: $education) {
      ...DetailedUser
    }
  }
  ${DetailedUser}
`;

export default EDIT_EDUCATION_MUTATION;
