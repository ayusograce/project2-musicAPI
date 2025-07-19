const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');
const handleValidation = require('../middlewares/handleValidation');
const { validateArtistRules, validateIdParam } = require('../middlewares/validator');

router.get('/', artistsController.getAllArtists);
router.get('/:id', validateIdParam, handleValidation, artistsController.getArtistById);
router.post('/', validateArtistRules, handleValidation, artistsController.createArtist);
router.put('/:id',validateIdParam, validateArtistRules, handleValidation, artistsController.updateArtist);
router.delete('/:id',validateIdParam, handleValidation, artistsController.deleteArtist);

module.exports = router;