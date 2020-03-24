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

export const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`
