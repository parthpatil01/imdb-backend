const mongoose = require('mongoose');

//defining schema
const celebritySchema = new mongoose.Schema({
    name: String,
    age: Number,
    image: String
})

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;