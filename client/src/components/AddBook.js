import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { getAuthorsQuery, getBooksQuery } from '../graphql/queries'
import { addBookMutation } from '../graphql/mutations'

function AddBook() {
  const [name, setNameOfBook] = useState('')
  const [genre, setGenreOfBook] = useState('')
  const [authorId, setAuthorIdOfBook] = useState('')

  const { loading, data } = useQuery(getAuthorsQuery)
  const [addBook] = useMutation(addBookMutation)

  const submitForm = (e) => {
    e.preventDefault()
    console.log({ name, genre, authorId })
    addBook({
      variables: {
        name,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  const renderAuthors = () => {
    if (loading) {
      return <option>Loading authors...</option>
    }

    return data.authors.map(author => (
      <option key={`${author.id}-${author.name}`} value={author.id}>{author.name}</option>
    ))
  }

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setNameOfBook(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={e => setGenreOfBook(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={e => setAuthorIdOfBook(e.target.value)}>
          <option>Select author</option>
          {renderAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  )
}

export default AddBook
