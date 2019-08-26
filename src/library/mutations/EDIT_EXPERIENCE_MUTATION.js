import gql from 'graphql-tag';

const EDIT_EXPERIENCE_MUTATION = gql`
  mutation EDIT_EXPERIENCE_MUTATION($owner: ID!, $id: ID!, $experience: ExperienceUpdateInput!) {
    editExperience(owner: $owner, id: $id, experience: $experience) {
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

export default EDIT_EXPERIENCE_MUTATION;