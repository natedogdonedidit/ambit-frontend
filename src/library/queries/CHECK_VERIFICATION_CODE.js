import { gql } from '@apollo/client';

export default CHECK_VERIFICATION_CODE = gql`
  query CHECK_VERIFICATION_CODE($phoneNumber: String!, $code: String!) {
    checkVerificationCode(phoneNumber: $phoneNumber, code: $code) {
      status
      username
    }
  }
`;
