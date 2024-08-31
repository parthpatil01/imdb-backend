const mongoose = require('mongoose');

const exploringSchema= new mongoose.Schema(
    {
        title:String,
        image: String,
        rating: Number
    });


    const Exploring= new mongoose.model('Exploring', exploringSchema)

    module.exports= Exploring;