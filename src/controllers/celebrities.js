const Celebrity = require('../models/celebrityModel');
const mongoose =require('mongoose');
require('dotenv').config();


const MONGO_URI = process.env.MONGO_URI;

//connect to db
mongoose.connect(MONGO_URI, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
})
    .then(() => {
        console.log('db connected successfully');

        celebritiesData();  
    })
    .catch((error) => {
        console.log('unable to connect to db', error);
        process.exit(1);
    })

    //importing json data and adding it to mongodb
const celebritiesData = async () => {
    try {
        const celebrities = require('../data/celebrities.json')  //directly require json here
        await Celebrity.insertMany(celebrities);
        console.log('data successfully inserted to mongodb');
    } catch (error) {
        console.log('error while importing the data to mongodb', error);
        process.exit(1);
    }
}

//getting all celebrities
const getAllCelebrities = async (req, res)=>{
    try {
        const celebrity= await Celebrity.find();
        res.status(200).json(celebrity);
    } catch (error) {
        res.status(500).json({msg:"unable to fetch genres"});
    }
    }
    module.exports={getAllCelebrities}
