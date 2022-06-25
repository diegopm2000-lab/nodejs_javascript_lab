// index.js

/* eslint-disable no-console */

const { createServer } = require('http');

const express = require('express');
const {
  ApolloServer, gql, PubSub, UserInputError,
} = require('apollo-server-express');

const pubsub = new PubSub();

process.env.NODE_ENV = 'production';

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
    addBook(book: PostInput): Book
  }

  input PostInput {
    # Title of the book
    title: String
    # Author of the book
    author: String
  }

  type Subscription {
    bookAdded: Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
  Mutation: {
    addBook: (parent, args) => {
      if (books.find((e) => e.title === args.book.title)) {
        throw new UserInputError('book title repeated', { argumentName: 'title' });
      }
      const book = {
        title: args.book.title,
        author: {
          name: args.book.author,
        },
      };

      console.log('publishing the event BOOK ADDED');
      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      books.push(book);
      return book;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => {
        console.log('Entering in bookAdded Subscription');
        return pubsub.asyncIterator(['BOOK_ADDED']);
      },
    },
  },
};

const app = express();

const apollo = new ApolloServer({
  subscriptions: {
    path: '/subscriptions',
  },
  typeDefs,
  resolvers,
});

apollo.applyMiddleware({ app });

const httpServer = createServer(app);

apollo.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000${apollo.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:4000${apollo.subscriptionsPath}`);
});
