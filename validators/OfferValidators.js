const Joi = require('joi');

exports.addOfferValidator = Joi.object({
    offer: Joi.number(),
    services: Joi.array(),
    date: Joi.date(),
    promoCode: Joi.string().min(3).max(10),
});
