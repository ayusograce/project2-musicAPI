const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

function getAllSongs(req, res) {
    mongodb.getDataBase().db().collection('songs').find().toArray()
        .then(songs => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(songs);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving songs', error: err });
        });
}   

function getSongById(req, res) {
    const songId = req.params.id;
    mongodb.getDataBase().db().collection('songs').findOne({ _id: new objectId(songId) })
        .then(song => {
            if (song) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(song);
            } else {
                res.status(404).json({ message: 'Song not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving song', error: err });
        });
}

function createSong(req, res) {
    const newSong = req.body;
    mongodb.getDataBase().db().collection('songs').insertOne(newSong)
        .then(result => {
            if (result.acknowledged) {
                res.setHeader('Content-Type', 'application/json');
                res.status(201).json({ message: 'Song created successfully', songId: result.insertedId });
            } else {
                res.status(500).json({ message: 'Failed to create song' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error creating song', error: err });
        });
}

function updateSong(req, res) {
    const songId = req.params.id;
    const updatedSong = req.body;
    mongodb.getDataBase().db().collection('songs').updateOne(
        { _id: new objectId(songId) },
        { $set: updatedSong }
    )
        .then(result => {
            if (result.modifiedCount > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({ message: 'Song updated successfully' });
            } else {
                res.status(404).json({ message: 'Song not found or no changes made' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error updating song', error: err });
        });
}

function deleteSong(req, res) {
    const songId = req.params.id;
    mongodb.getDataBase().db().collection('songs').deleteOne({ _id: new objectId(songId) })
        .then(result => {
            if (result.deletedCount > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({ message: 'Song deleted successfully' });
            } else {
                res.status(404).json({ message: 'Song not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error deleting song', error: err });
        });
}

module.exports = {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong
};

