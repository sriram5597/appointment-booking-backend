const BookingModel = require('../models/BookingModel');
const ShopModel = require('../models/ShopModel');

const { bookAppointmentValidator } = require('../validators/BookingValidators');

exports.bookAppointment = async (req, res) => {
    try {
        const { error } = bookAppointmentValidator.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.message });
        }

        const booking = new BookingModel();
        booking.userId = req.user.id;

        Object.keys(req.body).forEach((key) => {
            booking[key] = req.body[key];
        });

        booking.services = req.body.services;

        await booking.save();

        return res.status(201).send({ message: 'Appointment Booking successfull...' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.viewBooking = async (req, res) => {
    try {
        const booking = await BookingModel.findById(req.params.id).populate('staffPreference');

        if (booking.userId !== req.user.id) {
            return res.status(403).send({ message: 'Access Denied' });
        }

        return res.status(200).send({ booking });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.bookingsByUser = async (req, res) => {
    try {
        const bookings = await BookingModel.find({ userId: req.user.id }).populate('shopId');

        return res.status(200).send({ bookings });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.bookingByShop = async (req, res) => {
    try {
        const bookings = await BookingModel.find({ shopId: req.params.id }).populate('staffs');

        return res.status(200).send({ bookings });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await BookingModel.findById(req.params.id);

        if (booking.userId !== req.user.id) {
            return res.status(403).message({ message: 'Access Denied' });
        }

        await BookingModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({ message: 'Booking cancelled' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};
