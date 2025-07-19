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
}, {
    timestamps: true,
});

module.exports = mongoose.model('Artist', artistSchema);
// This model can be used to interact with the 'artists' collection in MongoDB.