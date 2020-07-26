import { gql } from '@apollo/client';
import { DetailUpdate } from 'library/queries/_fragments';

export default SINGLE_UPDATE_QUERY = gql`
  query SINGLE_UPDATE_QUERY($id: ID!) {
    singleUpdate(id: $id) {
      ...DetailUpdate
    }
  }
  ${DetailUpdate}
`;
