const LocationModel = require('../models/LocationModel');

exports.addLocation = async (req, res) => {
    try {
        // if (req.user.role !== 'ADMIN') {
        //     return res.status(403).send({ message: 'Access Denied' });
        // }

        const location = new LocationModel();
        location.name = req.body.name;

        await location.save();

        return res.status(200).send({ message: 'location added' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.removeLocation = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        await LocationModel.findByIdAndRemove(req.params.id);

        return res.status(200).send({ message: 'Location deleted' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.getLocations = async (req, res) => {
    try {
        const locations = await LocationModel.find();

        return res.status(200).send({ locations });
    } catch (err) {
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.updateLocation = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const location = await LocationModel.findById(req.params.id);
        location.name = req.body.name;

        await location.save();

        return res.status(200).send({ location });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};
