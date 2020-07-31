import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

const EDIT_SKILLS_MUTATION = gql`
  mutation EDIT_SKILLS_MUTATION($id: ID!, $skills: [SkillCreateWithoutOwnerInput!]) {
    editSkills(id: $id, skills: $skills) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default EDIT_SKILLS_MUTATION;
