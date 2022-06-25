// index.js

/* eslint-disable no-console */

const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const port = 4000;

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'gamesystems', url: 'http://localhost:4001' },
  ],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});

server.listen({ port }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
