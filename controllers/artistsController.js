const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

// Controller functions for handling artists
const getAllArtists = async (req, res) => {
    const result = await mongodb.getDataBase().db().collection('artists').find();
    result.toArray().then((artists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(artists);
});
};

const getArtistById = async (req, res) => {
    const artistId = req.params.id;
    const result = await mongodb.getDataBase().db().collection('artists').findOne({ _id: new objectId(artistId) });
    
    if (result) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } else {
        res.status(404).json({ message: 'Artist not found' });
    }
}

const createArtist = async (req, res) => {
    const newArtist = req.body;
    const result = await mongodb.getDataBase().db().collection('artists').insertOne(newArtist);
    
    if (result.acknowledged) {
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({ message: 'Artist created successfully', artistId: result.insertedId });
    } else {
        res.status(500).json({ message: 'Failed to create artist' });
    }
}

const updateArtist = async (req, res) => {
    const artistId = req.params.id;
    const updatedArtist = req.body;
    const result = await mongodb.getDataBase().db().collection('artists').updateOne(
        { _id: new objectId(artistId) },
        { $set: updatedArtist }
    );
    
    if (result.modifiedCount > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Artist updated successfully' });
    } else {
        res.status(404).json({ message: 'Artist not found or no changes made' });
    }
}

const deleteArtist = async (req, res) => {
    const artistId = req.params.id;
    const result = await mongodb.getDataBase().db().collection('artists').deleteOne({ _id: new objectId(artistId) });
    
    if (result.deletedCount > 0) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ message: 'Artist deleted successfully' });
    } else {
        res.status(404).json({ message: 'Artist not found' });
    }
}

module.exports = {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist
};


