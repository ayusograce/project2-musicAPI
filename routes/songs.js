const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');
const handleValidation = require('../middlewares/handleValidation');
const { validateSongRules, validateObjectId, validateArtistIdExists } = require('../middlewares/validator');

router.get('/', songsController.getAllSongs);
router.get('/:id', validateObjectId, handleValidation, songsController.getSongById);
router.post('/', validateArtistIdExists, validateSongRules, handleValidation, songsController.createSong);
router.put('/:id', validateObjectId, validateArtistIdExists, validateSongRules, handleValidation, songsController.updateSong);
router.delete('/:id', validateObjectId, handleValidation, songsController.deleteSong);

module.exports = router;