import { gql } from '@apollo/client';
import { GroupFragment } from 'library/queries/_fragments';

const GROUP_QUERY = gql`
  query GROUP_QUERY($id: ID) {
    group(id: $id) {
      ...GroupFragment
    }
  }
  ${GroupFragment}
`;

export default GROUP_QUERY;
