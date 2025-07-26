const passport = require('passport');

const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

// router.get('/', (req, res) => {
//   res.send('Hello world :)!');
// });

router.use('/songs', require('./songs'));
router.use('/artists', require('./artists'));

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;