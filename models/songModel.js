const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    album: {
        type: String,
        required: true,
        trim: true,
    },
    year: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    artist_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Song', songSchema);
// This model can be used to interact with the 'songs' collection in MongoDB.