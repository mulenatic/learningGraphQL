const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express').default;

const { readFileSync } = require('fs');
const resolvers = require('./resolvers');

const typeDefs = readFileSync('typeDefs.graphql', 'UTF-8');

var app = express();

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware({app});

app.get('/playground', expressPlayground({ endpoint: `${apolloServer.graphqlPath}` }));
app.get('/', (req,res) => res.end(`Welcome to the Photoshare API ${req.get('User-agent')}`));

app.listen({ port: 4000 },
	   console.log(`GraphQL Server running @ http://localhost:4000${apolloServer.graphqlPath}`));

    
