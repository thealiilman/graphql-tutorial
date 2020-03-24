import { gql } from 'apollo-boost'

export const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`

export const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`
