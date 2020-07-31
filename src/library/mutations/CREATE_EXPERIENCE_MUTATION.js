import { gql } from '@apollo/client';
import { UserProfileFragment } from 'library/queries/_fragments';

const CREATE_EXPERIENCE_MUTATION = gql`
  mutation CREATE_EXPERIENCE_MUTATION($owner: ID!, $experience: ExperienceCreateWithoutOwnerInput!) {
    createExperience(owner: $owner, experience: $experience) {
      ...UserProfileFragment
    }
  }
  ${UserProfileFragment}
`;

export default CREATE_EXPERIENCE_MUTATION;
