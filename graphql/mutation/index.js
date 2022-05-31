import { gql } from "@apollo/client"

export const SEND_RESPONSE_DATA = gql`
  mutation ($input: PublicTriviaInputSet!) {
    set(input: $input) {
      _id
      date
    }
  }
`