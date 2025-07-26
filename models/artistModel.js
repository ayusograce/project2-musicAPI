const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        message: 'Artist name is required',
        trim: true,
    },  
    genre: {
        type: String,
        required: true,
        message: 'Artist genre is required',
        trim: true,
    },
    last_single: {
        type: String,
        required: true,
        message: 'Artist last single is required',
        trim: true,
    },
    last_single_year: {
        type: Number,
        required: true,
        message: 'Artist last single year is required',
        min: 1900,
        max: new Date().getFullYear(),
    },
    language: {
        type: String,
        required: true,
        message: 'Artist language is required',
        trim: true,
    },
    country: {
        type: String,
        required: true,
        message: 'Artist country is required',
        trim: true,
    },
    year_start: {
        type: Number,
        required: true,
        message: 'Artist start year is required',
    },
}, );

module.exports = mongoose.model('Artist', artistSchema);
// This model can be used to interact with the 'artists' collection in MongoDB.