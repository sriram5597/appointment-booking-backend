const Joi = require('joi');

exports.LoginValidator = Joi.object({
    email: Joi.string().email().not().empty(),
    password: Joi.string().alphanum().min(8).max(25),
});
