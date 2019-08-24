import gql from 'graphql-tag';

const CREATE_EDUCATION_MUTATION = gql`
  mutation CREATE_EDUCATION_MUTATION($owner: ID!, $education: EducationCreateWithoutOwnerInput!) {
    createEducation(owner: $owner, education: $education) {
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

export default CREATE_EDUCATION_MUTATION;
