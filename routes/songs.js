const express = require('express');
const router = express.Router();
const songsController = require('../controllers/songsController');
const handleValidation = require('../middlewares/handleValidation');
const { validateSongRules, validateObjectId, validateArtistIdExists } = require('../middlewares/validator');
const  isAuthenticated  = require('../middlewares/authenticator');

router.get('/', songsController.getAllSongs);
router.get('/:id', validateObjectId, handleValidation, songsController.getSongById);
router.post('/', isAuthenticated, validateArtistIdExists, validateSongRules, handleValidation, songsController.createSong);
router.put('/:id', isAuthenticated, validateObjectId, validateArtistIdExists, validateSongRules, handleValidation, songsController.updateSong);
router.delete('/:id', isAuthenticated, validateObjectId, handleValidation, songsController.deleteSong);

module.exports = router;