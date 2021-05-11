const express = require('express');
// import ApolloServer
const {ApolloServer} = require('apollo-server-express')

// import typeDef and resolvers
const {typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express();

// create new apollo server and pass in schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// integrate apollo server with express app as middleware
server.applyMiddleware({app})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    // log where we can go test GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
