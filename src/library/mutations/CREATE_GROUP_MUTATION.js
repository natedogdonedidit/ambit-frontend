import gql from 'graphql-tag';
import { GroupFragment } from 'library/queries/_fragments';

const CREATE_GROUP_MUTATION = gql`
  mutation CREATE_GROUP_MUTATION($users: [UserWhereUniqueInput]!) {
    createGroup(users: $users) {
      ...GroupFragment
    }
  }
  ${GroupFragment}
`;

export default CREATE_GROUP_MUTATION;
