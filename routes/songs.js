const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');
const handleValidation = require('../middlewares/handleValidation');
const { validateSongRules, validateIdParam, validateArtistIdExists } = require('../middlewares/validator');

router.get('/', songsController.getAllSongs);
router.get('/:id', validateIdParam, handleValidation, songsController.getSongById);
router.post('/', validateArtistIdExists, validateSongRules, handleValidation, songsController.createSong);
router.put('/:id', validateIdParam, validateArtistIdExists, validateSongRules, handleValidation, songsController.updateSong);
router.delete('/:id', validateIdParam, handleValidation, songsController.deleteSong);

module.exports = router;