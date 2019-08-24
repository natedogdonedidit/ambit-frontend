import gql from 'graphql-tag';

const DELETE_EXPERIENCE_MUTATION = gql`
  mutation DELETE_EXPERIENCE_MUTATION($owner: ID!, $id: ID!) {
    deleteExperience(owner: $owner, id: $id) {
      id
    }
  }
`;

export default DELETE_EXPERIENCE_MUTATION;
