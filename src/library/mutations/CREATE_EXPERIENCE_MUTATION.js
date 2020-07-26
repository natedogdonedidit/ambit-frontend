import { gql } from '@apollo/client';
import { DetailedUser } from 'library/queries/_fragments';

const CREATE_EXPERIENCE_MUTATION = gql`
  mutation CREATE_EXPERIENCE_MUTATION($owner: ID!, $experience: ExperienceCreateWithoutOwnerInput!) {
    createExperience(owner: $owner, experience: $experience) {
      ...DetailedUser
    }
  }
  ${DetailedUser}
`;

export default CREATE_EXPERIENCE_MUTATION;
