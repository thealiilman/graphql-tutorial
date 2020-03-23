import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { getAuthorsQuery } from '../queries'

function AddBook() {
  const { loading, data } = useQuery(getAuthorsQuery)

  const renderAuthors = () => {
    if (loading) {
      return <option>Loading authors...</option>
    }

    return data.authors.map(author => (
      <option key={`${author.id}-${author.name}`} value={author.id}>{author.name}</option>
    ))
  }

  return (
    <form id="add-book">
      <div className="field">
        <label>Book name:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" />
      </div>

      <div className="field">
        <label>Author:</label>
        <select>
          <option>Select author</option>
          {renderAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  )
}

export default AddBook
