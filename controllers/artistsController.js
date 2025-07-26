// const mongodb = require('../data/database');
// const objectId = require('mongodb').ObjectId;
const artistModel = require('../models/artistModel');

// Controller functions for handling artists with Mongoose
const getAllArtists = async (req, res) => {
    try {
        const artists = await artistModel.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving artists', error: err });
    }
};

// Get artist by ID
const getArtistById = async (req, res) => {
    try {
        const artistId = req.params.id;
        const artist = await artistModel.findById(artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(artist);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving artist', error: err });
    }
};

// Create a new artist
const createArtist = async (req, res) => {
    try {
        const artist = new artistModel({
            name: req.body.name,
            genre: req.body.genre,
            last_single: req.body.last_single,
            last_single_year: req.body.last_single_year,
            language: req.body.language,
            country: req.body.country,
            year_start: req.body.year_start,
        });
        await artist.save();
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ message: 'Artist created successfully', artist });
    } catch (err) {
        res.status(500).json({ message: 'Error creating artist', error: err });
    }
};

// Update an existing artist
const updateArtist = async (req, res) => {
    try {
        const artistId = req.params.id;
        const artist = await artistModel.findByIdAndUpdate(artistId, {
            name: req.body.name,
            genre: req.body.genre,
            last_single: req.body.last_single,
            last_single_year: req.body.last_single_year,
            language: req.body.language,
            country: req.body.country,
            year_start: req.body.year_start,
        }, { new: true });
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Artist updated successfully', artist });
    } catch (err) {
        res.status(500).json({ message: 'Error updating artist', error: err });
        }
};

// Delete an artist
const deleteArtist = async (req, res) => {
    try {
        const artistId = req.params.id;
        const result = await artistModel.findByIdAndDelete(artistId);
        if (!result) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(204).send(); // No content to send back
    } catch (err) {
        res.status(500).json({ message: 'Error deleting artist', error: err });
    }
}

module.exports = {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
};























// // Controller functions for handling artists
// const getAllArtists = async (req, res) => {
//     const result = await mongodb.getDataBase().db().collection('artists').find();
//     result.toArray().then((artists) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(artists);
// });
// };

// // Get artist by ID
// const getArtistById = async (req, res) => {
//     const artistsId = new ObjectId(req.params.id);
//     const result = await mongodb.getDataBase().db().collection('artists').find({ _id: artistsId });
//     result.toArray().then((artist) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(artist[0]);
//     });
// };

// // Create a new artist
// const createArtist = async (req, res) => {
//     const artist = {
//         name: req.body.name,
//         gender: req.body.gender,
//         country: req.body.country,
//         year_start: req.body.year_start,
//     };
//     const response = await mongodb.getDataBase().db().collection('artists').insertOne(artist);
//     res.setHeader('Content-Type', 'application/json');
//     if (response.acknowledged) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'An error occurred while creating the artist');
//     }
// };

// // Update an existing artist
// const updateArtist = async (req, res) => {
//     const artistId = new ObjectId(req.params.id);
//     const artist = {
//         name: req.body.name,
//         genre: req.body.genre,
//         country: req.body.country,
//         year_start: req.body.year_start,
//     };
//     const response = await mongodb.getDataBase().db().collection('artists').replaceOne({_id: artistId}, artist);
//     res.setHeader('Content-Type', 'application/json');
//     // Check if the update was successful
//     if (response.modifiedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'An error occurred while updating the information of the artist');
//     }
// };

// // Delete an artist
// const deleteArtist = async (req, res) => {
//     const artistId = new ObjectId(req.params.id);  
//     const response = await mongodb.getDataBase().db().collection('artists').deleteOne({ _id: artistId });
//     res.setHeader('Content-Type', 'application/json');
//     if (response.deletedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'An error occurred while deleting the information of the artist');
//     }
// };

// module.exports = {
//     getAllArtists,
//     getArtistById,
//     createArtist,
//     updateArtist,
//     deleteArtist
// };


