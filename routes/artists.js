const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');
const handleValidation = require('../middlewares/handleValidation');
const { validateArtistRules, validateObjectId } = require('../middlewares/validator');

router.get('/', artistsController.getAllArtists);
router.get('/:id', validateObjectId, handleValidation, artistsController.getArtistById);
router.post('/', validateArtistRules, handleValidation, artistsController.createArtist);
router.put('/:id',validateObjectId, validateArtistRules, handleValidation, artistsController.updateArtist);
router.delete('/:id',validateObjectId, handleValidation, artistsController.deleteArtist);

module.exports = router;