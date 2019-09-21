import gql from 'graphql-tag';
import { DetailedUser } from 'library/queries/_fragments';

const DELETE_EXPERIENCE_MUTATION = gql`
  mutation DELETE_EXPERIENCE_MUTATION($owner: ID!, $id: ID!) {
    deleteExperience(owner: $owner, id: $id) {
      ...DetailedUser
    }
  }
  ${DetailedUser}
`;

export default DELETE_EXPERIENCE_MUTATION;
