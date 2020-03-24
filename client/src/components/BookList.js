import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../graphql/queries'
import BookDetails from './BookDetails'

function BookList() {
  const [selectedBookId, setSelectedBook] = useState(null)
  const { loading, data } = useQuery(getBooksQuery)
  const renderBooks = () => {
    if (loading) {
      return <div>Loading books...</div>;
    }

    return data.books.map(book => (
      <li
        key={`${book.id}-${book.name}`}
        onClick={() => setSelectedBook(book.id)}
      >
        {book.name}
      </li>
    ))
  }

  return (
    <div>
      <ul id="book-list">
        {renderBooks()}
      </ul>
      <BookDetails bookId={selectedBookId} />
    </div>
  );
}

export default BookList;
