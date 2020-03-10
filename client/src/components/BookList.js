import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`

function BookList(props) {
  console.log(useQuery(getBooksQuery));

  return (
    <div>
      <ul id="book-list">
        <li>And Then There Were None</li>
      </ul>
    </div>
  );
}

export default BookList;
