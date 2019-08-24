import gql from 'graphql-tag';

const CREATE_EXPERIENCE_MUTATION = gql`
  mutation CREATE_EXPERIENCE_MUTATION($owner: ID!, $experience: ExperienceCreateWithoutOwnerInput!) {
    createExperience(owner: $owner, experience: $experience) {
      id
      name
      subText
      startDateMonth
      startDateYear
      endDateMonth
      endDateYear
      location
      currentRole
    }
  }
`;

export default CREATE_EXPERIENCE_MUTATION;
