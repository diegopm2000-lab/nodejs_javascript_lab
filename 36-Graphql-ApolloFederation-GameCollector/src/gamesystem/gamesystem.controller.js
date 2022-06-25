// gamesystem.controller.js

/* eslint-disable no-console */

const { ApolloServer, gql } = require('apollo-server');
const { buildFederatedSchema } = require('@apollo/federation');

const gameSystemService = require('./gamesystem.service');

const port = 4001;

const typeDefs = gql`
    type Gamesystem @key(fields: "id") {
        id: ID!
        name: String
        description: String
    }

    extend type Query {
        gamesystem(id: ID!): Gamesystem
        gamesystems: [Gamesystem]
    }

    extend type Mutation {
      addGamesystem(name: String, description: String): Gamesystem
      updateGamesystem(id: ID!, name: String, description: String): Gamesystem
      deleteGamesystem(id: ID!): Boolean
  }
`;

const resolvers = {
  Gamesystem: {
    // eslint-disable-next-line no-underscore-dangle
    __resolveReference(ref) {
      return gameSystemService.getById(ref.id);
    },
  },
  Query: {
    gamesystem(_, { id }) {
      return gameSystemService.getById(id);
    },
    gamesystems() {
      return gameSystemService.getAll();
    },
  },
  Mutation: {
    addGamesystem(parent, args) {
      const newGamesystem = {
        name: args.name,
        description: args.description,
      };
      return gameSystemService.add(newGamesystem);
    },
    updateGamesystem(parent, args) {
      const updatedGamesystem = {
        id: args.id,
        name: args.name,
        description: args.description,
      };
      return gameSystemService.update(updatedGamesystem);
    },
    deleteGamesystem(parent, args) {
      return gameSystemService.remove(args.id);
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`Gamesystems service ready at ${url}`);
});
