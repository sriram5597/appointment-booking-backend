const router = require('express').Router();

const {
    addLocation, removeLocation, getLocations, updateLocation,
} = require('../handlers/LocationHandler');
const auth = require('../utils/AuthFilter');

router.post('/add', auth, addLocation);
router.delete('/:id', auth, removeLocation);
router.get('/', getLocations);
router.patch('/:id', auth, updateLocation);

module.exports = router;
