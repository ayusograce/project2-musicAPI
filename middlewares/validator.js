const {body, param } = require('express-validator');
const mongoose = require('mongoose');
const Artist = require('../models/artistModel');


// Custom validation to check if the artist ID exists in the database
// This function will be used in the validation rules for songs to ensure the artist exists
const validateArtistIdExists = body('artist_id').custom(async (value, { req }) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid artist ID format');
    }
    const artist = await Artist.findById(value);
    if (!artist) {
        throw new Error('Artist ID does not exist');
    }
    return true;
});

// Custom validation function to check if the ObjectId is valid
const validateObjectId = param('_id').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ID format');
    }   
    return true;
});

// Artist validation rules
const validateArtistRules = [
    body('name')
        .notEmpty()
        .withMessage('Artist name is required')
        .isString()
        .withMessage('Artist name must be a string')
        .trim(),
    body('genre')
        .notEmpty()
        .withMessage('Artist genre is required')
        .isString()
        .withMessage('Artist genre must be a string')   
        .trim(),
    body('country')
        .notEmpty()
        .withMessage('Artist country is required')
        .isString()
        .withMessage('Artist country must be a string')
        .trim(),
    body('year_start')
        .notEmpty()
        .withMessage('Artist start year is required')
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage('Artist start year must be a valid year between 1900 and the current year')
        .toInt(),
];


// Song validation rules
const validateSongRules = [
    body('title')
        .notEmpty()
        .withMessage('Song title is required')
        .isString()
        .withMessage('Song title must be a string')
        .trim(),
    body('album')
        .notEmpty()
        .withMessage('Album name is required')
        .isString()
        .withMessage('Album name must be a string')
        .trim(),
    body('year')
        .notEmpty()
        .withMessage('Release year is required')
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage('Release year must be a valid year between 1900 and the current year')
        .toInt(),
    body('genre')
        .notEmpty()
        .withMessage('Genre is required')
        .isString()
        .withMessage('Genre must be a string')
        .trim(),
    body('artist_id')
        .notEmpty()
        .withMessage('Artist ID is required')
        .isMongoId()
        .withMessage('Artist ID must be a valid MongoDB ObjectId'),
];


// ID validation for routes that require an ID parameter
const validateIdParam = [
    param('id')
        .notEmpty()
        .withMessage('ID parameter is required')
        .custom(validateObjectId)
        .withMessage('Invalid ID format.There is an error.'),
];

module.exports = {
    validateArtistRules,
    validateSongRules,
    validateIdParam,
    validateArtistIdExists
};

