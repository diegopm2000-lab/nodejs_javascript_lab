// index.js

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const books = [
  {
    title: 'The Foundation',
    author: {
      name: 'Isaac Asimov',
    },
  },
  {
    title: 'Foundation and Empire',
    author: {
      name: 'Isaac Asimov',
    },
  },
  {
    title: 'Second Foundation',
    author: {
      name: 'Isaac Asimov',
    },
  },
  {
    title: 'Dune',
    author: {
      name: 'Frank Herbert',
    },
  },
];

const authors = [
  {
    name: 'Isaac Asimov',
    books: [books[0], books[1], books[2]],
  },
  {
    name: 'Frank Herbert',
    books: [books[3]],
  },
];

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }
  type Author {
    name: String
    books: [Book]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
  }
  type Mutation {
    addBook(title: String, author: String): Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
  Mutation: {
    addBook: (parent, args) => {
      const book = {
        title: args.title,
        author: {
          name: args.author,
        },
      };
      books.push(book);
      return book;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

// eslint-disable-next-line no-console
app.listen({ port: 4000 }, () => console.log(`Now browse to http://localhost:4000${server.graphqlPath}`));
