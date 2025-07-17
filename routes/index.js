const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
  res.send('Hello world :)!');
});

router.use('/songs', require('./songs'));
router.use('/artists', require('./artists'));

module.exports = router;