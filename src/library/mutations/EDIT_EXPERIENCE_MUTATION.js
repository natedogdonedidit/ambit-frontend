import gql from 'graphql-tag';
import { DetailedUser } from 'library/queries/_fragments';

const EDIT_EXPERIENCE_MUTATION = gql`
  mutation EDIT_EXPERIENCE_MUTATION($owner: ID!, $id: ID!, $experience: ExperienceUpdateInput!) {
    editExperience(owner: $owner, id: $id, experience: $experience) {
      ...DetailedUser
    }
  }
  ${DetailedUser}
`;

export default EDIT_EXPERIENCE_MUTATION;
