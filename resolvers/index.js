const Query = require('./Query');
const Mutation = require('./Mutation');
const Types = require('./Types');

const resolvers = {
    Query,
    Mutation,
    ...Types
}

module.exports = resolvers;
