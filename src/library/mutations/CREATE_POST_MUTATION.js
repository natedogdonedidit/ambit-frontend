import gql from 'graphql-tag';

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION($owner: ID!, $post: ExperienceCreateWithoutOwnerInput!) {
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

export default CREATE_POST_MUTATION;
