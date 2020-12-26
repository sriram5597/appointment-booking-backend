const router = require('express').Router();

const { createAdmin, adminLogin } = require('../handlers/AdminHandler');

router.get('/create', createAdmin);
router.post('/login', adminLogin);

module.exports = router;
