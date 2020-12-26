const Joi = require('joi');

exports.addStaffValidator = Joi.object({
    name: Joi.string().not().empty(),
    email: Joi.string().email(),
    mobile: Joi.string().length(10),
    address: Joi.string().min(5),
    city: Joi.string().min(3),
});
