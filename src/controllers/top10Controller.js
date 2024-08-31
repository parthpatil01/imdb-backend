const mongoose = require('mongoose');
const TopTen = require('../models/top10Model');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

//connect to db
mongoose.connect(MONGO_URI, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
})
    .then(() => {
        console.log('db connected successfully');

       toptenData();   //commenting it bcs data is imported to mongodb
    })
    .catch((error) => {
        console.log('unable to connect to db', error);
        process.exit(1);
    })


//importing json data and adding it to mongodb
const toptenData = async () => {
    try {
        const topTens = require('../data/topTen.json')  //directly require json here
        await TopTen.insertMany(topTens);
        console.log('data successfully inserted to mongodb');
    } catch (error) {
        console.log('error while importing the data to mongodb', error);
        process.exit(1);
    }
}

//getting all data
const getAllTopTen = async (req, res)=>{
try {
    const topten= await TopTen.find();
    res.status(200).json(topten);
} catch (error) {
    res.status(500).json({msg:"unable to fetch top 10 data"});
}
}
module.exports={getAllTopTen}