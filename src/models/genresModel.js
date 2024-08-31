const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;