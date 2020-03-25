const { photos } = require('./dataStore');

module.exports =  {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
};
