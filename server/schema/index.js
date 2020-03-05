const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
} = graphql;

const authors = [
  { name: 'Julian Barnes', age: 74, id: '1' },
  { name: 'Jeffrey Archer', age: 79, id: '2' },
  { name: 'Edward Rutherfurd', age: 72, id: '3' }
]

const books = [
  { name: 'The Sense of an Ending', genre: 'Drama', id: '1', authorId: '1' },
  { name: 'Nothing Ventured', genre: 'Drama', id: '2', authorId: '2' },
  { name: 'London', genre: 'Historical Fiction', id: '3', authorId: '3' },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: ({ authorId }) => (
        authors.find(author => author.id === authorId)
      )
    },
  }),
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_parent, { id }) => {
        // code to get data from db / other sources
        return books.find(book => book.id === id)
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_parent, { id }) => (
        authors.find(author => author.id === id)
      ),
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
