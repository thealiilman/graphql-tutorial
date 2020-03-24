import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../graphql/queries'

function BookDetails({ bookId }) {
  const { loading, data = {} } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  })

  const renderBookDetails = () => {
    const { book } = data

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(book => (
              <li key={`${book.id}-${book.name}`}>{book.name}</li>
            ))}
          </ul>
        </div>
      )
    }

    return <div>No book selected. 😭</div>
  }

  return (
    <div id="book-details">
      {renderBookDetails()}
    </div>
  )
}

export default BookDetails
