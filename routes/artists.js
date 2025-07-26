const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');
const handleValidation = require('../middlewares/handleValidation');
const { validateArtistRules, validateObjectId } = require('../middlewares/validator');
const  isAuthenticated  = require('../middlewares/authenticator');

router.get('/', artistsController.getAllArtists);
router.get('/:id', validateObjectId, handleValidation, artistsController.getArtistById);
router.post('/', isAuthenticated, validateArtistRules, handleValidation, artistsController.createArtist);
router.put('/:id',isAuthenticated, validateObjectId, validateArtistRules, handleValidation, artistsController.updateArtist);
router.delete('/:id',isAuthenticated, validateObjectId, handleValidation, artistsController.deleteArtist);

module.exports = router;