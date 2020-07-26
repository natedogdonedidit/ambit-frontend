import { gql } from '@apollo/client';
import { DetailedUser } from 'library/queries/_fragments';

const EDIT_SKILLS_MUTATION = gql`
  mutation EDIT_SKILLS_MUTATION($id: ID!, $skills: [SkillCreateWithoutOwnerInput!]) {
    editSkills(id: $id, skills: $skills) {
      ...DetailedUser
    }
  }
  ${DetailedUser}
`;

export default EDIT_SKILLS_MUTATION;
