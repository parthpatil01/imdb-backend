const mongoose = require('mongoose');

const topTenSchema = new mongoose.Schema({
    title: String,
    image: String,
    rating: Number
})

const TopTen = new mongoose.model('TopTen', topTenSchema);

module.exports = TopTen;