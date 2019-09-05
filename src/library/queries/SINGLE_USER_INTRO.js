import gql from 'graphql-tag';

const SINGLE_USER_INTRO = gql`
  query SINGLE_USER_INTRO($id: ID!) {
    user(id: $id) {
      id
      name
      profilePic
      location
      jobTitle
      profession
      industry
      intro
    }
  }
`;

export default SINGLE_USER_INTRO;
