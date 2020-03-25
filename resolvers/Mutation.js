let { _id, photos } = require('./dataStore');

module.exports = {
    postPhoto(parent, args) {

	var newPhoto = {
	    id: _id++,
	    ...args.input,
	    created: new Date()
	}
	
	photos.push(newPhoto);
	return newPhoto;
    }
}
