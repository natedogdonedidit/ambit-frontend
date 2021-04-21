import { gql } from '@apollo/client';

const REPORT_CONTENT = gql`
  mutation REPORT_CONTENT($text: String!) {
    report(text: $text)
  }
`;

export default REPORT_CONTENT;
