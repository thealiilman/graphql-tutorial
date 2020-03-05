const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const books = [
  { name: 'And Then There Were None', genre: 'Mystery', id: '1' },
  { name: 'Nothing Ventured', genre: 'Drama', id: '2' },
  { name: 'London', genre: 'Historical Fiction', id: '3' },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parent, { id }) => {
        // code to get data from db / other sources
        return books.find(book => book.id === id)
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
