import gql from 'graphql-tag';

const DELETE_EDUCATION_MUTATION = gql`
  mutation DELETE_EDUCATION_MUTATION($owner: ID!, $id: ID!) {
    deleteEducation(owner: $owner, id: $id) {
      id
    }
  }
`;

export default DELETE_EDUCATION_MUTATION;
