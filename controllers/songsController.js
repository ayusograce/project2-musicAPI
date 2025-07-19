
const songModel = require('../models/songModel');

const getAllSongs = async (req, res) => {
    try {
        const songs = await songModel.find().populate('artist_id');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving songs', error });
    }
};

// Get song by ID
const getSongById = async (req, res) => {
    try {
        const songId = req.params.id;
        const song = await songModel.findById(songId).populate('artist_id');
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving song', error });
    }
}

// Create a new song
const createSong = async (req, res) => {
    try {
        const song = new songModel({
            title: req.body.title,
            album: req.body.album,
            year: req.body.year,
            genre: req.body.genre,
            artist_id: req.body.artist_id,
        });
        await song.save();  
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ message: 'Song created successfully', song });
    } catch (error) {
        res.status(500).json({ message: 'Error creating song', error });
    }   
};

// Update an existing song
const updateSong = async (req, res) => {
    try {
        const songId = req.params.id;
        const song = await songModel.findByIdAndUpdate(songId, {
            title: req.body.title,  
            album: req.body.album,
            year: req.body.year,
            genre: req.body.genre,
            artist_id: req.body.artist_id,
        }, { new: true });
        if (!song) {    
            return res.status(404).json({ message: 'Song not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Song updated successfully', song });
    } catch (error) {
        res.status(500).json({ message: 'Error updating song', error });
    }
};

// Delete a song
const deleteSong = async (req, res) => {
    try {
        const songId = req.params.id;
        const song = await songModel.findByIdAndDelete(songId);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ message: 'Error deleting song', error });
    }
};

module.exports = {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong  
};













































// Controllers with mongodb
// const mongodb = require('../data/database');
// const objectId = require('mongodb').ObjectId;

// function getAllSongs(req, res) {
//     mongodb.getDataBase().db().collection('songs').find().toArray()
//         .then(songs => {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(songs);
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Error retrieving songs', error: err });
//         });
// }   

// // Get song by ID
// const getSongById = async (req, res) => {
//     const songId = new ObjectId(req.params.id);
//     const result = await mongodb.getDataBase().db().collection('songs').find({ _id: songId });
//     result.toArray().then((song) => {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(song[0]);
//     });
// };

// // Create a new song
// const createSong = async (req, res) => {
//     const song = {
//         title: req.body.title,
//         album: req.body.album,
//         year: req.body.year,
//         genre: req.body.genre,
//         artist_id: req.body.artist_id,
//     };
//     const response = await mongodb.getDataBase().db().collection('songs').insertOne(song);
//     res.setHeader('Content-Type', 'application/json');
//     if (response.acknowledged) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'An error occurred while creating the information of the song');
//     }
// };

// // Update an existing song
// const updateSong = async (req, res) => {
//     const songId = new ObjectId(req.params.id);
//     const song = {
//         title: req.body.title,
//         album: req.body.album,
//         year: req.body.year,
//         gender: req.body.gender,
//         artist_id: req.body.artist_id,
//     };
//     const response = await mongodb.getDataBase().db().collection('songs').replaceOne({_id: songId}, song);
//     res.setHeader('Content-Type', 'application/json');
//     // Check if the update was successful
//     if (response.modifiedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'An error occurred while updating the information of the song');
//     }
// };

// // Delete a song
// const deleteSong = async (req, res) => {
//     const songId = new ObjectId(req.params.id);  
//     const response = await mongodb.getDataBase().db().collection('songs').deleteOne({ _id: songId });
//     res.setHeader('Content-Type', 'application/json');
//     if (response.deletedCount > 0) {
//         res.status(204).send();
//     } else {
//         res.status(500).json(response.error || 'An error occurred while deleting the information of the song');
//     }
// };

// module.exports = {
//     getAllSongs,
//     getSongById,
//     createSong,
//     updateSong,
//     deleteSong
// };

