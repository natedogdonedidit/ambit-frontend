import { gql } from '@apollo/client';

export default GET_VERIFICATION_CODE = gql`
  query GET_VERIFICATION_CODE($phoneNumber: String!) {
    getVerificationCode(phoneNumber: $phoneNumber)
  }
`;
