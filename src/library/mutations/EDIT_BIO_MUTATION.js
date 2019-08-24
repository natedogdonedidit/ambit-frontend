import gql from 'graphql-tag';

const EDIT_BIO_MUTATION = gql`
  mutation EDIT_BIO_MUTATION(
    $id: ID!
    $name: String
    $jobTitle: String
    $profession: String
    $industry: String
    $location: String
    $website: String
    $bio: String
  ) {
    editBio(
      id: $id
      name: $name
      jobTitle: $jobTitle
      profession: $profession
      industry: $industry
      location: $location
      website: $website
      bio: $bio
    ) {
      id
      name
    }
  }
`;

export default EDIT_BIO_MUTATION;
