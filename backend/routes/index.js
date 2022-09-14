const router = require('express').Router();
const { signupValidation, signinValidation } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);

router.use('/users', require('./users'));
router.use('/cards', require('./cards'));
router.use('*', require('./notFound'));

module.exports = router;
