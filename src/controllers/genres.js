const mongoose = require('mongoose');
const Genre = require('../models/genresModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

//connect to db
mongoose.connect(MONGO_URI, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
})
    .then(() => {
        console.log('db connected successfully');

         genresData();   //commenting it bcs data is imported to mongodb
    })
    .catch((error) => {
        console.log('unable to connect to db', error);
        process.exit(1);
    })


//importing json data and adding it to mongodb
const genresData = async () => {
    try {
        const genres = require('../data/genres.json')  //directly require json here
        await Genre.insertMany(genres);
        console.log('data successfully inserted to mongodb');
    } catch (error) {
        console.log('error while importing the data to mongodb', error);
        process.exit(1);
    }
}

//getting all genres
const getAllGenres = async (req, res)=>{
try {
    const genre= await Genre.find();
    res.status(200).json(genre);
} catch (error) {
    res.status(500).json({msg:"unable to fetch genres"});
}
}
module.exports={getAllGenres}