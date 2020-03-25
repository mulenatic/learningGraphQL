const { GraphQLScalarType } = require('graphql');
const { photos, users, tags } = require('./dataStore');

module.exports = {
    Photo: {
	url: parent => `http://yoursite.com/img/${parent.id}.jpg`,
	postedBy: parent => {
	    return users.find( u => u.githubLogin === parent.githubUser );
	},
	taggedUsers: parent => tags
	    .filter(tag => tag.photoID === parent.id)
	    .map(tag => tag.userID)
	    .map( userID => users.find( u => userID === u.githubLogin ))
    },
    User: {
	postedPhotos: parent => {
	    return photos.filter( p => p.githubUser === parent.githubUser );
	},
	inPhotos: parent => tags
	    .filter( tag => tag.userID === parent.id )
	    .map( tag => tag.photoID )
	    .map( photoID => photos.filter( photo => photo.id === photoID ))
    },
    DateTime: new GraphQLScalarType({
	name: 'DateTime',
	description: 'A valid date time value.',
	parseValue: value => new Date(value),
	serialize: value => new Date(value).toISOString(),
	parseLiteral: ast => ast.value
    })
}
