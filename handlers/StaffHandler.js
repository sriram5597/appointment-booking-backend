const StaffModel = require('../models/StaffModel');
const { addStaffValidator } = require('../validators/StaffValidators');

exports.createStaff = async (req, res) => {
    try {
        if (req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const { error } = addStaffValidator.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        const staff = new StaffModel();
        Object.keys(req.body).forEach((key) => {
            staff[key] = req.body[key];
        });
        staff.shopId = req.params.id;

        await staff.save();

        return res.status(201).send({ message: 'Staff added' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.getStaffs = async (req, res) => {
    try {
        const staffs = await StaffModel.find({ shopId: req.params.id });

        return res.status(200).send({ staffs });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.deleteStaff = async (req, res) => {
    try {
        if (req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        await StaffModel.findByIdAndDelete({ _id: req.params.id });

        return res.status(200).send({ message: 'staff deleted' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.updateStaff = async (req, res) => {
    try {
        if (req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const staff = await StaffModel.findById(req.params.id);

        Object.keys(req.body).forEach((key) => {
            staff[key] = req.body[key];
        });

        await staff.save();

        return res.status(200).send({ staff });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.markPresence = async (req, res) => {
    try {
        if (req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const staff = await StaffModel.findById(req.params.id);
        staff.available = !staff.available;
        await staff.save();

        return res.status(200).send({ staff });
    } catch (err) {
        console.log(err.message);
        return res.status(500).message({ message: 'something went wrong' });
    }
};
