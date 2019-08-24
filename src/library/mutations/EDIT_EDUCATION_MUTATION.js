import gql from 'graphql-tag';

const EDIT_EDUCATION_MUTATION = gql`
  mutation EDIT_EDUCATION_MUTATION($owner: ID!, $id: ID!, $education: EducationUpdateInput!) {
    editEducation(owner: $owner, id: $id, education: $education) {
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

export default EDIT_EDUCATION_MUTATION;
