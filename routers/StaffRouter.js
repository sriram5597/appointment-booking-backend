const router = require('express').Router();

const Auth = require('../utils/AuthFilter');
const {
    createStaff, getStaffs, deleteStaff, updateStaff, markPresence,
} = require('../handlers/StaffHandler');

router.post('/:id/add', Auth, createStaff);
router.get('/:id', getStaffs);
router.delete('/:id', Auth, deleteStaff);
router.patch('/:id', Auth, updateStaff);
router.get('/:id/mark', Auth, markPresence);

module.exports = router;
