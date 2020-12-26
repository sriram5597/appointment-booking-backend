const router = require('express').Router();

const { addService, deleteService, updateService } = require('../handlers/ServiceHandler');
const Auth = require('../utils/AuthFilter');

router.post('/:id/add', Auth, addService);
router.delete('/:id', Auth, deleteService);
router.patch('/:id', Auth, updateService);

module.exports = router;
