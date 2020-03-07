const graphql = require('graphql')
const Author = require('../models/author')
const Book = require('../models/book')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

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
      ),
    },
  }),
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: ({ id }) => (
        books.filter(book => book.authorId === id)
      ),
    },
  },
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
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => Author.find(),
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: () => Book.find(),
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: (_parent, { name, age }) => {
        const author = new Author({
          name,
          age
        })

        return author.save()
      }
    }
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
