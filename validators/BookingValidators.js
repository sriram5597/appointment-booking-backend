const Joi = require('joi');

exports.bookAppointmentValidator = Joi.object({
    shopId: Joi.string(),
    bookingDate: Joi.date(),
    bookingTime: Joi.string(),
    staffPreference: Joi.string(),
    services: Joi.array(),
    billAmt: Joi.number(),
});
