const { ApolloServer } = require('apollo-server');

const typeDefs = `
type Query {
    totalPhotos: Int!
}
`

const resolvers = {
    Query: {
	totalPhotos: () => 42
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer
    .listen()
    .then( ({ url }) => console.log(`GraphQL Service running on ${url}`) );
