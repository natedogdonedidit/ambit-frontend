import gql from 'graphql-tag';

const EDIT_SKILLS_MUTATION = gql`
  mutation EDIT_SKILLS_MUTATION($id: ID!, $skills: [SkillCreateWithoutOwnerInput!]) {
    editSkills(id: $id, skills: $skills) {
      id
      name
      email
      skills {
        id
        skill
        isExpert
      }
    }
  }
`;

export default EDIT_SKILLS_MUTATION;
