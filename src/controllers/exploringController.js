const mongoose = require('mongoose');
const Exploring = require('../models/exploringModel')

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

//connect to db
mongoose.connect(MONGO_URI, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
})
    .then(() => {
        console.log('db connected successfully');

        exploringData();   //commenting it because data is already imported to mongodb
    })
    .catch((error) => {
        console.log('unable to connect to db', error);
        process.exit(1);
    })


//importing json data and adding it to mongodb
const exploringData = async () => {
    try {
        const exploring = require('../data/exploring.json')  //directly require json here
        await Exploring.insertMany(exploring);
        console.log('data successfully inserted to mongodb');
    } catch (error) {
        console.log('error while importing the data to mongodb', error);
        process.exit(1);
    }
}

//getting all data
const getAllExploring = async (req, res) => {
    try {
        const exploring = await Exploring.find();
        res.status(200).json(exploring);
    } catch (error) {
        res.status(500).json({ msg: "unable to fetch movies or series" });
    }
}
module.exports = { getAllExploring }