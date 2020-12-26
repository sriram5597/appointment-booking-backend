const Joi = require('joi');

exports.addShopValidator = Joi.object({
    name: Joi.string().not().empty(),
    address: Joi.string(),
    city: Joi.string(),
    openTime: Joi.string(),
    closeTime: Joi.string(),
    about: Joi.string(),
});
