const router = require('express').Router();

const {
    signUpWithGoogle, googleHandler, signUp, login, activateUser,
} = require('../handlers/AuthHandlers');

router.get('/signup/google', signUpWithGoogle);
router.get('/google/callback', googleHandler);
router.post('/signup', signUp);
router.post('/login', login);
router.get('/activate-user', activateUser);

module.exports = router;
